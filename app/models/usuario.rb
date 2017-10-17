class Usuario < ApplicationRecord
#adicionando enum
enum nivel: { usuario_normal: 0, usuario_adm: 1 }
enum status: {true: 1, false: 0}

#validações de campos
	validates :nome, :password, :email,:matricula, :mac, presence: true #validação de presença
	validates :password, length: { minimum: 5} #validação de tamanho de password
	validates :matricula, numericality: {only_integer: true} #validação de somente numeros
	validates :email, format: {with: /\A[\w\._%-]+@[\w\.-]+\.[a-zA-Z]{2,4}\z/, on: :create}, uniqueness: {case_sensitive: false} #formato e unicidade
	validates :email, :matricula, :mac, uniqueness: true #unicidade de matricula, mac e email

	#associação
	has_many :usuario_eventos

#scope para procurar usuario que é adm e pode fazer login pelo web
	scope :find_user, -> {where.not(matricula: nil)}

	 #metodo de autenticação
    def self.authenticate(user)
		if user.matricula.present?
        	@user = find_user.find_by(matricula: user.matricula)
		else
			@user = find_user.find_by(email: user.email)
		end
		
        if @user.present?
            usuario = Usuario.valida(usuario_request: user, user: @user)
			return usuario
		else
			{erro: "202", body: " "}
        end
    end


	#valida login Usuario
	def self.valida(usuario)
		erro=201
		usuario_request = usuario[:usuario_request]
		@usuario = usuario[:user]
		if @usuario
			if @usuario.nivel == "usuario_adm"
					erro = 202
					if @usuario.password == usuario_request.password
						return @usuario
					end
			else
				erro = 204
				if @usuario.mac == usuario_request.mac
					erro=202
					if @usuario.password == usuario_request.password
						@usuario.update(status: 1)
						return @usuario
					end
				end
			end
		end
		{erro: erro, body: " "}
	end
#verifica os erros que aconteceram no banco e organiza
	def self.verifica_erro(err)
		if  err.first[1] = 102 #valor da mensagem de erro
			return {erro: protocolo_em_uso(err.first[0]), body: " "}#chave da mensagem de erro
		else
			return {erro: err.first[1], body: " "}
		end
	end

#realiza a pesquisa do último ponto que o usuário realizou em determinado evento
	def self.ultimo_ponto(usuario_id, evento_id)
		retorno = UsuarioEvento.order(:data).where("usuario_id = ? and evento_id = ?",usuario_id, evento_id).last
		imagem = Evento.select(:imagem).find_by(id: evento_id)
		if retorno.blank?
			return mensagem = {erro: "314", body: {entrada:" ", saida:" ", data: " ", imagem: imagem.nil? ? "" : imagem.imagem.url}, tipo:"ultimoponto"} 	
		else
			return mensagem = {erro: "000", body: {entrada: retorno.hora_inicio.blank? ? " " : retorno.hora_inicio.to_s(:time), saida: retorno.hora_fim.blank? ? " " : retorno.hora_fim.to_s(:time), data: retorno.data.blank? ? " " : retorno.data.strftime("%d/%m/%Y"), imagem: imagem.nil? ? "" : imagem.imagem.url},tipo:'ultimoponto'} 
		end

	end

#mtodo autenticar usuario mobile
	def self.autentica_usuario_mobile(id)
		if id.present?
			usuario = Usuario.find_by(id: id)
			if usuario.present?
				usuario.status
			end
		end
		return false
	end
	
#pesquisa de relatorio do usuario
def self.search(id)
   if id.present?
		arr_evento = Array.new
		eventos = Evento.joins(:usuario_eventos).where("usuario_id = ?","#{id}").distinct.pluck(:id,:nome, :data_inicio, :data_fim)
		if eventos.present? 
			eventos.each do |evento|
				hash_evento = Hash.new			
				hash_evento["id"] = evento[0]
				hash_evento["nome"] = evento[1]
				hash_evento["data_inicio"] = evento[2]
				hash_evento["data_fim"] = evento[3]

				arr_evento.push(hash_evento)
			end
			return arr_evento 
		end
	end
   return nil
end
#protocolo de erro pra campos ja em uso
	private
		def self.protocolo_em_uso(chave)
			protocolo = {matricula: -3, mac: -2, email: -1} # falta ajustar protocolo
			protocolo[chave]
		end
end
