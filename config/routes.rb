Rails.application.routes.draw do
  mount ActionCable.server => '/api/cable'
  root :to => 'login#index'
  get 'login/index'
  get 'mensagens/index'
  get 'calendario/index'
  get 'funcionarios/index'
  get 'contatos/index'
  get 'inicio/index'
  get 'hello/say_hello'
end
