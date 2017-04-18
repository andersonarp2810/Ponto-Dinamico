class EventosController < ApplicationController
  before_action :set_evento, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

# POST /realiarponto
def realizarponto 
  mensagem = {body: "Ponto não realizado!", evento_id: "", hora: "", data: ""}
   if params[:evento] != nil
    evento_request = Evento.new(evento_params)
    status = params[:evento][:status]
  else
    evento_request = Evento.new
    status = params[:status]
    evento_request.qrcode = params[:qrcode]
    evento_request.localizacao_long = params[:localizacao_long]
    evento_request.localizacao_lati = params[:localizacao_lati]
  end
  #verrifica status do usuario
  if status == "true"
    @evento = Evento.find_by(qrcode: evento_request.qrcode)
    #organiza coordenadas para analise
    coordenada = {LatA: evento_request.localizacao_lati, LngA: evento_request.localizacao_long, LatB: @evento.localizacao_lati, LngB: @evento.localizacao_long }
      if @evento #verificação se evento existe para o qrcode
        if Evento.valida_coodernada (coordenada) #validando as coordenada do ponto
          mensagem = {body: "Ponto realizado!", evento_id: @evento.id, hora: Time.now.to_s(:time), data: Time.now.to_date}#dados do usuario          
        end
      end
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
    @evento = Evento.new(evento_params)
      if @evento.save
        retorno = {body: "evento cadastrado", evento_id: @evento.id, evento_nome: @evento.nome}
      end
    render json: retorno
  end

  # PATCH/PUT /eventos/1
  # PATCH/PUT /eventos/1.json
  def update
  retorno = {body: "evento não atualizado"}
      if @evento.update(evento_params)
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
      params.require(:evento).permit(:nome, :tipo, :pessoa_evento, :data_inicio, :data_fim, :hora_inicio, :hora_fim, :local, :descricao, :qrcode, :localizacao_long, :localizacao_lati, :usuario_id)
    end

end
