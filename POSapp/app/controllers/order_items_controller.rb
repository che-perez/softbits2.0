class OrderItemsController < ApiController
	
	def create
	 receipt = OrdersItem.new(receipt_params)
	 current_order = Order.find(params[:order_id])
	 receipt.order = current_order
	 
	 if receipt.save
		 render json: { message: 'ok', receipt: receipt, }
	 else
	 	render json:{ message: 'Could not create Receipt' }
	 end
	end

  private
  
  def receipt_params
    params.require(:receipt).permit(:inventory_id, :quantity, :item_price, :total)
  end

end
