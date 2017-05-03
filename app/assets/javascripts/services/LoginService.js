(function () {
    angular
        .module('pdApp')
        .service('LoginService', LoginService);

    LoginService.$inject = ['Requisicoes', '$Rotas'];

    function LoginService(Requisicoes, $Rotas) {

        this.enviarLogin = enviarLogin;

        function enviarLogin(login, ciphertext) {

            url = $Rotas.login;
            tipo = "usuario";

            dados = {
                matricula: login,
                senha: ciphertext
            }
            return Requisicoes.post(url, dados, tipo);
        }


    };
})();