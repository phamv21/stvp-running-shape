class Api::SessionsController < ApplicationController

    def create
        @user = User.login_by_credentials(params[:user][:username],params[:user][:password])
        if @user
            login!(@user)
            render 'api/users/show'
        else
            render json: ['Wrong credentials'],status: 401
        end
    end

    def destroy
        if logged_in?
            logout!
            return render json: ['You have logged out']
        else
            return render json: ['you should log in first'], status: 401

        end

    end
    private

end