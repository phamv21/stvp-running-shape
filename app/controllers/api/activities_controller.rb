class Api::ActivitiesController < ApplicationController
    before_action :ensure_current_user!
    def index
        @activities = current_user.activities.includes(:route)
        render :index
    end

    def feed #use to show the activities of friends
        @activities = current_user.feed
        render :feed
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