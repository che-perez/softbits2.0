class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
	    t.string :fname
	    t.string :lname
	    t.string :username, index: true
	    t.string :password_digest
	    t.string :auth_token
	    
	    t.timestamps
    end
  end
end
