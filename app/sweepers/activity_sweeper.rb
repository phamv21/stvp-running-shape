class ActivitySweeper < ActionController::Caching::Sweeper
  # observe hook to activity
  observe Activity

  # If our sweeper detects that a Product was created call this
  def after_create(activity)
    expire_cache_for(activity)
  end

  # If our sweeper detects that a activity was updated call this
  def after_update(activity)
   expire_cache_for(activity)
 end

  # If our sweeper detects that a activity was deleted call this
  def after_destroy(activity)
    expire_cache_for(activity)
  end

  private
  def expire_cache_for(activity)
    # Expire the index page now that we added a new product
    expire_page(:controller => 'activities', :action => 'index')

  # Expire a fragment
    # expire_fragment('all_available_activities')
  end
end