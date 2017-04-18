class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def angular
    render 'layouts/application'
  end
end
