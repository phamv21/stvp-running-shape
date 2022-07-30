Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
    root 'static#root'
    namespace :api, default:{format: :json} do
      resource :session, only:[:create,:destroy]
      resources :users, only:[:create,:destroy,:show,:update]
    end
end
