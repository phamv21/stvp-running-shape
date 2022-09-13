class Api::ActivitiesController < ApplicationController
    before_action :ensure_current_user!
    cache_action :index
    cache_sweeper :activity_sweeper
    def index
        @activities = current_user.activities.includes(:route)
        render :index
    end

    def feed #use to show the activities of friends
        if params[:page].to_i == 0
            @activity_feed = current_user.feed.order('activities.id DESC').limit(Activity::FEEDPERPAGE)
        elsif params[:page].to_i > 0
            last_id = params[:last_id].to_i
                if last_id > 0
                    @activity_feed = current_user.feed.order('activities.id DESC').where('activities.id < ?',last_id).limit(Activity::FEEDPERPAGE)
                else
                    @activity_feed = current_user.feed.order('activities.id DESC').limit(Activity::FEEDPERPAGE).offset(params[:page].to_i*Activity::FEEDPERPAGE)
                end
        end
        
        activity_ids = @activity_feed.map{|el| el.id}
        if activity_ids.empty?
            @comments = []
            @likes = []
            @comment_count = 0
            @like_count = 0
        else
            @comments = Comment.feed_recent_comments(activity_ids)
            @likes = Like.like_index(activity_ids, current_user.id)
            @comment_count = Activity.comment_count(activity_ids)
            @like_count = Activity.like_count(activity_ids)
        end
        render :feed

    end
    def user_feed
        @user = User.find_by(id:params[:id])
        if @user.nil?
            render json: ['invalid User'], status: 401
        else
            if params[:page].to_i == 0
               @activity_feed = @user.personal_feed(current_user.id).order('activities.id DESC').limit(Activity::FEEDPERPAGE)
            elsif params[:page].to_i > 0
                last_id = params[:last_id].to_i
                if last_id > 0
                    @activity_feed = @user.personal_feed(current_user.id).order('activities.id DESC').where('activities.id < ?',last_id).limit(Activity::FEEDPERPAGE)
                else
                    @activity_feed = @user.personal_feed(current_user.id).order('activities.id DESC').limit(Activity::FEEDPERPAGE).offset(params[:page].to_i*Activity::FEEDPERPAGE)
                end
            end
            activity_ids = @activity_feed.map{|el| el.id}

            if activity_ids.empty?
            @comments = []
            @likes = []
            @comment_count = 0
            @like_count = 0
        else
            @comments = Comment.feed_recent_comments(activity_ids)
            @likes = Like.like_index(activity_ids, current_user.id)
            @comment_count = Activity.comment_count(activity_ids)
            @like_count = Activity.like_count(activity_ids)
        end
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
            @comment_count = Activity.comment_count(@activity.id)
            @like_count = Activity.like_count(@activity.id)
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