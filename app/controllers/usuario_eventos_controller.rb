class UsuarioEventosController < ApplicationController
  before_action :set_usuario_evento, only: [:show, :edit, :update, :destroy]
  #before_action :require_authentication, only: [:show, :edit, :update, :destroy, :create]
  before_action :can_change, only: [:edit, :update, :destroy, :index]

  #metodo retorna ultimo ponto realizado
  def find_by_last

  end



  # GET /usuario_eventos
  # GET /usuario_eventos.json
  def index
    @usuario_eventos = UsuarioEvento.all
  end

  # GET /usuario_eventos/1
  # GET /usuario_eventos/1.json
  def show
  end

  # GET /usuario_eventos/new
  def new
    @usuario_evento = UsuarioEvento.new
  end

  # GET /usuario_eventos/1/edit
  def edit
  end

  # POST /usuario_eventos
  # POST /usuario_eventos.json
  def create
    @usuario_evento = UsuarioEvento.new(usuario_evento_params)

    respond_to do |format|
      if @usuario_evento.save
        format.html { redirect_to @usuario_evento, notice: 'Usuario evento was successfully created.' }
        format.json { render :show, status: :created, location: @usuario_evento }
      else
        format.html { render :new }
        format.json { render json: @usuario_evento.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /usuario_eventos/1
  # PATCH/PUT /usuario_eventos/1.json
  def update
    respond_to do |format|
      if @usuario_evento.update(usuario_evento_params)
        format.html { redirect_to @usuario_evento, notice: 'Usuario evento was successfully updated.' }
        format.json { render :show, status: :ok, location: @usuario_evento }
      else
        format.html { render :edit }
        format.json { render json: @usuario_evento.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /usuario_eventos/1
  # DELETE /usuario_eventos/1.json
  def destroy
    @usuario_evento.destroy
    respond_to do |format|
      format.html { redirect_to usuario_eventos_url, notice: 'Usuario evento was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_usuario_evento
      @usuario_evento = UsuarioEvento.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def usuario_evento_params
      params.require(:usuario_evento).permit(:data, :mensagem, :hora_inicio, :hora_fim, :evento_id, :usuario_id)
    end

    def can_change
      unless user_signed_in? && current_user == user
        redirect_to user_path(params[:id])
      end
    end

    def user
      @usuario ||= Usuario.find(params[:id])
    end
end
