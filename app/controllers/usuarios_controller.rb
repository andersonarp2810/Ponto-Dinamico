class UsuariosController < ApplicationController
  before_action :set_usuario, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token
  before_action :require_authentication, only: [:update, :destroy, :edit, :show, :index]
  before_action :can_change, only: [:update, :destroy, :edit, :index, :show]

  # GET /usuarios/1
  def get_ponto
   render json: Usuario.ultimo_ponto(params[:id]).to_json
  end
  
  # GET /usuarios
  # GET /usuarios.json
  # relatorio de pesquisa do usuario
  def index
     if params[:keywords].present?
      # Diz ao elastickick para pesquisar as keyrwords nos campos name e description
      usuario = Usuario.search(params[:keywords])
      if usuario.present?
        mensagem = {erro: "000", body: usuario}
      else
        mensagem = {erro: "301", body: ""}
      end
    else
      usuario = Usuario.select("id, nome, email, matricula")
      mensagem = {erro: "000", body:usuario}
    end
    render json: mensagem
  end

  # GET /usuarios/1
  # GET /usuarios/1.json
  def show
  end

  # GET /usuarios/new
  def new
    @usuario = Usuario.new
  end

  # GET /usuarios/1/edit
 def edit
 end

  #POST /cadastrarusuario.json
  # POST /usuarios
  # POST /usuarios.json
  def create
    retorno = {erro: "107", body: " "}     
    @usuario = Usuario.new(valid_request?)
    if @usuario.valid?
      if @usuario.save
        retorno = {erro: "000", body: {usuario_id: @usuario.id, usuario_nome: @usuario.nome, status: true}}
      end
    end
    #verifica erros na inserção no banco
    if @usuario.errors.any?
      retorno = Usuario.verifica_erro(@usuario.errors.messages)
    end
    render json: retorno.to_json
  end

  # PATCH/PUT /usuarios/1
  # PATCH/PUT /usuarios/1.json
  def update    
    retorno = {erro: "322" ,body: ""}
      if @usuario.update(valid_request?)
        retorno = {erro: "000", body: {evento_id: @usuario.id, usuario_nome: @usuario.nome}}
      end
    render json: retorno.to_json
  end

  # DELETE /usuarios/1
  # DELETE /usuarios/1.json
  def destroy
    @usuario.destroy
    respond_to do |format|
      format.html { redirect_to usuarios_url, notice: 'Usuario was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_usuario
      @usuario = Usuario.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def usuario_params
      params.require(:usuario).permit(:nome, :password, :email, :matricula, :mac)
    end

    def valid_request?
        json = params[:usuario]
        json = JSON.parse(json.to_json)
        rescue JSON::ParserError => e
          json = JSON.parse(json)
    end
end
