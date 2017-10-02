class UsuarioEvento < ApplicationRecord
  belongs_to :evento, optional: true
  belongs_to :usuario, optional: true

#relatorio de ponto pelo id usuario,evento ou data
#retorna informações do ponto formatada
  def self.search(usuario,evento,data)
    
    if data.present?
      pontos = Evento.joins(:usuario_eventos).where("usuario_id = ? and data = ?", usuario,data).select("eventos.nome, usuario_eventos.data, usuario_eventos.hora_inicio, usuario_eventos.hora_fim").order("data DESC")
    else
      pontos = Evento.joins(:usuario_eventos).where("usuario_id = ? and evento_id= ?", usuario, evento).select("eventos.nome, usuario_eventos.data, usuario_eventos.hora_inicio, usuario_eventos.hora_fim").order("data DESC")
    end

    if pontos.present?
      arr = Array.new      
      pontos.each do |ponto|
        ponto_usuario = Hash.new
        ponto_usuario["nome"] = ponto.nome
        ponto_usuario["data"] = ponto.data.strftime("%d/%m/%Y")
        ponto_usuario["hora_inicio"] = ponto.hora_inicio.to_s(:time)
        if ponto["hora_fim"].blank? 
            ponto_usuario["hora_fim"] = " "
        else
          ponto_usuario["hora_fim"] = ponto.hora_fim.to_s(:time)
        end
        arr.push(ponto_usuario)
      end
      return arr
    end

    return pontos
  end
  
end
