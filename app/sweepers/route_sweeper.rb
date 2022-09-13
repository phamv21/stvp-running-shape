class RouteSweeper < ActionController::Caching::Sweeper
  # observe hook to activity
  observe Route

  # If our sweeper detects that a Product was created call this
  def after_create(route)
    expire_cache_for(route)
  end

  # If our sweeper detects that a route was updated call this
  def after_update(route)
   expire_cache_for(route)
 end

  # If our sweeper detects that a route was deleted call this
  def after_destroy(route)
    expire_cache_for(route)
  end

  private
  def expire_cache_for(route)
    # Expire the index page now that we added a new product
    expire_page(:controller => 'routes', :action => 'index')


  # Expire a fragment
    expire_fragment( controller: 'routes', action: 'show', id: route.id)
  end
end