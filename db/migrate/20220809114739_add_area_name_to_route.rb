class AddAreaNameToRoute < ActiveRecord::Migration[7.0]
  def change
    add_column :routes, :area_name, :string
  end
end
