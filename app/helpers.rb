Spine.helpers do
  def pusher_meta_tags
    tag('meta', :name => 'pusher-key', :content => Pusher.key)
  end
  
  def x_session_id
    env["HTTP_X_SESSION_ID"]
  end
end
