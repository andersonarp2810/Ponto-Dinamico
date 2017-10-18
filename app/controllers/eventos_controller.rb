class EventosController < ApplicationController
  before_action :set_evento, only: [:show, :edit, :destroy, :update, :create]
  before_action :require_authentication, only: [:show, :edit, :update, :destroy, :index, :create]
  skip_before_action :verify_authenticity_token
 # before_action :can_change, only: [:create, :update, :destroy, :new, :edit]


#método se inscrever no evento
def inscricao
  usuario_id = params[:usuario_id]
  evento_id = params[:evento_id]
  mensagem = {erro: "320", body: ""}
  usuario_evento = UsuarioEvento.new
  usuario_evento.usuario_id = usuario_id
  usuario_evento.evento_id = evento_id
  evento = Evento.find_by(id: usuario_evento.evento_id)
  if evento.present?
    inscrito = UsuarioEvento.find_by(usuario_id: usuario_evento.usuario_id, evento_id: usuario_evento.evento_id)  
    if inscrito.present?
      mensagem = {erro: "321", body: ""}
    else
      usuario_evento = UsuarioEvento.new()
      usuario_evento.data = Time.zone.now.to_date
      usuario_evento.usuario_id = usuario_id
      usuario_evento.evento_id = evento_id
      if usuario_evento.save
        mensagem = {erro: "000", body: {data: usuario_evento.data.strftime("%d/%m/%Y"), hora_inicio: "", hora_fim: ""}, tipo: "inscricao"}
      end
    end
  end
  render json: mensagem
end
 
# POST /realizarponto
def realizarponto 
  #cria o objeto em memoria
  mensagem = {erro: "316", body: ""}
  evento_request = Evento.new(valid_request?)
  #verifica status do usuario
  if @status == "true"
    mensagem = Evento.confirma_ponto(evento_request,@usuario_id, @mensagem)
  end
  render json: mensagem.to_json
end
 
def eventos_mobile
  if params[:keynome].present?
       @eventos = Evento.formate(Evento.order(data_inicio: :desc).where("LOWER(nome) LIKE ?", "%#{params[:keynome].downcase}%"))
  else
       @eventos = Evento.formate(Evento.all.order(data_inicio: :desc))
  end
     render json:{erro: "000", body: @eventos}
end

 #listagem dos eventos
  # GET /eventos
  # GET /eventos.json
  def index
     #Verifica se o usuário entrou com keywords
    if params[:keywords].present?
      # Diz ao elastickick para pesquisar as keyrwords nos campos name e description
      @evento = Evento.search(params[:keywords])
      if @evento.present?
        render json: {erro: "000", body: @evento}
      else
        render json: {erro: "301", body: ""}
      end
   else
      @eventos = Evento.formate(Evento.order(data_inicio: :desc).all)
      render json:{erro: "000", body: @eventos}
    end

  end

  # GET /eventos/1/edit
  def edit
    render json:{ erro: "000", body: @evento}
  end

  # POST /eventos
  # POST /eventos.json
  def create
   retorno = {erro: "333", body:""}
   @evento = Evento.new(@request_hash)
    #verifica se usuario tem privilegio
    if Evento.autentica_usuario(params[:usuario_id])
      if @evento.valid?#valida evento antes de salvar
        if @evento.save
          retorno = {erro: "000", body:{evento_id: @evento.id, evento_nome: @evento.nome}}
        end
      elsif @evento.errors.any?
        retorno = Evento.verifica_erro(@evento)
      end
    end
    render json: retorno.to_json
  end

  # PATCH/PUT /eventos/1
  # PATCH/PUT /eventos/1.json
  def update
    retorno = {erro: "333", body: ""}
      if @evento.update(@request_hash)
        retorno = {erro: "000", body: ""}
      end
  render json: retorno
  end

  # DELETE /eventos/1
  # DELETE /eventos/1.json
  def destroy
    usuario_eventos = UsuarioEvento.where(evento_id: @evento.id)
    usuario_eventos.each do |usuario_evento|
      usuario_evento.destroy
    end
    @evento.destroy
    render json: {erro: "000", body: ""}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_evento
      if params[:id].present?
        @evento = Evento.find_by("id = ?",params[:id])
      end
      @request_hash = Hash.new
      @request_hash["nome"] = params[:nome]
      @request_hash["tipo"] = params[:tipo]
      @request_hash["lugar"] = params[:lugar]
      @request_hash["descricao"] = params[:descricao]
      @request_hash["data_inicio"] = params[:data_inicio]
      @request_hash["data_fim"] = params[:data_fim]
      @request_hash["localizacao_lati"] = params[:localizacao_lati]
      @request_hash["localizacao_long"] = params[:localizacao_long]
      @request_hash["imagem"] = params[:imagem]
      @request_hash["qrcode"] = params[:qrcode]
      @request_hash["hora_inicio"] = Time.zone.parse(params[:hora_inicio].to_s)
      @request_hash["hora_fim"] = Time.zone.parse(params[:hora_fim].to_s)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def evento_params
      params.require(:evento).permit(:nome, :tipo, :pessoa_evento, :data_inicio, :data_fim, :hora_inicio, :hora_fim, :lugar, :descricao, :qrcode, :localizacao_long, :localizacao_lati, :imagem)
    end

    def valid_request?     
      json = params[:evento]
      json = JSON.parse(json.to_json)
      @status = json["status"]
      @usuario_id = json["usuario_id"]
      @mensagem = json["mensagem"]
      json.except("status", "usuario_id", "mensagem")
      rescue JSON::ParserError => e
        json = JSON.parse(json)
        @status = json["status"]
        @usuario_id = json["usuario_id"]
        @mensagem = json["mensagem"]
        json.except("status","usuario_id", "mensagem")
    end

end
