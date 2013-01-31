module PusherObserver    
  def self.included(klass)
    klass.class_eval do
      after_create  { publish(:create) }
      after_update  { publish(:update) }
      after_destroy { publish(:destroy) }
    end
  end

  protected
    def publish(type)
      Pusher['observer'].trigger!(
        type.to_s, 
        {
          :id    =>  self.id,
          :class  =>  self.class.name,
          :record => self
        }, 
        self.session_id
      )
    end
end
