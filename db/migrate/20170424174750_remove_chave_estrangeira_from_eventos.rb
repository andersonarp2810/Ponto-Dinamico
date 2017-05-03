class RemoveChaveEstrangeiraFromEventos < ActiveRecord::Migration[5.0]
  def change
    remove_column :eventos , :usuario_id
  end
end
