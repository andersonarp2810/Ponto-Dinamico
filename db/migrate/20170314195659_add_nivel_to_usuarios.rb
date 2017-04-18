class AddNivelToUsuarios < ActiveRecord::Migration[5.0]
  def change
  	add_column :usuarios, :nivel, :integer, :default => 0
  end
end
