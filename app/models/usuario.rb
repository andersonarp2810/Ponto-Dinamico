class Usuario < ApplicationRecord
#adicionando enum
enum nivel: { usuario_normal: 0, usuario_adm: 1 }
enum status: { true: 0, false: 1 }

#validações de campos
	validates :nome, :senha, :email,:matricula, :mac, presence: true #validação de presença
	validates :senha, length: { minimum: 5} #validação de tamanho de senha
	validates :matricula, numericality: {only_integer: true} #validação de somente numeros
	validates :email, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, on: :create}, uniqueness: {case_sensitive: false} #formato e unicidade
	validates :email, :matricula, :mac, uniqueness: true #unicidade de matricula, mac e email

	#associação
	has_many :eventos

	#valida login Usuario
	def self.valida(usuario)
		usuario_request = usuario[:usuario_request]
		@usuario = Usuario.find_by(matricula: usuario_request.matricula)
		if @usuario
			if @usuario.mac == usuario_request.mac
				if @usuario.senha == usuario_request.senha
					@usuario.update(status: 0)
					return mensagem = {usuario_nome: @usuario.nome, id: @usuario.id, status: @usuario.status, matricula: @usuario.matricula}#retorna id caso seja encontrado o usuario
				end
			end
		end
	  mensagem = {body: "Login não realizado!", status: false}
	end
end
