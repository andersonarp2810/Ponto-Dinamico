(function () {
    angular
        .module('pdApp')
        .service('LoginService', LoginService);

    LoginService.$inject = ['$Rotas'];

    function LoginService($Rotas) {
        this.enviarLogin = enviarLogin;
        url = $Rotas.login;
        function enviarLogin(login, ciphertext) {
            dados = {
                login: login,
                ciphertext: ciphertext
            }
            return post(url, dados);
        }


    };
})();