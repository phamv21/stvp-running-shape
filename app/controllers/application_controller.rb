class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?, :ensure_current_user!
    def login!(user)
        @current_user = user
        session[:session_token] = @current_user.session_token  

    end

    def logout!
        @current_user.try(:reset_session_token!)
        session[:session_token] = nil
        @current_user = nil
    end

    def current_user
         if session[:session_token].nil?
            return nil
         else
           return @current_user ||= User.find_by(session_token:session[:session_token])
         end
     
    end

    def logged_in?
      !current_user.nil?
    end

    def ensure_current_user!
        redirect_to '/' unless current_user
    end
end