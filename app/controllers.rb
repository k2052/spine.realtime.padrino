Spine.controllers :pages, :provides => [:html, :json]  do    
  before(:show, :edit, :update, :destroy) do
    @page = Page.find_by_id(params[:id])     
  end

  before(:edit, :update, :destroy) do
    @page.session_id = x_session_id
  end

  before(:create, :edit, :update) do
    params[:page] = MultiJson.load(request.body.read)
  end
  
  get :index, :map => '/' do  
    render 'pages/index'
  end 
  
  get :all, :map => '/pages' do  
    @pages = Page.all       
    respond(@pages)
  end  

  get :show, :map => '/pages/:id' do  
    render 'pages/show'
  end

  get :new, :map => '/pages/new' do  
    @page = Page.new
    render 'pages/new'
  end

  get :edit, :map => '/pages/edit/:id' do 
    render 'pages/edit'
  end

  post :create, :map => '/pages' do  
    @page = Page.new(params[:page])
    @page.session_id = x_session_id
    if @page.save
      respond(@page, :status => :created, :location => url(:pages, :show, :id => @page.id))
    else      
      respond(@page, :status => :unprocessable_entity)
    end
  end

  put :update, :map => '/pages/:id' do 
    @page.update_attributes(params[:page])
    if @page.save
      respond(@page)
    else
      respond(@page, :status => :unprocessable_entity)
    end
  end

  delete :destroy, :map => '/pages/:id' do  
    if @page.destroy
      respond(@page)
    else     
      respond(@page, :status => :unprocessable_entity)
    end
  end
end
