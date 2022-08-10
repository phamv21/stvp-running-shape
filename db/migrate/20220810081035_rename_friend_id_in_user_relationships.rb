class RenameFriendIdInUserRelationships < ActiveRecord::Migration[7.0]
  def change
    rename_column :user_relationships, :friend_id, :other_user_id
  end
end
