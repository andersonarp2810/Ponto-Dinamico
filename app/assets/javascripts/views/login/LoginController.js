(function () {
    angular
        .module('pdApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', 'token', '$Respostas', '$window'];

    function LoginController(LoginService, token, $Respostas, $window) {

        vm = this;

        vm.login;
        vm.senha;
        vm.ciphertext;
        vm.logar = logar;
        vm.mensagem;
        vm.token = token;
        vm.teste = teste;

        function teste() {
            console.log(vm.token);
            vm.token.nome = 'Jairo';
            console.log(vm.token);
        }

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
                        vm.mensagem = '';
                        switch (data.erro) { // definir erro pra cada campo

                            case "000":
                                console.log("Login feito");
                                console.log(data.body);
                                navVM.user = data.user;
                                $window.location.href = "#!/home/";
                                break;
                            case "202":
                                vm.senha = '';
                                vm.mensagem = "Erro: " + $Respostas[data.erro];
                                break;
                            default:
                                vm.mensagem = "Erro: " + $Respostas[data.erro];
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