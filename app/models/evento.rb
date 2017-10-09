class Evento < ApplicationRecord
#validação

validates :nome, :tipo, :data_fim, :data_fim, :hora_inicio, :hora_fim, :local, :descricao, :qrcode, :localizacao_lati, :localizacao_long,  presence: true #validação de presença


#associação
has_many :usuario_eventos

def self.formate(eventos)
    arr_eventos = Array.new
    eventos.each do |evento|
        evento_hash = Hash.new
        evento_hash["id"] = evento.id
        evento_hash["nome"] = evento.nome
        evento_hash["tipo"] = evento.tipo
        evento_hash["data_inicio"] = evento.data_inicio.strftime("%d/%m/%Y")
        evento_hash["data_fim"] = evento.data_fim.strftime("%d/%m/%Y")
        evento_hash["hora_inicio"] = evento.hora_inicio.to_s(:time)
        evento_hash["hora_fim"] = evento.hora_fim.to_s(:time)
        evento_hash["local"] = evento.local
        evento_hash["descricao"] = evento.descricao
        arr_eventos.push(evento_hash)
    end
    arr_eventos
end

#pesquisa pelo nome
def self.search(id)
    arr_usuarios = Array.new
    if id.present?
        usuario_eventos = Usuario.joins(:usuario_eventos).order(:nome).where("evento_id = ? and hora_inicio IS NOT NULL", "#{id}").select(:nome).group(:nome).count
        if usuario_eventos.present?
            usuario_eventos.keys.each do |key|
                usuario_evento = Hash.new
                usuario_evento["nome"] = key
                usuario_evento["presenca"] = usuario_eventos[key]
                arr_usuarios.push(usuario_evento)
            end
        end
        usuario_eventos_inscritos = Usuario.joins(:usuario_eventos).order(:nome).where("evento_id = ? and hora_inicio IS NULL", "#{id}").select(:nome).group(:nome).count        
        if usuario_eventos_inscritos.present?
            usuario_eventos_inscritos.keys.each do |key|
                usuario_eventos_inscrito = Hash.new
                usuario_eventos_inscrito["nome"] = key
                usuario_eventos_inscrito["presenca"] = 0
                arr_usuarios.push(usuario_eventos_inscrito)
            end
        end
    return arr_usuarios            
   end
   return nil
end

def self.confirma_ponto(evento,usuario_id,mensagem)
    data_atual = Time.now.to_date
    @usuario_id = usuario_id
    @evento = Evento.find_by(qrcode: evento.qrcode)
    @mensagem = mensagem
    erro = 311
    if @evento #verificação se evento existe para o qrcode
        erro = 304                    
        if data_atual >= @evento.data_inicio and data_atual <= @evento.data_fim 
            #organiza coordenadas para analise
            coordenada = {LatA: evento.localizacao_lati, LngA: evento.localizacao_long, LatB: @evento.localizacao_lati, LngB: @evento.localizacao_long }
            erro = 317
            if valida_coodernada (coordenada) #validando as coordenada do ponto
                return registrar_ponto
            end
        end
    end
    mensagem = {erro: erro, body:" "}
end

private
    #realizar verificação de coordenada
    def self.valida_coodernada(coordenada)
        #deve retornar true
    distancia = 6371 * Math.acos(Math.cos(Math::PI * (90 - coordenada [:LatB]) / 180) * Math.cos((90 - coordenada [:LatA]) * Math::PI / 180) + Math.sin((90 - coordenada [:LatB]) * Math::PI / 180) * Math.sin((90 - coordenada [:LatA])*Math::PI/180)*Math.cos(( coordenada [:LngA] - coordenada [:LngB])*Math::PI / 180))
    distancia < 0.5
    end

    def self.registrar_ponto
        limite_tempo = 15
        hora_atual = Time.zone.now
        data_atual = Time.zone.now.to_date
        usuario_evento  = UsuarioEvento.find_by(usuario_id: @usuario_id, evento_id: @evento.id)
        if !usuario_evento.nil?# verifica se o usuário está inscrito
            usuario_evento  = UsuarioEvento.find_by(usuario_id: @usuario_id, evento_id: @evento.id, data: data_atual)
            if usuario_evento.hora_inicio.nil?#verifica se o usuario ja fez o primeiro ponto
                #ponto no inicio do evento
                if (((hora_atual.hour * 60) + hora_atual.min) - ((@evento.hora_inicio.hour * 60) + @evento.hora_inicio.min)).abs <= limite_tempo
                    if usuario_evento.update(hora_inicio: hora_atual.to_s(:time))
                        return mensagem = {erro: "000", body:{evento_id: @evento.id, hora_inicio: usuario_evento.hora_inicio.to_s(:time), data: usuario_evento.data.strftime("%d/%m/%Y"), hora_fim: usuario_evento.hora_fim.blank? ? " " : usuario_evento.hora_fim}}#dados do usuario          }
                    else
                        #algum erro
                        erro = 315
                    end
                else
                    #escrever mensagem de atraso
                    if @mensagem.nil?
                        #verifica se o evento ja iniciou
                        if ((hora_atual.hour * 60) + hora_atual.min) < ((((@evento.hora_inicio.hour * 60) + @evento.hora_inicio.min)) - limite_tempo)
                            #verifica se o evento ainda não terminou
                            if ((hora_atual.hour * 60) + hora_atual.min) > ((((@evento.hora_fim.hour * 60) + @evento.hora_fim.min)) + limite_tempo)
                                erro = 315
                            else
                                erro = 319
                            end
                        else
                            erro = 312
                        end
                    else
                        if usuario_evento.update(hora_inicio: hora_atual.to_s(:time), mensagem: @mensagem)
                            return mensagem = {erro: "000", body:{evento_id: @evento.id, hora_inicio: usuario_evento.hora_inicio.to_s(:time), data: usuario_evento.data.strftime("%d/%m/%Y"), hora_fim: usuario_evento.hora_fim.blank? ? " " : usuario_evento.hora_fim}}#dados do usuario          }
                        else
                            #algum
                            erro = 315
                        end
                    end
                end
            else
                if usuario_evento.hora_fim.nil?
                    #faz o ponto no final do evento
                    if (((hora_atual.hour * 60) + hora_atual.min) - ((@evento.hora_fim.hour * 60) + @evento.hora_fim.min)).abs <= limite_tempo #verifica se esta no intervalo permitido para realizar o ponto
                        usuario_evento.update(hora_fim: hora_atual.to_s(:time))
                        return mensagem = {erro: "000", body:{evento_id: @evento.id, hora_inicio: usuario_evento.hora_inicio.to_s(:time), data: usuario_evento.data.strftime("%d/%m/%Y"), hora_fim: usuario_evento.hora_fim.to_s(:time)}}#dados do usuario          }
                    else
                        erro = 313
                    end
                else
                    erro = 318
                end
            end
        else
            erro = 314
        end
        mensagem = {erro: erro, body:" "}
    end

    #localiza e verifica se usuario tem privilegio ou não
    def self.autentica_usuario(usuario_id)
        usuario = Usuario.find_by(id: usuario_id)
        if usuario
            return usuario.nivel == "usuario_adm"
        end
        return {erro: 501, body:" "}
    end

    #verifica se ha algum erro e cria uma lista de erros
    def self.verifica_erro(evento)
        return {erro: evento.errors.first[1], body:""}
    end        

end
