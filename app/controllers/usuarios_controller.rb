class UsuariosController < ApplicationController
  before_action :set_usuario, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

#POST /logout
def logout
  mensagem = {body: 'erro nos dados'}
  usuario_request = Usuario.new(usuario_params)
  @usuario = Usuario.find_by(matricula: usuario_request.matricula)
  if @usuario.update(status: "false")
    mensagem = {body: "Usuario exit", status: @usuario.status}
  end
  render json: mensagem.to_json
end

# POST /login.json
def login
  if params[:usuario] != nil
    usuario_request = Usuario.new(usuario_params)
  else
    usuario_request = Usuario.new
    usuario_request.mac = params[:mac]
    usuario_request.senha = params[:senha]
    usuario_request.matricula = params[:matricula]
  end
  render json: Usuario.valida(usuario_request: usuario_request).to_json
end

  # GET /usuarios
  # GET /usuarios.json
  def index
    @usuarios = Usuario.all
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
    retorno = {body: "erro nos dados", status: false}    
  if params[:usuario] != nil
    @usuario = Usuario.new(usuario_params)
  else
    @usuario = Usuario.new
    @usuario.nome = params[:nome]
    @usuario.senha = params[:senha]
    @usuario.email = params[:email]
    @usuario.matricula = params[:matricula]
    @usuario.mac= params[:mac]   
  end
      if @usuario.save
        retorno = {body: "Usuario cadastrado!", usuario_id: @usuario.id, usuario_nome: @usuario.nome, status: @usuario.status}
      end
    render json: retorno.to_json
  end

  # PATCH/PUT /usuarios/1
  # PATCH/PUT /usuarios/1.json
  def update    
    retorno = {body: "Usuario não atualizado!"}
      if @usuario.update(usuario_params)
        retorno = {body: "Usuario atualizado!", evento_id: @usuario.id, usuario_nome: @usuario.nome}
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
      params.require(:usuario).permit(:nome, :senha, :email, :matricula, :mac, :status)
    end
end
