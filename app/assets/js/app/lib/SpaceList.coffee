# Version of Spine.list that is compatible with SpacePen
class SpaceList extends Spine.Controller
  events:
    'click .item': 'click'

  selectFirst: false
  view: null

  constructor: ->
    super
    @bind 'change', @change
    @view = new template()

  template: ->
    throw 'Override template'

  change: (item) =>
    @current = item

    unless @current
      @children().removeClass('active')
      return

    @children().removeClass('active')
    $(@children().get(@items.indexOf(@current))).addClass('active')

  render: (items) ->
    @items = items if items
    @html  = @view.addItems(@items)
    @change @current
    if @selectFirst
      unless @children('.active').length
        @children(':first').click()

  children: (sel) ->
    @el.children(sel)

  click: (e) ->
    item = @items[$(e.currentTarget).index()]
    @trigger('change', item)
    true

window.SpaceList = SpaceList
