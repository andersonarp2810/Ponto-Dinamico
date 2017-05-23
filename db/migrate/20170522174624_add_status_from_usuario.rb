class AddStatusFromUsuario < ActiveRecord::Migration[5.0]
  def change
    add_column :usuarios, :status, :integer, :default => 0
  end
end
