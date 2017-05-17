class MudarSenhaToPasswordFromUsuario < ActiveRecord::Migration[5.0]
  def change
    rename_column :usuarios, :senha, :password
  end
end
