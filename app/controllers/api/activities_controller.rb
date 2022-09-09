class Api::ActivitiesController < ApplicationController
    before_action :ensure_current_user!
    def index
        @activities = current_user.activities.includes(:route)
        render :index
    end

    def feed #use to show the activities of friends
        sleep 1
        @activity_feed = current_user.feed
        store_activities(@activity_feed)
        @activity_ids = @activity_feed.map{|el| el.id}
        @comment_count = Activity.comment_count(@activity_ids)
        @like_count = Activity.like_count(@activity_ids)
        render :feed
    end
    def user_feed
        sleep 1
        @user = User.find_by(id:params[:id])
        if @user.nil?
            render json: ['invalid User'], status: 401
        else
            @activity_feed = @user.personal_feed(current_user.id)
            store_activities(@activity_feed)
            @activity_ids = @activity_feed.map{|el| el.id}
            @comment_count = Activity.comment_count(@activity_ids)
            @like_count = Activity.like_count(@activity_ids)
            render 'api/activities/feed'
        end
        
    end

    def show
        @activity = Activity.includes(:user,:route).find_by(id:params[:id])
        if @activity.nil? || !@activity.can_show?(current_user.id)
            render json: ['wrong activity id or private route'], status: 401
        else
            @comment_count = Activity.comment_count([params[:id]])
            @like_count = Activity.like_count([params[:id]])
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