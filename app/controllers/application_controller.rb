class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?, :ensure_current_user!
        @@store_activities = nil
        @@searched_routes = {}
    def login!(user)
        @@current_user = user
        session[:session_token] = @@current_user.session_token  

    end

    def logout!
        current_user.try(:reset_session_token!)
        session[:session_token] = nil
        @@current_user = nil
    end

    def current_user
         if session[:session_token].nil?
            return nil
         else
           return @@current_user ||= User.find_by(session_token:session[:session_token])
         end
     
    end

    def logged_in?
      !current_user.nil?
    end

    def ensure_current_user!
        redirect_to '/' unless current_user
    end

    def store_activities(activities)
      @@storage_activities = activities unless activities.nil? || activities.length == 0
    end
    
    def get_activities
      @@storage_activities
    end
    def store_searched_routes(routes,total = 0)
      @@searched_routes[:routes] = routes unless routes.nil? || routes.length == 0
      @@searched_routes[:total] = total if total != 0
    end
    def get_searched_routes
      @@searched_routes
    end

end