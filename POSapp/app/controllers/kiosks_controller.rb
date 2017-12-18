class KiosksController < ApiController
	before_action :require_login
# 	before_action :load_kiosk, only: [:edit, :update, :destroy]
	
	def index
	  kiosks = Kiosk.all
	  render json: { kiosks: kiosks } 
	end
	
	def show
	 kiosk = Kiosk.find(params[:id])
	 kiosk_user = kiosk.user
	 kiosk_inventory = kiosk.inventories
	 render json: { kiosk: kiosk, username: kiosk_user.username,
		 kiosk_inventory: kiosk_inventory }
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
	
	def update
		kiosk = Kiosk.find(params[:id])
	  if kiosk.update(update_params)
	  	render json: { message: 'Kiosk Updated', kiosk: kiosk, }
	  
	  else
	  	render json: { message: 'Can not be updated!'}
	  end
	end
	
	def destroy
	  kiosk = Kiosk.find(params[:id])
	  kiosk.destroy!
	  render json: { message: "Kiosk was deleted" }
	end
	
	
	private
	
	def kiosk_params
	 params.require(:kiosk).permit(:kiosk_name, :location, :address)
	end
	
	def update_params
	 params.require(:kiosk).permit(:kiosk_name, :location, :address)
	end
	
# 	def load_kiosk
# 	  kiosk = Kiosk.find(params[:id])
# 	end
	  
end