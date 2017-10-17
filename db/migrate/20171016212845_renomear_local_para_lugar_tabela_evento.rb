class RenomearLocalParaLugarTabelaEvento < ActiveRecord::Migration[5.0]
  def change
    rename_column :eventos, :local, :lugar
  end
end
