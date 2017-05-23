class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  delegate :current_user, :user_signed_in?, to: :user_session
  helper_method :current_user, :user_signed_in?

  #instancia da classe UserSession
  def user_session
    UserSession.new(session)
  end

  def require_authentication
    unless user_signed_in?
      if !Usuario.autentica_usuario_mobile(params[:id])
        render json: {erro: "501", body: " "}.to_json
      end
    end
  end

  def require_no_authentication
    if user_signed_in?
      redirect_to root_path, notice: "ja esta logado"
    else
      
    end
  end

   def can_change
      unless user_signed_in? && current_user == user
        render json: {erro: 503, body:" "}.to_json
      end
    end

    def user
      @usuario ||= Usuario.find_by("id = ?",params[:id])
    end

  def angular
    render 'front/index'
  end
end
