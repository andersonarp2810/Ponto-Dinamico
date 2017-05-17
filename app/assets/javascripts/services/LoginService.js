(function () {
    angular
        .module('pdApp')
        .service('LoginService', LoginService);

    LoginService.$inject = ['Requisicoes', '$Rotas'];

    function LoginService(Requisicoes, $Rotas) {

        this.enviarLogin = enviarLogin;
        this.logout = logout;

        function enviarLogin(login, ciphertext) {

            url = $Rotas.login;
            tipo = "user_session";

            dados = {
                email: login,
                password: ciphertext
            }
            return Requisicoes.post(url, dados, tipo);
        }

        function logout(id) {
            url = $Rotas.logout;
            tipo = "user_session";

            dados = {
                id: id
            }
            return Requisicoes.del(url, dados, tipo);
        }

    };
})();