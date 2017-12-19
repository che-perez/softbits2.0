class Inventory < ApplicationRecord
	belongs_to :kiosk
	has_many :orders_items
	
end
