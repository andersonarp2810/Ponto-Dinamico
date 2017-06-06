class UserSession
    include ActiveModel::Model
    attr_accessor :email, :password, :matricula, :created_at
    validates_presence_of :password, :matricula, :created_at


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
        @session[:created_at] = Time.now.to_formatted_s(:number)  
    end

    def current_user
        usuario = Usuario.find_by(id: @session[:user_id])
        usuario.password = nil
        usuario
    end

    def user_signed_in?
        @session[:user_id].present?
    end

    def user_expiration?
        time_now = Time.now.to_formatted_s(:number)
        if ((time_now.to_i - @session[:created_at].to_i) > 60000)
            destroy(@session[:user_id])
            return true
        else
            @session[:created_at] = time_now
            return false
        end
        
    end

    def destroy(id)
        if user_signed_in?
            @session[:user_id] = nil
        else
            usuario = Usuario.find_by(id: id)
            if usuario.present? and usuario.status = "true"
                usuario.update(status: 0)
            end
        end
        
    end
end

