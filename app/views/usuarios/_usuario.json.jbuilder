json.extract! usuario, :id, :nome, :password, :email, :matricula, :mac, :localizacao :created_at, :updated_at
json.url usuario_url(usuario, format: :json)
