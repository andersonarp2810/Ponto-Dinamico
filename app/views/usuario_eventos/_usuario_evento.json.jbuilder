json.extract! usuario_evento, :id, :data, :mensagem, :hora_inicio, :hora_fim, :evento_id, :usuario_id, :created_at, :updated_at
json.url usuario_evento_url(usuario_evento, format: :json)
