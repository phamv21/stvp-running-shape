class Api::UserRelationshipsController < ApplicationController
    before_action :ensure_current_user!

    def find #show all people that is not my friend(available) 
        @users = current_user.available_people(params[:search])
        render :find
    end
    
    def friends #show all my friends (following)
        @users = current_user.friends
        render :friends
    end

    def requested
        @users = current_user.requested_friends
        render :requested
    end
    #use to respond to the request
    def respond
        
    end
    #user to show the make friend request
    def pending_requests
        @requests = current_user.pending_requests
    end

    def create # make the friend_request
        
    end

    #approve or reject the request
    def update 
        
    end

    def destroy #note sure
        
    end

end