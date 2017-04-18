json.extract! usuario, :id, :nome, :senha, :email, :matricula, :mac, :localizacao :created_at, :updated_at
json.url usuario_url(usuario, format: :json)
