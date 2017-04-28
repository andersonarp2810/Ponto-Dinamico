class CreateUsuarioEventos < ActiveRecord::Migration[5.0]
  def change
    create_table :usuario_eventos do |t|
      t.date :data
      t.string :mensagem
      t.time :hora_inicio
      t.time :hora_fim
      t.references :evento, foreign_key: true
      t.references :usuario, foreign_key: true

      t.timestamps
    end
  end
end
