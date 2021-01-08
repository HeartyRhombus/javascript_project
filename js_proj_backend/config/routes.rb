Rails.application.routes.draw do
  resources :authors, only: [:index, :create]
  resources :books do
    resources :authors, only: [:index, :create]
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
