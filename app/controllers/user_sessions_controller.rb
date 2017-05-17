class UserSessionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def new
        @user_session = UserSession.new(session)
    end

    def create
        @user_session = UserSession.new(session, valid_request?)
        if @user_session.authenticate!
            if user_signed_in?.present?
                render json:{erro: "000", body: {usuario_id:current_user.id, nome:current_user.nome, matricula:current_user.matricula}}.to_json
            else
                render json: {erro: @user_session.authenticate![:erro], body:" "}           
            end
        end
    end

    def destroy
        user_session.destroy
        render json:{erro: "000", body:" "}
    end

    private
        def valid_request?
            json = params[:user_session]
            json = JSON.parse(json.to_json)
            rescue JSON::ParserError => e
            json = JSON.parse(json)
        end
end