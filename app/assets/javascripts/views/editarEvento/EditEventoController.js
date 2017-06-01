(function () {
    angular
        .module('pdApp')
        .controller('EditEventoController', EditEventoController);

    EditEventoController.$inject = ['EventoService', 'LoginService', 'sessao', '$Respostas', '$stateParams', '$window'];

    function EditEventoController(EventoService, LoginService, sessao, $Respostas, $stateParams, $window) {
        var vm = this;
        vm.botao = false;
        vm.evento = $stateParams.evento;
        vm.mensagem;
        vm.sessao = sessao;

        function editEvento() {
            if (vm.form.$invalid) {
                alerta("Preencha os campos corretamente.");
            }
            else {
                vm.botao = true;
                EventoService.editEvento(evento)
                    .then(function (data) {
                        console.log(data);
                        vm.mensagem = '';
                        switch (data.erro) { // definir erro pra cada campo
                            case "000":
                                console.log(data.body);
                                vm.mensagem = "Evento criado";
                                //limpar();
                                $window.location.href = "#!/listaEvento/";
                                break;
                            default:
                                vm.mensagem = 'Erro: ' + $Repostas[data.erro];
                                console.log(data.status);
                                switch (data.erro) {
                                    case "102":
                                        vm.nome = '';
                                    case "501":
                                        console.log("sessão expirada");
                                        LoginService.apagar();
                                        $window.location.href = "#!/login";
                                    //deslogar
                                }
                                break;
                        } // end switch
                        vm.botao = false;
                    }); //end then
            }
        }

        function limpar() {
            vm.botao = false;
            vm.dataInicio = '';
            vm.dataFim = '';
            vm.horaInicio = '';
            vm.horaFim = '';
            vm.descricao = '';
            vm.local = '';
            vm.nome = '';
            vm.tipo = '';
        }

        var init = function () {
            if (vm.sessao.nome == '') {
                console.log("faça login");
                $window.location.href = "#!/login/";
            } else {
                LoginService.checar();

                GeoService.getPosicao()
                    .then(function (data) {
                        console.log(data);
                        //vm.latitude = data.latitude;
                        //vm.longitude = data.longitude;
                    });
            }
        }

        init();
    }
})();