class RemoverColunaStatusFromUsuario < ActiveRecord::Migration[5.0]
  def change
     remove_column :usuarios , :status
  end
end
