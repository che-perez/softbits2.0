class Order < ApplicationRecord
	belongs_to :user
	has_many :orders_items
	has_many :inventory, through: :orders_items
end
