class UsersController < ApiController
	before_action :require_login, except: [:create]
	
	def create
	  user = User.create!(user_params)
	  render json: { token: user.auth_token }
	end
	
	def profile
	  user = User.find_by_auth_token!(request.headers[:token])
	  
	  user_kiosks = Kiosk.where(user_id: user.id)
	  
	  kiosk_inventory = Inventory.where(kiosk_id: user_kiosks.ids)
	  
	  render json: { user: { username: user.username, firstname: user.fname, lastname: user.lname }, kiosk:  user_kiosks , inventory: kiosk_inventory, }
	end
	
	private
	
	def user_params
	  params.require(:user).permit(:fname, :lname, :username, :password)
	end
end
