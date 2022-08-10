class AddIndexToForeignKeyUserrelationships < ActiveRecord::Migration[7.0]
  def change
    add_index :user_relationships, :user_id
    add_index :user_relationships, :other_user_id
  end
end
