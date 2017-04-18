class CreateUsuarios < ActiveRecord::Migration[5.0]
  def change
    create_table :usuarios do |t|
      t.string :nome
      t.string :senha
      t.string :email
      t.string :matricula

      t.timestamps
    end
  end
end
