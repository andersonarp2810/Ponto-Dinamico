class EventosController < ApplicationController
  before_action :set_evento, only: [:show, :edit, :update, :destroy]
  before_action :require_authentication, only: [:show, :edit, :update, :destroy, :index, :create]
  skip_before_action :verify_authenticity_token
 # before_action :can_change, only: [:create, :update, :destroy, :new, :edit]

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
      @eventos = Evento.formate(Evento.order(:data_fim).all)
      render json:{erro: "000", body: @eventos}
    end

  end

  # GET /eventos/1
  # GET /eventos/1.json
  def show
  end

  # GET /eventos/new
  def new
    @evento = Evento.new
  end

  # GET /eventos/1/edit
  def edit
    render json:{ erro: "000", body: @evento}
  end

  # POST /eventos
  # POST /eventos.json
  def create
   retorno = {erro: "333", body:""}
    @evento = Evento.new(valid_request?)
    #verifica se usuario tem privilegio
    if Evento.autentica_usuario(@usuario_id)
      if @evento.valid?#valida evento antes de salvar
        @evento.hora_inicio = Time.zone.parse(@evento.hora_inicio.to_s)
        @evento.hora_fim = Time.zone.parse(@evento.hora_fim.to_s)
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
      @evento.hora_inicio = Time.zone.parse(@evento.hora_inicio.to_s)
      @evento.hora_fim = Time.zone.parse(@evento.hora_fim.to_s)
      if @evento.update(valid_request?)
        retorno = {erro: "000", body: ""}
      end
  render json: retorno
  end

  # DELETE /eventos/1
  # DELETE /eventos/1.json
  def destroy
    @evento.destroy
    render json: {erro: "000", body: ""}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_evento
      @evento = Evento.find_by("id = ?",params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def evento_params
      params.require(:evento).permit(:nome, :tipo, :pessoa_evento, :data_inicio, :data_fim, :hora_inicio, :hora_fim, :local, :descricao, :qrcode, :localizacao_long, :localizacao_lati)
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
