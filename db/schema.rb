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

ActiveRecord::Schema.define(version: 20170424182337) do

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
    t.float    "localizacao_long"
    t.float    "localizacao_lati"
  end

  create_table "usuario_eventos", force: :cascade do |t|
    t.date     "data"
    t.string   "mensagem"
    t.time     "hora_inicio"
    t.time     "hora_fim"
    t.integer  "evento_id"
    t.integer  "usuario_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["evento_id"], name: "index_usuario_eventos_on_evento_id", using: :btree
    t.index ["usuario_id"], name: "index_usuario_eventos_on_usuario_id", using: :btree
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
    t.index ["email"], name: "index_usuarios_on_email", unique: true, using: :btree
    t.index ["mac"], name: "index_usuarios_on_mac", unique: true, using: :btree
    t.index ["matricula"], name: "index_usuarios_on_matricula", unique: true, using: :btree
  end

  add_foreign_key "usuario_eventos", "eventos"
  add_foreign_key "usuario_eventos", "usuarios"
end
