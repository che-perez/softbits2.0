class OrdersItem < ApplicationRecord
	belongs_to :order
	belongs_to :inventory
end