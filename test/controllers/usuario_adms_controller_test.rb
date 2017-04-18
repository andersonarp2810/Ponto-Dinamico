require 'test_helper'

class UsuarioAdmsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @usuario_adm = usuario_adms(:one)
  end

  test "should get index" do
    get usuario_adms_url
    assert_response :success
  end

  test "should get new" do
    get new_usuario_adm_url
    assert_response :success
  end

  test "should create usuario_adm" do
    assert_difference('UsuarioAdm.count') do
      post usuario_adms_url, params: { usuario_adm: {  } }
    end

    assert_redirected_to usuario_adm_url(UsuarioAdm.last)
  end

  test "should show usuario_adm" do
    get usuario_adm_url(@usuario_adm)
    assert_response :success
  end

  test "should get edit" do
    get edit_usuario_adm_url(@usuario_adm)
    assert_response :success
  end

  test "should update usuario_adm" do
    patch usuario_adm_url(@usuario_adm), params: { usuario_adm: {  } }
    assert_redirected_to usuario_adm_url(@usuario_adm)
  end

  test "should destroy usuario_adm" do
    assert_difference('UsuarioAdm.count', -1) do
      delete usuario_adm_url(@usuario_adm)
    end

    assert_redirected_to usuario_adms_url
  end
end
