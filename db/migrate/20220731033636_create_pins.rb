class CreatePins < ActiveRecord::Migration[7.0]
  def change
    create_table :pins do |t|
      t.string :description
      t.float :lat, null:false
      t.float :lng, null:false
      t.integer :route_id, null:false, index:true
      t.timestamps
    end
  end
end
