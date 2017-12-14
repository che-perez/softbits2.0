class CreateKiosks < ActiveRecord::Migration[5.1]
  def change
    create_table :kiosks do |t|
	    t.string :kiosk_name
	    t.string :location
	    t.text :address
	    t.belongs_to :user
	    
	    t.timestamps
    end
  end
end
