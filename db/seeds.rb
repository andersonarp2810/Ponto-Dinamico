# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
usuario_eventos = UsuarioEvento.all
usuario_eventos.each do |usuario_evento|
    usuario_evento.destroy
end
usuarios = Usuario.all
usuarios.each do |usuario|
    usuario.destroy
end
eventos = Evento.all
eventos.each do |evento|
    evento.destroy
end
Usuario.create(nome: 'Admin',email: "admin@admin.com",matricula:"12345", nivel: 1, mac:"--", password: "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5")

