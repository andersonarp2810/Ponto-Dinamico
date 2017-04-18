class AddMacLocalizacaoToUsuarios < ActiveRecord::Migration[5.0]
  def change
  	add_column :usuarios, :mac, :string
  end
end
