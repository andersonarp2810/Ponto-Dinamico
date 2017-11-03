Rails.application.routes.draw do
  resources :usuario_eventos
  resources :eventos
  resources :usuarios
  resource :user_sessions, only: [:create, :new, :destroy]

#rota raiz
  root "application#angular"
#verificar autenticação
  match 'autentica', to: "user_sessions#permit", via: [:get]
#rota para logout usuario via post
  match 'logout/:id', to: 'user_sessions#destroy', via: [:delete]
#rota para cadastrar usuario via post
  match 'cadastrarusuario', to: 'usuarios#create', via: [:post]
#rota para login usuario via post
  match 'login', to: 'user_sessions#create', via: [:post]
#rota para realizar o ponto
  match 'realizarponto', to: 'eventos#realizarponto', via: [:post]
#rota get ultimo ponto
  match 'getponto/:user_id/:evento_id', to: 'usuarios#get_ponto', via: [:get]
#rota realizar inscrição
  match 'inscricao/:usuario_id/:evento_id', to: 'eventos#inscricao', via: [:get]
#rota cadastrar eventos
  match 'cadastrarevento', to: 'eventos#create', via: [:post]
  #rota relatorio ponto usuario
  match 'relatoriousuario/:usu_id/:eve_id', to: 'usuario_eventos#relatoriousuario', via: [:get]
  #rota eventos mobile
  match 'eventosmobile', to: 'eventos#eventos_mobile', via: [:get]
  #rota para pesquisa de ponto pelo nome do evento e id do usuario (mobile)
  match 'pesquisarelatoriousuario/:nome_evento/:usuario_id', to: 'usuario_eventos#pesquisa_relatorio_evento', via: [:get]
  #rota pesquisa de ponto pela data (mobile)
  match 'datarelatorioevento/:data/:usuario_id', to: 'usuario_eventos#data_relatorio_evento', via: [:get]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
