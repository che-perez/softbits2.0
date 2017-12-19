class CreateOrdersItems < ActiveRecord::Migration[5.1]
  def change
    create_table :orders_items do |t|
	    t.belongs_to :order
	    t.belongs_to :inventory
	    t.integer :quantity
	    t.float :item_price
	    t.float :total
	    t.timestamps
    end
  end
end
