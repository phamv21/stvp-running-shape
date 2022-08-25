class ChangeDataTypeOfStartingTime < ActiveRecord::Migration[7.0]
  def change
    remove_column :activities, :starting_time
    add_column :activities, :starting_time, :date
  end
end
