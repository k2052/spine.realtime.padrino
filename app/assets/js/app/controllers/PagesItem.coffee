class PagesItem extends Spine.Controller
  events:
    "click .back": "back"
    "click .edit": "edit"
    "click .destroy": "destroyItem"
    
  constructor: ->
    super
    @active (params) ->
      @change Page.find(params.id)
    
  render: =>
    @view = new PagesShowView(@item)
    @html @view.html()

  change: (item) ->
    @item = item
    @render()

  destroyItem: ->
    @item.destroy()
    @back()

  edit: ->
    @navigate '/pages', @item.id, 'edit'
    
  back: ->
    @navigate '/pages'

window.PagesItem = PagesItem
