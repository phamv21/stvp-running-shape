Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
    root 'static#root'
    namespace :api, default:{format: :json} do
      resource :session, only:[:create,:destroy]
      resources :users, only:[:create,:destroy,:show,:update]
      resources :routes, only:[:index,:show,:create,:destroy]
      resources :user_relationships, only:[:create,:update,:destroy]
      post 'relationship/find', to:"user_relationships#find"
      post 'relationship/respond', to:"user_relationships#respond"
      get 'relationship/friends', to:"user_relationships#friends"
      get 'relationship/requested', to:"user_relationships#requested"
      
    end
end
