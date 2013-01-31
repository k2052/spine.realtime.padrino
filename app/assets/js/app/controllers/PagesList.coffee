class PagesList extends Spine.Controller
  className: "list"
  
  elements: 
    ".items": "items"
  
  events:
    "click .item": "show"
    "click .create": "create"
    
  constructor: ->
    super
    @view = new PagesListView()
    @append(@view)
    Page.bind("refresh change", @render)
    
  render: =>
    @view.reRender(Page.all())
    
  show: (e) ->
    item = Page.find($(e.target).data('id'))
    @navigate "/pages", item.id
    
  create: (e) ->
    item = Page.create(name: 'Dummy page')
    @navigate "/pages", item.id, "edit"

window.PagesList = PagesList
