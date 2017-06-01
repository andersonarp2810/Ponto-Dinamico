class UsuarioEvento < ApplicationRecord
  belongs_to :evento, optional: true
  belongs_to :usuario, optional: true

#relatorio de ponto
  def self.search(id)
    usuarios = where(usuario_id: id).take(5)
    if usuarios.present?
      arr = Array.new      
      usuarios.each do |u|
        user = Hash.new
        ev = Evento.find_by(id: u.evento_id)
        user["nome"] = ev.nome
        user["data"] = u.data
        user["hora_inicio"] = u.hora_inicio.to_s(:time)
        if user["hora_fim"].blank? 
            user["hora_fim"] = " "
        else
          user["hora_fim"] = u.hora_fim.to_s(:time)
        end
        arr.push(user)
      end
      return arr.reverse
    end
    return usuarios
  end
  
end
