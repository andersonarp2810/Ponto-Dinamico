class UsuarioEvento < ApplicationRecord
  belongs_to :evento, optional: true
  belongs_to :usuario, optional: true
end
