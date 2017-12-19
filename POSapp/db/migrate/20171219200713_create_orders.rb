class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
	    t.float :total
	    t.belongs_to :user
	    t.timestamps
    end
  end
end
