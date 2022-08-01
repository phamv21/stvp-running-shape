class Api::RoutesController < ApplicationController
    def index
        #it have the boundary
        #it may show my run
        #it my show the result of the friend route or the public route in the area


    end

    def show
        @route = Route.find_by(id:params[:id])
        if @route.can_show?(current_user.id)
            render :show
        else
            render json: ['It is private route,or the route does not exist'], status: 401
        end
        
    end

    def create
        tmp = route_params
        tmp[:user_id] = current_user.id
        @route = Route.new(tmp)
        if @route.save
            render 'api/routes/show'
        else
            render @route.errors.full_messages, status: 401
        end

    end

    def update
    end

    private
    def route_params
        params.require(:route).permit(:name,:description,:privacy,:activity,:distance,:pin_infos=>[:lat,:lng,:description])
    end

end