class CreateFollowings < ActiveRecord::Migration[7.0]
  def change
    create_table :followings do |t|
      t.integer :user_id, null:false
      t.integer :friend_id, null:false
      t.timestamps
    end
  end
end
