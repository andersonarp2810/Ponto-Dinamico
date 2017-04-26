(function () {
    angular
        .module('pdApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', '$Respostas', '$window'];

    function LoginController(LoginService, $Respostas, $window) {

        loginVM = this;

        loginVM.login = "login";
        loginVM.senha = "senha";
        loginVM.ciphertext;
        loginVM.logar = logar;
        loginVM.mensagem;

        function logar() {
            loginVM.ciphertext = SHA2_256(loginVM.senha);
            LoginService.enviarLogin(loginVM.login, loginVM.ciphertext)
                .then(function (data) {

                    switch (data.body.id) {

                        case 000:
                            console.log("Login feito");
                            console.log(data.body);
                            $window.location.assign("#!/home")
                            break;
                        default:
                            loginVM.mensagem = "Erro: " + $Respostas[data.body.id];
                            rl();
                            break;
                    }

                });
        };

        function rl() {
            loginVM.login = '';
            loginVM.senha = '';
            loginVM.ciphertext = '';
        }
    };
})();