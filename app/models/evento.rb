class Evento < ApplicationRecord
#validação

validates :nome, :tipo, :data_fim, :data_fim, :hora_inicio, :hora_fim, :local, :descricao, :qrcode, :localizacao_lati, :localizacao_long,  presence: true #validação de presença


#associação
has_many :usuario_eventos


def self.confirma_ponto(evento,usuario_id)
    @usuario_id = usuario_id
    @evento = Evento.find_by(qrcode: evento.qrcode)
    erro = 311
    if @evento #verificação se evento existe para o qrcode
        #organiza coordenadas para analise
        coordenada = {LatA: evento.localizacao_lati, LngA: evento.localizacao_long, LatB: @evento.localizacao_lati, LngB: @evento.localizacao_long }
        erro = 317
        if valida_coodernada (coordenada) #validando as coordenada do ponto
          return registrar_ponto
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
            if (hora_atual.hour - @evento.hora_inicio.hour).abs == 1 or (hora_atual.hour - @evento.hora_inicio.hour).abs == 0
                if (hora_atual.min - @evento.hora_inicio.min).abs <= 30
                    usuario_evento = UsuarioEvento.new
                    usuario_evento.data = data_atual
                    usuario_evento.hora_inicio = hora_atual.to_s(:time)
                    usuario_evento.evento_id = @evento.id
                    usuario_evento.usuario_id = @usuario_id
                    if usuario_evento.save
                        return mensagem = {erro: "000", body:{evento_id: @evento.id, hora_inicio: usuario_evento.hora_inicio.to_s(:time), data: usuario_evento.data, hora_fim: usuario_evento.hora_fim.blank? ? " " : usuario_evento.hora_fim}}#dados do usuario          }
                    else
                        #algum erro
                    end
                else
                    #escrever mensagem de atraso
                    erro = 312
                end
            else
                #atrasado: fora de hora de entrada
                erro = 312
            end
        else
            if usuario_evento.hora_fim.nil?
                #faz o ponto no final do evento
                if (hora_atual.hour - @evento.hora_fim.hour).abs == 1 or (hora_atual.hour - @evento.hora_fim.hour) == 0 #usuario dentro da hora do ponto
                    if (hora_atual.min - @evento.hora_fim.min).abs <= 30 #verifica se esta no intervalo permitido para realizar o ponto
                        usuario_evento.update(hora_fim: hora_atual.to_s(:time))
                        return mensagem = {erro: "000", body:{evento_id: @evento.id, hora_inicio: usuario_evento.hora_inicio.to_s(:time), data: usuario_evento.data, hora_fim: usuario_evento.hora_fim.to_s(:time)}}#dados do usuario          }
                    else
                        erro = 313
                    end
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
        usuario.nivel == "usuario_adm"
    end

    #verifica se ha algum erro e cria uma lista de erros
    def self.verifica_erro(evento)
        evento.errors.full_messages.each do |erro|
           #verificar erro de unicidade com uma condição 
           return erro
        end
    end

end
