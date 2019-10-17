Rails.application.routes.draw do
  get 'users/edit'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html	  root to: 'message#index'
  root 'groups#index'
  resources :messages, only: :index do
  end
  resources :users, only: [:edit, :update] do
  end

end	