class PagesItemView extends View
  @content: ->
    @li class: 'item'

  initialize: (model) ->
    @.text(model.name) if model
    @.data('id', model.id)

window.PagesItemView = PagesItemView
