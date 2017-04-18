class Evento < ApplicationRecord
#validação
#validates :nome, :tipo, :pessoa_evento,:data_fim, :data_fim, :hora_inicio, :hora_fim, :local, :descricao, :qrcode, :localizacao_lati, :localizacao_long,  presence: true #validação de presença

#associação
belongs_to :usuario, optional: true

#realizar verificação de coordenada
def self.valida_coodernada(coordenada)
    #deve retornar true
   distancia = 6371 * Math.acos(Math.cos(Math::PI * (90 - coordenada [:LatB]) / 180) * Math.cos((90 - coordenada [:LatA]) * Math::PI / 180) + Math.sin((90 - coordenada [:LatB]) * Math::PI / 180) * Math.sin((90 - coordenada [:LatA])*Math::PI/180)*Math.cos(( coordenada [:LngA] - coordenada [:LngB])*Math::PI / 180))
   distancia < 0.5
end

end
