class FixGenderInUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :gender
    add_column :users, :gender, :string, default: 'None'
  end
end
