class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def angular
    render 'front/index'
  end
end
