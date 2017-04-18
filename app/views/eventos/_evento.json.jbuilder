json.extract! evento, :id, :nome, :tipo, :pessoa_evento, :data_inicio, :data_fim, :hora_inicio, :hora_fim, :local, :descricao, :qrcode, :created_at, :updated_at
json.url evento_url(evento, format: :json)
