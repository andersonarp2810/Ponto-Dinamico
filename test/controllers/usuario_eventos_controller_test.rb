require 'test_helper'

class UsuarioEventosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @usuario_evento = usuario_eventos(:one)
  end

  test "should get index" do
    get usuario_eventos_url
    assert_response :success
  end

  test "should get new" do
    get new_usuario_evento_url
    assert_response :success
  end

  test "should create usuario_evento" do
    assert_difference('UsuarioEvento.count') do
      post usuario_eventos_url, params: { usuario_evento: { data: @usuario_evento.data, evento_id: @usuario_evento.evento_id, hora_fim: @usuario_evento.hora_fim, hora_inicio: @usuario_evento.hora_inicio, mensagem: @usuario_evento.mensagem, usuario_id: @usuario_evento.usuario_id } }
    end

    assert_redirected_to usuario_evento_url(UsuarioEvento.last)
  end

  test "should show usuario_evento" do
    get usuario_evento_url(@usuario_evento)
    assert_response :success
  end

  test "should get edit" do
    get edit_usuario_evento_url(@usuario_evento)
    assert_response :success
  end

  test "should update usuario_evento" do
    patch usuario_evento_url(@usuario_evento), params: { usuario_evento: { data: @usuario_evento.data, evento_id: @usuario_evento.evento_id, hora_fim: @usuario_evento.hora_fim, hora_inicio: @usuario_evento.hora_inicio, mensagem: @usuario_evento.mensagem, usuario_id: @usuario_evento.usuario_id } }
    assert_redirected_to usuario_evento_url(@usuario_evento)
  end

  test "should destroy usuario_evento" do
    assert_difference('UsuarioEvento.count', -1) do
      delete usuario_evento_url(@usuario_evento)
    end

    assert_redirected_to usuario_eventos_url
  end
end
