class EventosController < ApplicationController
  before_action :set_evento, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

# POST /realizarponto
def realizarponto 
  #cria o objeto em memoria
  evento_request = Evento.new(valid_request?)
  #verifica status do usuario
  if @status == "true"
    mensagem = Evento.confirma_ponto(evento_request)
    end
  render json: mensagem.to_json
end
 
  # GET /eventos
  # GET /eventos.json
  def index
    @eventos = Evento.all
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
  end

  # POST /eventos
  # POST /eventos.json
  def create
    retorno = {body: "evento não cadastrado"}
    @evento = Evento.new(valid_request?)
    if @evento.valid?#valida evento antes de salvar
      if @evento.save
        retorno = {body: "evento cadastrado", evento_id: @evento.id, evento_nome: @evento.nome}
      end
    end
    render json: retorno
  end

  # PATCH/PUT /eventos/1
  # PATCH/PUT /eventos/1.json
  def update
  retorno = {body: "evento não atualizado"}
      if @evento.update(valid_request?)
        retorno = {body: "evento atualizado", evento_id: @evento.id, evento_nome:@evento.nome}
      end
  render json: retorno
  end

  # DELETE /eventos/1
  # DELETE /eventos/1.json
  def destroy
    @evento.destroy
    render json: {body: "evento destruido", evento_id: @evento.id}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_evento
      @evento = Evento.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def evento_params
      params.require(:evento).permit(:nome, :tipo, :pessoa_evento, :data_inicio, :data_fim, :hora_inicio, :hora_fim, :local, :descricao, :qrcode, :localizacao_long, :localizacao_lati)
    end

    def valid_request?
        json = params[:evento]
        JSON.parse(json.to_json)
        @status = params[:evento][:status]
        evento_params
    rescue JSON::ParserError => e
        all = JSON.parse(json)
        @status = all["status"]        
        return all.except("status")
    end

end
