require 'test_helper'

class EventosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @evento = eventos(:one)
  end

  test "should get index" do
    get eventos_url
    assert_response :success
  end

  test "should get new" do
    get new_evento_url
    assert_response :success
  end

  test "should create evento" do
    assert_difference('Evento.count') do
      post eventos_url, params: { evento: { data_fim: @evento.data_fim, data_inicio: @evento.data_inicio, descricao: @evento.descricao, hora_fim: @evento.hora_fim, hora_inicio: @evento.hora_inicio, local: @evento.local, nome: @evento.nome, pessoa_evento: @evento.pessoa_evento, qrcode: @evento.qrcode, tipo: @evento.tipo } }
    end

    assert_redirected_to evento_url(Evento.last)
  end

  test "should show evento" do
    get evento_url(@evento)
    assert_response :success
  end

  test "should get edit" do
    get edit_evento_url(@evento)
    assert_response :success
  end

  test "should update evento" do
    patch evento_url(@evento), params: { evento: { data_fim: @evento.data_fim, data_inicio: @evento.data_inicio, descricao: @evento.descricao, hora_fim: @evento.hora_fim, hora_inicio: @evento.hora_inicio, local: @evento.local, nome: @evento.nome, pessoa_evento: @evento.pessoa_evento, qrcode: @evento.qrcode, tipo: @evento.tipo } }
    assert_redirected_to evento_url(@evento)
  end

  test "should destroy evento" do
    assert_difference('Evento.count', -1) do
      delete evento_url(@evento)
    end

    assert_redirected_to eventos_url
  end
end
