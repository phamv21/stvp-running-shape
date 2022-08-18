class CreateActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.integer :user_id, index: true, null: false
      t.integer :route_id, index: true
      t.string :title, null: false
      t.time :starting_time, null: false
      t.string :note
      t.integer :duration, null:false #duration in seconds
      t.timestamps
    end
  end
end
