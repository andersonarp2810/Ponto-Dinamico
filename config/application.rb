require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Ponto
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    #cofiguração de linguagem
     config.time_zone = 'Brasilia'

    config.i18n.default_locale = :"pt-BR"
    
     config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*', :headers => :any, :methods => [:get, :post, :options]
      end
    end

    config.active_record.time_zone_aware_types = [:datetime]
    config.active_record.time_zone_aware_types = [:datetime, :time]

    config.serve_static_assets = true
  end
end
