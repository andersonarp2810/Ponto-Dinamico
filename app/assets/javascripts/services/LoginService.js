(function () {
    angular
        .module('pdApp')
        .service('LoginService', LoginService);

    LoginService.$inject = ['$Rotas'];

    function LoginService($Rotas) {

        this.enviarLogin = enviarLogin;

        function enviarLogin(login, ciphertext) {

            url = $Rotas.login;
            tipo = "login";

            dados = {
                login: login,
                ciphertext: ciphertext
            }
            return post(url, dados, tipo);
        }


    };
})();