(function () {
    angular
        .module('pdApp')
        .controller('EditEventoController', EditEventoController);

    EditEventoController.$inject = ['$scope', 'EventoService', 'GeoService', 'LoginService', 'sessao', '$Respostas', '$stateParams', '$window'];

    function EditEventoController($scope, EventoService, GeoService, LoginService, sessao, $Respostas, $stateParams, $window) {
        var vm = this;
        vm.botao = false;
        x = $stateParams.evento;
        x.data_fim = new Date(x.data_fim);
        x.data_inicio = new Date(x.data_inicio);
        x.hora_fim = new Date(x.hora_fim);
        x.hora_inicio = new Date(x.hora_inicio);
        vm.editEvento = editEvento;
        vm.evento = x;
        vm.mensagem;
        vm.sessao = sessao;

        $scope.$watch('vm.evento.hora_fim', function (current, original) {
            console.info('vm.evento.hora_fim era %s', original);
            console.info('vm.evento.hora_fim é %s', current);
        });

        function editEvento() {
            if (vm.form.$invalid) {
                alert("Preencha os campos corretamente.");
            }
            else {
                vm.botao = true;
                EventoService.editEvento(vm.evento)
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
                                vm.mensagem = 'Erro: ' + $Respostas[data.erro];
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
                    .then(
                    function (data) {
                        console.log(data);
                        //vm.latitude = data.latitude;
                        //vm.longitude = data.longitude;
                    },
                    function (erro) {
                        console.log(erro);
                    }
                    );
                delete vm.evento.classe;
                console.log(vm.evento);
            }
        }

        init();
    }
})();