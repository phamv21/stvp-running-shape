class Api::CommentsController < ApplicationController
    before_action :ensure_current_user!
    #Show all the comment in the activity
    def index
        sleep 1
        #stop the user to fetch the private comment 
        @activity = Activity.includes(comments:[:user]).find_by(id:params[:activity_id])
        if @activity.nil? #|| @activity.allow_to_comment?(current_user.id)
            render json: ['invalid or private activity'], status: 401
        else
            @comments = @activity.comments
            render :index
        end
        
    end
    def feed
        sleep 1
        activity_ids ||= get_activities.map{|el| el.id}
        if activity_ids.empty?
            @comments = []
        else
            @comments = Comment.feed_recent_comments(activity_ids)
        end
        render :feed
    end
    
    def create
        @comment = Comment.new(comment_params)
        @comment.user_id = current_user.id
        if @comment.save
            render 'api/comments/show'
        else
            render json: @comment.errors.full_messages, status: 401
        end
    end

    #delete the comment
    def destroy
        
    end
    private
    def comment_params 
        params.require(:comment).permit(:content,:activity_id)
    end

end