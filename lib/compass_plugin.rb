# Enables support for Compass, a stylesheet authoring framework based on SASS.
# See http://compass-style.org/ for more details.
# Store Compass/SASS files (by default) within 'app/stylesheets'

module CompassInitializer
  def self.registered(app)
    require 'sass/plugin/rack'
    
    Compass.configuration do |config|    
      config.project_type     = :stand_alone
      config.project_path     = Padrino.root
      config.sass_dir         = 'app/assets/css' 
      config.http_path        = '/'
      config.css_dir          = 'public/css'
      config.images_dir       = 'public/images' 
      config.images_path      = 'public/images'   
      config.output_style     = :expanded  
      config.http_images_path = config.http_path + 'images'
    end
        
    Compass.configure_sass_plugin!
    Compass.handle_configuration_change!

    app.use Sass::Plugin::Rack
  end
end
