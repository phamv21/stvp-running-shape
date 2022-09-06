class AddUniqueOfActAndUserPairInLikes < ActiveRecord::Migration[7.0]
  def change
    add_index :likes, [:user_id,:activity_id], unique: true, name: 'unique_like'
  end
end
