#= require ./PagesEdit.coffee
#= require ./PagesItem.coffee
#= require ./PagesList.coffee

$ = jQuery

class Pages extends Spine.Controller
  constructor: ->    
    super
    @list = new PagesList
    @edit = new PagesEdit
    @item = new PagesItem
    
    new Spine.Manager(@list, @edit, @item)
    
    @append(@list, @edit, @item)
    
    @routes
      "/pages": (params) -> 
        @list.active(params)
      "/pages/:id/edit": (params) ->
        @edit.active(params)
      "/pages/:id": (params) ->
        @item.active(params)
        
    @list.active()
        
    # Only setup routes once pages have loaded
    Page.bind 'refresh', -> 
      Spine.Route.setup()

    Page.fetch()
  
window.Pages = Pages
