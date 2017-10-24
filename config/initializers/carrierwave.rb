CarrierWave.configure do |config|
    config.ignore_integrity_errors = false
    config.ignore_processing_errors = false
    config.ignore_download_errors = false

    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
        # Configuration for Amazon S3 should be made available through an Environment variable.
        # For local installations, export the env variable through the shell OR
        # if using Passenger, set an Apache environment variable.
        #
        # In Heroku, follow http://devcenter.heroku.com/articles/config-vars
        #
        # $ heroku config:add S3_KEY=AKIAIII7T4O7ITXCNEQA S3_SECRET=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 S3_REGION=sa-east-1 S3_ASSET_URL=https://s3-sa-east-1.amazonaws.com/eventos-ponto S3_BUCKET_NAME=eventos-ponto S3_ENDPOINT=https://s3-sa-east-1.amazonaws.com/
        # Configuration for Amazon S3

        :provider              => 'AWS',
        :aws_access_key_id     => ENV['S3_KEY'],
        :aws_secret_access_key => ENV['S3_SECRET'],
        :region                => ENV['S3_REGION'],        
        :endpoint              => ENV['S3_ENDPOINT']
      }
    
      # For testing, upload files to local tmp folder.
      if Rails.env.test? || Rails.env.cucumber?
        config.storage = :file
        config.enable_processing = false
        config.root = "#{Rails.root}/tmp"
      else
        config.storage = :fog
      end
    
      config.cache_dir = "#{Rails.root}/tmp/uploads"                  # To let CarrierWave work on heroku    
      config.fog_directory    = ENV['S3_BUCKET_NAME']      
      # config.s3_access_policy = false                          # Generate http:// urls. Defaults to :authenticated_read (https://)
      # config.fog_host         = "#{ENV['S3_ASSET_URL']}/#{ENV['S3_BUCKET_NAME']}"      
  end