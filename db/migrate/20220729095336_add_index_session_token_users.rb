class AddIndexSessionTokenUsers < ActiveRecord::Migration[7.0]
  def change
    add_index :users, :session_token
  end

end
