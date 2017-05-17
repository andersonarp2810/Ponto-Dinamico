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
    render json: {erro: "303", body: " "}.to_json
    end
  end

  def require_no_authentication
    if user_signed_in?
      redirect_to root_path, notice: "ja esta logado"
    else
      
    end
  end

  def angular
    render 'front/index'
  end
end
