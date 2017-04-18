# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170322182529) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "eventos", force: :cascade do |t|
    t.string   "nome"
    t.string   "tipo"
    t.string   "pessoa_evento"
    t.date     "data_inicio"
    t.date     "data_fim"
    t.time     "hora_inicio"
    t.time     "hora_fim"
    t.text     "local"
    t.text     "descricao"
    t.string   "qrcode"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "usuario_id"
    t.float    "localizacao_long"
    t.float    "localizacao_lati"
    t.index ["usuario_id"], name: "index_eventos_on_usuario_id", using: :btree
  end

  create_table "usuarios", force: :cascade do |t|
    t.string   "nome"
    t.string   "senha"
    t.string   "email"
    t.string   "matricula"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "nivel",      default: 0
    t.string   "mac"
    t.integer  "status",     default: 0
  end

  add_foreign_key "eventos", "usuarios"
end
