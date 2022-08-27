class Api::UserRelationshipsController < ApplicationController
    before_action :ensure_current_user!

    def find #show all people that is not my friend(available) 
        if params[:search] == ''
            render json: ["The search's query can not be empty"], status: 401
        else
            @users = current_user.available_people(params[:search])
            render :find
        end
        
    end
    
    def friends #show all my friends (following)
        @users = current_user.friends
        render :friends
    end
    #show the people who already recieve the friend request from current_user
    def requested_friends
        @users = current_user.requested_friends
        render :requested_friends
    end

    def undo #remove the request that have made
        @request = UserRelationship.find_by(user_id:current_user.id,other_user_id:params[:other_user_id])
        if @request.nil?
            render json: ['The request is invalid'],status: 401 
        else
            @request.delete
            # @users = current_user.requested_friends
            # render 'api/user_relationships/requested_friends'
        end
    end

    #show the user who make friend request
    def pending_requests
        @users = current_user.pending_requests
        render :pending_requests
    end

    #use to respond to the request- accept or block
    def respond
        #it has reject and block accordingly
        puts params;
        @request = UserRelationship.find_by(other_user_id:current_user.id,user_id:params[:other_user_id])
        if @request.nil? || @request.relationship_type != 'Pending'
            render json: ['Invalid request'], status:401
        else
            if params[:decision] == 'Accept'
                @request.approve_request
            elsif params[:decision] == 'Deny'
                @request.deny_request
            else
                render json: ['Invalid request'], status:401
            end
        end

    end
    

    def create # make the friend_request
        @request = UserRelationship.new(user_id:current_user.id,other_user_id:params[:other_user_id])
       if @request.save
            # @users = current_user.requested_friends
            # render '/api/user_relationships/requested_friends'
       else
        render json: @request.errors.full_messages, status: 401
       end
    end

    def update 
        
    end

    

end