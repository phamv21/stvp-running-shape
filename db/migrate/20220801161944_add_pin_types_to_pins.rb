class AddPinTypesToPins < ActiveRecord::Migration[7.0]
  def change
    #so the pin sould be a head tail or ways -
    add_column :pins, :pin_type, :string, null:false
  end
end
