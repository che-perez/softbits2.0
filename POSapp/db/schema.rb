# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171219201229) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "inventories", force: :cascade do |t|
    t.string "item_name"
    t.string "item_type"
    t.decimal "item_cost"
    t.integer "item_quantity"
    t.bigint "kiosk_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["kiosk_id"], name: "index_inventories_on_kiosk_id"
  end

  create_table "kiosks", force: :cascade do |t|
    t.string "kiosk_name"
    t.string "location"
    t.text "address"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_kiosks_on_user_id"
  end

  create_table "orders", force: :cascade do |t|
    t.float "total"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "orders_items", force: :cascade do |t|
    t.bigint "order_id"
    t.bigint "inventory_id"
    t.integer "quantity"
    t.float "item_price"
    t.float "total"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["inventory_id"], name: "index_orders_items_on_inventory_id"
    t.index ["order_id"], name: "index_orders_items_on_order_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "fname"
    t.string "lname"
    t.string "username"
    t.string "password_digest"
    t.string "auth_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_users_on_username"
  end

end
