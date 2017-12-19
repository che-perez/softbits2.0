class InventoriesController < ApiController
	before_action :require_login
	
	def index
	  items = Inventory.all
	  render json: { inventory: items }
	end
	
	def show
	  item = Inventory.find(params[:id])
	  item_kiosk = item.kiosk
	  render json: { item: item, kiosk_name: item_kiosk.kiosk_name }
	end
	
	def create
	  item = Inventory.new(item_params)
	  current_kiosk = Kiosk.find(params[:kiosk_id])
 	  item.kiosk = current_kiosk
	  
	  if item.save
		  render json: {
			  message: 'ok',
			  item: item,
		  }    
	  else
	  	render json: { message: 'Could not add item to Inventory' }
	  end
	end
	
	def update
	  item = Inventory.find(params[:id])
	  if item.update(update_params)
	  	render json: { message: 'item Updated', item: item, }
	  
	  else
	  	render json: { message: 'Can not be updated!'}
	  end
	end
	
	def destroy
	  item = Inventory.find(params[:id])
	  	item.destroy!
	  	render json: { message: "Item was deleted" }
	end
	
	private
	
	def item_params
	 params.require(:item).permit(:item_name, :item_type, :item_cost, :item_quantity)
	end
	
	def update_params
	 params.require(:item).permit(:item_name, :item_type, :item_cost, :item_quantity)
	end
	  
end