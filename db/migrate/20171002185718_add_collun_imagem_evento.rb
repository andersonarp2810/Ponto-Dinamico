class AddCollunImagemEvento < ActiveRecord::Migration[5.0]
  def change
    add_column :eventos, :imagem, :string
  end
end
