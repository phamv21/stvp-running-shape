class Add < ActiveRecord::Migration[7.0]
  def change
    add_column :user_relationships, :relationship_type, :string, default:'Pending'
  end
end
