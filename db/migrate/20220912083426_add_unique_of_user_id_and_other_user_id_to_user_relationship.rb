class AddUniqueOfUserIdAndOtherUserIdToUserRelationship < ActiveRecord::Migration[7.0]
  def change
    add_index :user_relationships, [:user_id,:other_user_id], unique: true
  end
end
