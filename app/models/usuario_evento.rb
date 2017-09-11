class UsuarioEvento < ApplicationRecord
  belongs_to :evento, optional: true
  belongs_to :usuario, optional: true

#relatorio de ponto pelo id usuario,evento ou data
#retorna informações do ponto formatada
  def self.search(usuario,evento,data)

    #SELECT a.nome, b.data, b.hora_inicio, b.hora_fim  FROM eventos as a  FULL OUTER JOIN usuario_eventos as b                  on a.id = b.evento_id
     #               where usuario_id = 64 and evento_id = 28 order by b.data
     
    if data.present?
      usuario_eventos = order(data: :desc).where("usuario_id = ? and data = ?",usuario,data)
    else
      usuario_eventos = order(data: :desc).where("usuario_id = ? and evento_id = ?",usuario,evento).take(5)
    end

    if usuario_eventos.present?
      arr = Array.new      
      usuario_eventos.each do |u|
        user = Hash.new
        ev = Evento.find_by(id: u.evento_id)
        user["nome"] = ev.nome
        user["data"] = u.data.strftime("%d/%m/%Y")
        user["hora_inicio"] = u.hora_inicio.to_s(:time)
        if user["hora_fim"].blank? 
            user["hora_fim"] = " "
        else
          user["hora_fim"] = u.hora_fim.to_s(:time)
        end
        arr.push(user)
      end
      return arr
    end
    return usuario_eventos
  end
  
end
