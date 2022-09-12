class Api::RoutesController < ApplicationController
    before_action :ensure_current_user!
    def index
        #it have the boundary
        #it may show my run
        #it my show the result of the friend route or the public route in the area
        @routes = current_user.routes.with_attached_thumb #should apply filter later
        render :index

    end
    #serch here using the bounds to show the result 
    def search
        filters = params[:filters]
        page = params[:page].to_i
        @search = Route.with_filters(filters,current_user.id)
        if page == 0
            @total_result = @search.select('count(*) AS total')[0].total
            @routes = @search.order(:id).limit(Route::ROUTEPERPAGE)
            store_searched_routes(@routes,@total_result)
        elsif page > 0
            last_id = get_searched_routes[:routes].last
            @routes = @search.order(:id).limit(Route::ROUTEPERPAGE).where('routes.id > ?',last_id);
            @total_result = get_searched_routes[:total]
            store_searched_routes(@routes)
        end

        render :search
    end

    def show
        @route = Route.with_attached_thumb.includes(:pins).find_by(id:params[:id])
        if @route.try(:can_show?,current_user.id) 
            render :show
        else
            render json: ['It is private route,or the route does not exist'], status: 401
        end
        
    end

    def create
        tmp = route_params
        tmp[:user_id] = current_user.id
        tmp[:pin_infos] = tmp[:pin_infos].map{|el| JSON.parse(el)}
        @route = Route.new(tmp)
        if @route.save
            render 'api/routes/show'
        else
            render json: @route.errors.full_messages, status: 401
        end

    end

    def update
    end

    private
    def route_params
        params.require(:route).permit(:name,:area_name,:description,:privacy,:activity,:distance,:thumb,:pin_infos=>[])#[:lat,:lng,:description]
    end

end