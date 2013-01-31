source :rubygems

# Server requirements
gem 'thin', '~> 1.5.0'

# Project requirements
gem 'rake', '~> 10.0.2'

# DB           

## Base
gem 'tzinfo',       '~> 0.3.35'
gem 'bcrypt-ruby',  '~> 3.0.1',  :require => 'bcrypt'
gem 'bson_ext',     '~> 1.8.0',  :require => 'mongo'     
gem 'mongo_mapper', '~> 0.12.0', :require => 'mongo_mapper'

# Component requirements
gem 'compass',        '~> 0.12.2'
gem 'sprockets',      '~> 2.2.1'
gem 'coffee-script',  '~> 2.2.0'
gem 'uglifier',       '~> 1.3.0'
gem 'pusher',         '0.9.4'

# Padrino
gem 'padrino-flash',      '~> 0.2.0',  :git => 'git://github.com/bookworm/padrino-flash.git'     
gem 'padrino-responders', '~> 0.1.5',  :git => 'git://github.com/bookworm/padrino-responders.git' 

# Assets
gem 'padrino-sprockets',    '~> 0.0.1', :git => 'git://github.com/bookworm/padrino-sprockets.git'     
gem 'padrino-assethelpers', '~> 0.1.0', :git => 'git://github.com/bookworm/padrino-assethelpers.git'         

# Output
gem 'slim',       '~> 1.3.4'
gem 'oj',         '~> 1.4.6', :require => 'oj'
gem 'multi_json', '~> 1.4.0', :require => 'multi_json'   

# Development and Test Dependencies
group :development, :test do
  gem 'foreman'
  gem 'guard-jasmine', '~> 1.10.1'
  gem 'ffaker',        '~> 1.15.0', :require => 'ffaker'
  gem 'factory_girl',  '~> 4.1.0',  :require => 'factory_girl'
end

# Test Requirements
group :test do
  gem 'rspec',        '~> 2.12.0'
  gem 'rack-test',    '~> 0.6.2',  :require => 'rack/test'
  gem 'webmock',      '~> 1.9.0'
end

# Padrino fork with better asset handling
gem 'padrino', '~> 0.10.7', :git => 'git://github.com/padrino/padrino-framework.git'
