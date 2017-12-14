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
	
	private
	
	def item_params
	  params.require(:item).permit(:item_name, :item_type, :item_cost, :item_quantity)
	end
	  
end