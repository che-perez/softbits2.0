class CreateInventories < ActiveRecord::Migration[5.1]
  def change
    create_table :inventories do |t|
	    t.string :item_name
	    t.string :item_type
	    t.decimal :item_cost
	    t.integer :item_quantity
	    t.belongs_to :kiosk
	    
	    t.timestamps
    end
  end
end
