class UsuarioEventosController < ApplicationController
  before_action :set_usuario_evento, only: [:show, :edit, :update, :destroy]
  before_action :require_authentication, only: [:show, :edit, :update, :destroy, :create, :index]
  #before_action :can_change, only: [:edit, :update, :destroy, :index]

  #relatorio mobile ponto do usuario
  # GET / relatoriousuario/1/1
  def relatoriousuario
        usuario_evento = UsuarioEvento.search(params[:usu_id], params[:eve_id],"")
        if usuario_evento.present?
          if usuario_evento[0]["hora_inicio"].blank?
            render json: {erro: "301", body: ""}
          else
            render json: {erro: "000", body: usuario_evento}
          end
        else
          render json: {erro: "314", body: ""}
        end
  end

  #GET /pesquisarelatoriousuario/nome/1
  def pesquisa_relatorio_evento
    mensagem = {erro: "301", body: ""}
    id_evento = Evento.select(:id).where("LOWER(nome) LIKE ?", "%#{params[:nome_evento].downcase}%")
    if id_evento.present?
      usuario_evento = UsuarioEvento.search(params[:usuario_id],id_evento[0].id,"")
      if usuario_evento.present?
        mensagem = {erro: "000", body: usuario_evento}        
      end
    end
    render json: mensagem
  end

  #GET /datarelatorioevento/data/usuario_id
  def data_relatorio_evento
    mensagem = {erro: "301", body: ""}
    usuario_evento = UsuarioEvento.search(params[:usuario_id], "",params[:data])
    if usuario_evento.present?
      mensagem = {erro: "000", body: usuario_evento}
    end
    render json: mensagem
  end
end
