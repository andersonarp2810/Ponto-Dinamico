class CreateEventos < ActiveRecord::Migration[5.0]
  def change
    create_table :eventos do |t|
      t.string :nome
      t.string :tipo
      t.string :pessoa_evento
      t.date :data_inicio
      t.date :data_fim
      t.time :hora_inicio
      t.time :hora_fim
      t.text :local
      t.text :descricao
      t.string :qrcode

      t.timestamps
    end
  end
end
