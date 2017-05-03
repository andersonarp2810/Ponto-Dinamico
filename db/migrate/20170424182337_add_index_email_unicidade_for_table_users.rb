class AddIndexEmailUnicidadeForTableUsers < ActiveRecord::Migration[5.0]
  def change
    add_index :usuarios , :mac , :unique => true
    add_index :usuarios , :matricula, :unique => true
    add_index :usuarios , :email, :unique => true
  end
end
