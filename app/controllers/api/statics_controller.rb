class Api::StaticsController < ApplicationController
    #use to fetch all the picture
    
    def index
        expires_in 12.hours, :public => true
        render :index
    end
end