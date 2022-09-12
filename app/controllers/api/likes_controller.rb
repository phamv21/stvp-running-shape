class Api::LikesController < ApplicationController
    before_action :ensure_current_user!
    #for show all people who like the activity
    def index
        activity_ids = get_activities.map{|el| el.id}
       if activity_ids.empty?
            @likes = []
       else
            @likes = Like.like_index(activity_ids, current_user.id)
       end
        render :index

    end

    def create
        @like = Like.new(user_id:current_user.id,activity_id:params[:activity_id])
        if @like.save
            render 'api/likes/show'
        else
            render json: @like.errors.full_messages, status: 401
        end
    end

    def destroy
        @like = Like.find_by(id:params[:id])
        if @like.try(:delete) && @like.try(:user) == current_user
            render 'api/likes/show'
        else
            render ['Invalid Like Action'], status: 401
        end
    end
end