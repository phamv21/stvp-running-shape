class AddPrivacyToActivities < ActiveRecord::Migration[7.0]
  def change
    add_column :activities, :privacy, :string, default: 'Friend', null: false
  end
end
