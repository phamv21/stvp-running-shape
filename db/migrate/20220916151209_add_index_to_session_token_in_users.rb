class AddIndexToSessionTokenInUsers < ActiveRecord::Migration[7.0]
  def change
    add_index_options :users, :session_token, unique: true
    add_index_options :users, :email, unique: true
  end
end
