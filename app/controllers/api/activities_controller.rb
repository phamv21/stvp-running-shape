class Api::ActivitiesController < ApplicationController
    before_action :ensure_current_user!
    def index
        @activities = current_user.activities.includes(:route)
        render :index
    end

    def feed #use to show the activities of friends
        @activity_feed = current_user.feed
        activity_ids = @activity_feed.map{|el| el.id}
        @comment_count = Activity.comment_count(activity_ids)
        render :feed
    end
    def user_feed
        @user = User.find_by(id:params[:id])
        if @user.nil?
            render json: ['invalid User'], status: 401
        else
            @activity_feed = @user.personal_feed(current_user.id)
            activity_ids = @activity_feed.map{|el| el.id}
            @comment_count = Activity.comment_count(activity_ids)
            render 'api/activities/feed'
        end
        
    end

    def show
        @activity = Activity.includes(:route).find(params[:id])
        if @activity.nil? || @activity.user != current_user
            render json: ['wrong activity id'], status: 401
        else
            render :show
        end
        
    end

    def create
        tmp = activity_params
        tmp[:user_id] = current_user.id
        @activity = Activity.new(tmp)
        if @activity.save
            render 'api/activities/show'
        else
            render json: @activity.errors.full_messages, status: 401
        end
        
    end

    def update
        
    end

    def destroy
    end
    private
    def activity_params
        params.require(:activity).permit(:route_id,:title,:note,:duration,:starting_time)
    end
end