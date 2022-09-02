class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false, index: true
      t.integer :activity_id, null: false, index:true
      t.string :content, null: false
      t.timestamps
    end
  end
end
