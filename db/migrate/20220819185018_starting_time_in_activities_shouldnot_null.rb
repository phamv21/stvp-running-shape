class StartingTimeInActivitiesShouldnotNull < ActiveRecord::Migration[7.0]
  def change
    change_column_null :activities, :starting_time, false
  end
end
