class UserSessionsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :require_authentication, only: [:permit]

    def permit
        render json:{erro: "000", body:" "}        
    end

    def new
        @user_session = UserSession.new(session)
    end

    def create
        @user_session = UserSession.new(session, valid_request?)
        if @user_session.authenticate!
            if user_signed_in?.present?
                Usuario.update(current_user.id, status: 1)
                render json:{erro: "000", body: {usuario_id:current_user.id, nome:current_user.nome, matricula:current_user.matricula, status: current_user.status}}.to_json
            else
                render json: {erro: @user_session.authenticate![:erro], body:{status: false}}
            end
        end
    end

    def destroy
        id = params[:id]
        usuario = Usuario.find_by(id: id)
        if usuario.nivel == "usuario_adm"
            user_session.destroy(id)
            if user_signed_in?
                render json:{erro: "000", body:{status: false}}
            end
        else
            usuario.update(status: 0)
            render json:{erro: "000", body:{status: false}}
        end
        render json:{erro: "deu treta"}
    end

    private
        def valid_request?
            json = params[:user_session]
            json = JSON.parse(json.to_json)
            rescue JSON::ParserError => e
            json = JSON.parse(json)
        end
end