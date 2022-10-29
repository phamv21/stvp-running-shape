class CreateRakeTests < ActiveRecord::Migration[7.0]
  def change
    create_table :rake_tests do |t|
      t.string :name, unique: true
      t.timestamps
    end
  end
end
