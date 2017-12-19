class OrdersController < ApiController
	before_action :require_login
	
	def index
	  orders = Order.all
	  render json: { orders: orders } 
	end
	
	def show
	 order = Order.find(params[:id])
	 order_user = order.user
	 order_items = OrdersItem.where(order_id: order.id)
	 render json: { order: order, order_items: order_items, username: order_user.username, }
	end
	
	def create
	 order = Order.new(order_params)
	 order.user = current_user
	 
	 if order.save
		 render json: { message: 'ok', order: order, }
	 else
	 	render json:{ message: 'Could not create Order' }
	 end
	end
	
	private
	
	def order_params
	 params.require(:order).permit(:total)
	end
	
end
