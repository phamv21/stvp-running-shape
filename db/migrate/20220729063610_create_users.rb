class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, index: true, unique:true, null:false
      t.string :email, index: true, null: false
      t.string :password_digest, null:false
      t.string :session_token
      t.string :gender
      t.date :birthday, null:false
      t.timestamps
    end
  end
end
