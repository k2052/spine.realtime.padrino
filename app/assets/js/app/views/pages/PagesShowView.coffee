class PagesShowView extends View
  @content: ->
    @div class: 'wrap', =>
      @a class: 'back',    'Back'
      @a class: 'edit',    'Edit'
      @a class: 'destroy', 'Delete'
      @p outlet: 'name', 'Name'
      @p outlet: 'body', 'Body'

  initialize: (model) ->
    @name.text(model.name)
    @body.text(model.body)

window.PagesShowView = PagesShowView
