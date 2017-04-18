class Addlocalizacaotoeventos < ActiveRecord::Migration[5.0]
  def change
    add_column :eventos, :localizacao_long, :float
    add_column :eventos, :localizacao_lati, :float
  end
end
