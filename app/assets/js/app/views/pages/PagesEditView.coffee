class PagesEditView extends View
  @content: ->
    @div class: 'wrap', =>
      @a class: 'back', 'Back'
      @a class: 'edit', 'Edit'
      @form =>
        @label =>
          @span 'Name'
          @input type: 'text', name: 'name', outlet: 'name'
        @label =>
          @span 'Body'
          @textarea name: 'body', outlet: 'body'

        @button outle: 'save', 'Save'

  initialize: (model) ->
    @name.val(model.name)
    @body.val(model.body)

window.PagesEditView = PagesEditView
