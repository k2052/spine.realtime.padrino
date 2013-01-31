class PagesEdit extends Spine.Controller
  events:
    "click .back": "back"
    "submit form": "update"

  constructor: ->
    super
    @active (params) ->
      @change Page.find(params.id)

  render: =>
    @view = new PagesEditView(@item)
    @html(@view.html())

  change: (item) ->
    @item = item
    @render()

  update: (e) ->
    e.preventDefault()
    @item.updateAttributes($(e.target).serializeForm())
    @back()
   
  back: ->
    @navigate '/pages', @item.id

window.PagesEdit = PagesEdit
