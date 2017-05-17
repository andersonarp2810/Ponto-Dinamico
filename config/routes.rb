Rails.application.routes.draw do
 # resources :usuario_eventos
  resources :eventos
  resources :usuarios
  resource :user_sessions, only: [:create, :new, :destroy]

#rota raiz
root "application#angular"
#rota para logout usuario via post
  match 'logout', to: 'user_sessions#destroy', via: [:delete]
#rota para cadastrar usuario via post
  match 'cadastrarusuario', to: 'usuarios#create', via: [:post]
#rota para login usuario via post
  match 'login', to: 'user_sessions#create', via: [:post]
#rota para realizar o ponto
  match 'realizarponto', to: 'eventos#realizarponto', via: [:post]
#rota get ultimo ponto
  match 'getponto/:id', to: 'usuarios#get_ponto', via: [:get]
#rota cadastrar eventos
  match 'cadastrarevento', to: 'eventos#create', via: [:post]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
