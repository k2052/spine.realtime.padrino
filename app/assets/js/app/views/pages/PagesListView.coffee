class PagesListView extends View
  @content: ->
    @div class: 'wrap', =>
      @h1 'Pages'
      @ul class: 'items', outlet: 'list'
      @a class: 'create', 'Create Page'
  
  reRender: (items) =>
    @list.html ''
    @addItems(items)

  addItems: (items) =>
    for item in items
      @addItem(item)

  addItem: (item) =>
    @list.append(new PagesItemView(item))

window.PagesListView = PagesListView
