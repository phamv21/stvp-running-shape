class RenameFolllowingsToUserRelationships < ActiveRecord::Migration[7.0]
  def change
    rename_table :followings, :user_relationships
  end
end
