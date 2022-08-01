class CreateRoutes < ActiveRecord::Migration[7.0]
  def change
    create_table :routes do |t|
      t.string :name, null:false
      t.string :description
      t.string :privacy, default: 'Public'
      t.string :activity, default: 'Run'
      t.integer :user_id, null:false, index:true
      t.timestamps
    end
  end
end
