class Api::UsersController < ApplicationController
    before_action :ensure_current_user!, only:[:show,:update]
    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render 'api/users/show'
        else
            render json: @user.errors.full_messages, status: 401
        end
    end

    def show
        @user.find_by(id:params[:id])
        render :show
    end

    def update
        #only update avata for now
        @user = current_user
        if @user.update(avatar:params[:user][:avatar])
            render 'api/users/show'
        else
            render json: @user.errors.full_messages, status: 401
        end
        
    end
    private
    def user_params
        params.require(:user).permit(:username,:gender,:password,:birthday,:email,:avatar)
    end
end