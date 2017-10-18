(function () {
    angular
        .module('pdApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', 'sessao', '$cookies', '$Respostas', '$Estados', '$state'];

    function LoginController(LoginService, sessao, $cookies, $Respostas, $Estados, $state) {

        vm = this;

        vm.login;
        vm.senha;
        vm.ciphertext;
        vm.logar = logar;
        vm.mensagem;
        vm.sessao = sessao;

        function logar() {
            if (vm.form.$invalid) {
                alert("Preencha os campos corretamente.");
            }
            else {
                vm.ciphertext = SHA2_256(vm.senha);
                LoginService.enviarLogin(vm.login, vm.ciphertext)
                    .then(function (data) {
                        console.log(data);
                        vm.mensagem = '';
                        switch (data.erro) { // definir erro pra cada campo

                            case "000":
                                console.log("Login feito");
                                console.log(data.body);
                                //cookiar
                                vm.sessao.id = data.body.usuario_id;
                                $cookies.put('sessao_pd_id', vm.sessao.id);
                                vm.sessao.nome = data.body.nome;
                                $cookies.put('sessao_pd_nome', vm.sessao.nome);
                                $state.go($Estados.home);
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

        var init = function () {
            vm.sessao.id = $cookies.get('sessao_pd_id');
            if ("undefined" != typeof vm.sessao.id) {
                $state.go($Estados.home);
            }
        }

        init();

    };
})();