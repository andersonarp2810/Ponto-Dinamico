class Evento < ApplicationRecord
#validação

validates :nome, :tipo, :data_fim, :data_fim, :hora_inicio, :hora_fim, :local, :descricao, :qrcode, :localizacao_lati, :localizacao_long,  presence: true #validação de presença


#associação
has_many :usuario_eventos


def self.formate!
    arr = Array.new
    eventos = Evento.all
    eventos.each do |evento|
        ev = Hash.new
        ev["nome"] = evento.nome
        ev["tipo"] = evento.tipo
        ev["data_inicio"] = evento.data_inicio
        ev["data_fim"] = evento.data_fim
        ev["hora_inicio"] = evento.hora_inicio.to_s(:time)
        ev["hora_fim"] = evento.hora_fim.to_s(:time)
        ev["local"] = evento.local
        ev["descricao"] = evento.descricao
        arr.push(ev)
    end
    arr.reverse
end

def self.search(id)
   if id.present?
       arr = Array.new
       users = Array.new
       evento = Evento.find_by(id: id)
       usuarios = UsuarioEvento.where("evento_id = ? and data >= ? and data<= ?", "#{evento.id}" ,"#{evento.data_inicio}", "#{evento.data_fim}").select(:id, :usuario_id, :data, :mensagem)
       if usuarios.present?
        usuarios.each do |usuario|
                arr.push(usuario[:usuario_id])
            end
            ids = arr.uniq
            ids.each do |id| 
                user = Hash.new
                usu = Usuario.find_by(id: id)
                user["nome"] = usu.nome
                user["presenca"] = arr.count(id)
                users.push(user)
            end
        else
            return nil
        end
   end
   users
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
        hora_atual = Time.now
        data_atual = Time.now.to_date
        usuario_evento  = UsuarioEvento.find_by(data: data_atual, usuario_id: @usuario_id)
        if usuario_evento.blank?#verifica se o usuario ja fez o primeiro ponto
            #ponto no inicio do evento
            if (((hora_atual.hour * 60) + hora_atual.min) - ((@evento.hora_inicio.hour * 60) + @evento.hora_inicio.min)).abs <= 30
                usuario_evento = UsuarioEvento.new
                usuario_evento.data = data_atual
                usuario_evento.hora_inicio = hora_atual.to_s(:time)
                usuario_evento.evento_id = @evento.id
                usuario_evento.usuario_id = @usuario_id
                if usuario_evento.save
                    return mensagem = {erro: "000", body:{evento_id: @evento.id, hora_inicio: usuario_evento.hora_inicio.to_s(:time), data: usuario_evento.data, hora_fim: usuario_evento.hora_fim.blank? ? " " : usuario_evento.hora_fim}}#dados do usuario          }
                else
                    #algum erro
                    erro = 315
                end
            else
                #escrever mensagem de atraso
                if @mensagem.blank?
                    erro = 312
                else
                    usuario_evento = UsuarioEvento.new
                    usuario_evento.data = data_atual
                    usuario_evento.hora_inicio = hora_atual.to_s(:time)
                    usuario_evento.evento_id = @evento.id
                    usuario_evento.usuario_id = @usuario_id
                    usuario_evento.mensagem = @mensagem
                    if usuario_evento.save
                        return mensagem = {erro: "000", body:{evento_id: @evento.id, hora_inicio: usuario_evento.hora_inicio.to_s(:time), data: usuario_evento.data, hora_fim: usuario_evento.hora_fim.blank? ? " " : usuario_evento.hora_fim}}#dados do usuario          }
                    else
                        #algum
                        erro = 315
                    end
                end
            end
        else
            if usuario_evento.hora_fim.nil?
                #faz o ponto no final do evento
                if (((hora_atual.hour * 60) + hora_atual.min) - ((@evento.hora_fim.hour * 60) + @evento.hora_fim.min)).abs <= 30 #verifica se esta no intervalo permitido para realizar o ponto
                    usuario_evento.update(hora_fim: hora_atual.to_s(:time))
                    return mensagem = {erro: "000", body:{evento_id: @evento.id, hora_inicio: usuario_evento.hora_inicio.to_s(:time), data: usuario_evento.data, hora_fim: usuario_evento.hora_fim.to_s(:time)}}#dados do usuario          }
                else
                    erro = 313
                end
            else
                erro = 318
            end
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
