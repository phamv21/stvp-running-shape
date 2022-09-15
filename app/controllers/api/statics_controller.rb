class Api::StaticsController < ApplicationController
    #use to fetch all the picture
    
    def index
        expires_in 12.hours, :public => true
        @images = ["run1","run2","run3"]
        render :index
    end
end