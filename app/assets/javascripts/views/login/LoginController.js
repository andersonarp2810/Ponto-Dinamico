(function () {
    angular
        .module('pdApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', '$Respostas', '$window'];

    function LoginController(LoginService, $Respostas, $window) {

        vm = this;

        vm.login;
        vm.senha;
        vm.ciphertext;
        vm.logar = logar;
        vm.mensagem;

        function logar() {
            if (vm.form.$invalid) {
                alert("Preencha os campos corretamente.");
            }
            else {
                vm.ciphertext = SHA2_256(vm.senha);
                console.log(vm.ciphertext);
                LoginService.enviarLogin(vm.login, vm.ciphertext)
                    .then(function (data) {
                        console.log(data);

                        switch (data.id) { // definir erro pra cada campo

                            case 000:
                                console.log("Login feito");
                                console.log(data.body);
                                $window.location.assign("#!/home");
                                break;
                            case 201:
                                vm.mensagem = "Usuário não cadastrado";
                                vm.login = '';
                                break;
                            case 202:
                                vm.mensagem = "Senha inválida";
                                vm.senha = '';
                                vm.ciphertext = '';
                                break;
                            default:
                                vm.mensagem = "Erro: " + $Respostas[data.id];
                                limpar();
                                break;
                        }

                    });//then
            }
        };

        function limpar() {
            vm.login = '';
            vm.senha = '';
            vm.ciphertext = '';
        }
    };
})();