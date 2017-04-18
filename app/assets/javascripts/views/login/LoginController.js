(function () {
    angular
        .module('pdApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService'];

    function LoginController(LoginService) {
        loginVM = this;
        loginVM.login = "login";
        loginVM.senha = "senha";
        loginVM.ciphertext;
        loginVM.logar = logar;

        function logar() {
            loginVM.ciphertext = SHA2_256(loginVM.senha);
            var resposta = enviarLogin(loginVM.login, loginVM.ciphertext);
        };
    };
})();