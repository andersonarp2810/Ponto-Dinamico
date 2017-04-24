Rails.application.routes.draw do
  resources :eventos
  resources :usuarios

#rota raiz
  root "application#angular"
#rota para logout usuario via post
  match 'logout', to: 'usuarios#logout', via: [:post]
#rota para cadastrar usuario via post
  match 'cadastrarusuario', to: 'usuarios#create', via: [:post]
#rota para login usuario via post
  match 'login', to: 'usuarios#login', via: [:post]
#rota para realizar o ponto
  match 'realizarponto', to: 'eventos#realizarponto', via: [:post]
#rota cadastrar eventos
  match 'cadastrarevento', to: 'eventos#create', via: [:post]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
