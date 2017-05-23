class UserSession
    include ActiveModel::Model
    attr_accessor :email, :password, :matricula
    validates_presence_of :password, :matricula


    def initialize(session, attributes={})
        @session = session
        @user = Usuario.new(attributes)
    end

    def authenticate!
        usuario = Usuario.authenticate(@user)
        if usuario[:erro] == nil
            store(usuario)
        else       
            usuario
        end
    end

    def store(usuario)
        @session[:user_id] = usuario.id        
    end

    def current_user
        Usuario.find(@session[:user_id])
    end

    def user_signed_in?
        @session[:user_id].present?
    end

    def destroy
        @session[:user_id] = nil
    end
end

