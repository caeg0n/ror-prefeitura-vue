require_relative 'boot'
require 'rails/all'
Bundler.require(*Rails.groups)
module PrefeituraVue
  class Application < Rails::Application
    config.load_defaults 6.0
    config.time_zone = 'Buenos Aires'
    config.title = 'Intranet'
    config.sql_path_dev = '/home/k43g0n/Documents/bottle/prefeitura_api/mensagens.db'
    config.sql_path_prod = '/home/k43g0n/Documents/bottle/prefeitura_api/mensagens.db' 
  end
end
