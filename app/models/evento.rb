class Evento < ApplicationRecord
#validação
#validates :nome, :tipo, :pessoa_evento,:data_fim, :data_fim, :hora_inicio, :hora_fim, :local, :descricao, :qrcode, :localizacao_lati, :localizacao_long,  presence: true #validação de presença

#associação
has_many :usuario_eventos


def self.confirma_ponto(evento)
    mensagem = {body: "Ponto não realizado!", evento_id: "", hora: "", data: ""}
    @evento = Evento.find_by(qrcode: evento.qrcode)
    if @evento #verificação se evento existe para o qrcode
        #organiza coordenadas para analise
        coordenada = {LatA: evento.localizacao_lati, LngA: evento.localizacao_long, LatB: @evento.localizacao_lati, LngB: @evento.localizacao_long }
        if valida_coodernada (coordenada) #validando as coordenada do ponto
          mensagem = {body: "Ponto realizado!", evento_id: @evento.id, hora: Time.now.to_s(:time), data: Time.now.to_date}#dados do usuario          
        end
    end
    mensagem
end

private
    #realizar verificação de coordenada
    def self.valida_coodernada(coordenada)
        #deve retornar true
    distancia = 6371 * Math.acos(Math.cos(Math::PI * (90 - coordenada [:LatB]) / 180) * Math.cos((90 - coordenada [:LatA]) * Math::PI / 180) + Math.sin((90 - coordenada [:LatB]) * Math::PI / 180) * Math.sin((90 - coordenada [:LatA])*Math::PI/180)*Math.cos(( coordenada [:LngA] - coordenada [:LngB])*Math::PI / 180))
    distancia < 0.5
    end

end
