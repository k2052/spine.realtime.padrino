class Page
  include MongoMapper::Document 
  plugin MongoMapper::Plugins::Timestamps
  include PusherObserver
  attr_accessor :session_id

  key :name, String
  key :body, String
  timestamps!

  def id=(id)
    # prevent id setting
  end
end
