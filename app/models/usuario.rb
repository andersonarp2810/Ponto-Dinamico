class Usuario < ApplicationRecord
#adicionando enum
enum nivel: { usuario_normal: 0, usuario_adm: 1 }
enum status: { true: 0, false: 1 }

#validações de campos
	validates :nome, :senha, :email,:matricula, :mac, presence: true #validação de presença
	validates :senha, length: { minimum: 5} #validação de tamanho de senha
	validates :matricula, numericality: {only_integer: true} #validação de somente numeros
	validates :email, format: {with: /\A[\w\._%-]+@[\w\.-]+\.[a-zA-Z]{2,4}\z/, on: :create}, uniqueness: {case_sensitive: false} #formato e unicidade
	validates :email, :matricula, :mac, uniqueness: true #unicidade de matricula, mac e email

	#associação
	has_many :usuario_eventos

	#valida login Usuario
	def self.valida(usuario)
		erro=201
		usuario_request = usuario[:usuario_request]
		@usuario = Usuario.find_by(matricula: usuario_request.matricula)
		if @usuario
			if @usuario.nivel == "usuario_adm"
					if @usuario.senha == usuario_request.senha
						@usuario.update(status: 0)
						return mensgem = {erro: "000", body: {usuario_id: @usuario.id, nome: @usuario.nome, status: @usuario.status, matricula: @usuario.matricula}}
					end
			else
				if @usuario.mac == usuario_request.mac
					erro=202
					if @usuario.senha == usuario_request.senha
						@usuario.update(status: 0)
						return mensgem = {erro: "000", body: {usuario_id: @usuario.id, nome: @usuario.nome, status: @usuario.status, matricula: @usuario.matricula}}
					end
				end
			end
		end
		{erro: erro, body: " "}
	end
#verifica os erros que aconteceram no banco e organiza
	def self.verifica_erro(usuario)
		usuario.errors.full_messages.each do |erro|
			puts "teste erro#{erro}"
		end
	end

#realiza a pesquisa do evento do usuario que realizou a pesquisa
	def self.ultimo_ponto(usuario_id)
		retorno = UsuarioEvento.where(usuario_id: usuario_id).last
		return mensagem = {erro: "000", body: {entrada: retorno.hora_inicio.blank? ? " " : retorno.hora_inicio.to_s(:time), saida: retorno.hora_fim.blank? ? " " : retorno.hora_fim.to_s(:time), data: retorno.data.to_date}} 
	end

end
