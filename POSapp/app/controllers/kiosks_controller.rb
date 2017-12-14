class KiosksController < ApiController
	before_action :require_login
	
	def index
	  kiosks = Kiosk.all
	  render json: { kiosks: kiosks } 
	end
	
	def show
	 kiosk = Kiosk.find(params[:id])
	 kiosk_user = kiosk.user
	 kiosk_inventory = Inventory.where(kiosk_id: kiosk.id)
	 render json: { kiosk: kiosk, username: kiosk_user.username, kiosk_inventory: kiosk_inventory }
	end
	
	def create
	 kiosk = Kiosk.new(kiosk_params)
	 kiosk.user = current_user
	 
	 if kiosk.save
		 render json: { message: 'ok', kiosk: kiosk, }
	 else
	 	render json:{ message: 'Could not create Kiosk' }
	 end
	end
	
	private
	
	def kiosk_params
	  params.require(:kiosk).permit(:kiosk_name, :location, :address)
	end
	  
end