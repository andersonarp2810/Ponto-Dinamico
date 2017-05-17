(function () {
    angular
        .module('pdApp')
        .controller('CadastroEventoController', CadastroEventoController);

    CadastroEventoController.$inject = ['$scope', '$log', 'EventoService', 'sessao', '$Respostas', '$window'];

    function CadastroEventoController($scope, $log, EventoService, sessao, $Repostas, $window) {
        var vm = this; //view model
        vm.botao = false;
        vm.cadastrarEvento = cadastrarEvento;
        vm.dataInicio;
        vm.dataFim;
        vm.horaInicio;
        vm.horaFim;
        vm.descricao;
        vm.local;
        vm.latitude;
        vm.longitude;
        vm.mensagem;
        vm.nome;
        vm.QR;
        vm.tipo;
        vm.sessao = sessao;

        function cadastrarEvento() {
            if (vm.form.$invalid) {
                alerta("Preencha os campos corretamente.");
            }
            else {
                vm.botao = true;
                EventoService.enviarEvento(vm.nome, vm.tipo, vm.dataInicio, vm.dataFim,
                    vm.horaInicio, vm.horaFim, vm.descricao, vm.local, vm.QR,
                    vm.latitude, vm.longitude)
                    .then(function (data) {
                        console.log(data);
                        vm.mensagem = '';
                        switch (data.erro) { // definir erro pra cada campo
                            case "000":
                                console.log(data.body);
                                vm.mensagem = "Evento criado";
                                //limpar();
                                $window.location.href = "#!/home/";// deve ser página da lista de eventos depois
                                break;
                            default:
                                vm.mensagem = 'Erro: ' + $Repostas[data.erro];
                                console.log(data.status);
                                switch (data.erro) {
                                    case "102":
                                        vm.nome = '';
                                    case "333":
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
            vm.latitude = '';
            vm.longitude = '';
            vm.nome = '';
            vm.QR = '';
            vm.tipo = '';
        }

        //isso é apenas um teste de observador - remover em versão final
        $scope.$watch('vm.horaFim', function (current, original) {
            $log.info('vm.horaFim was %s', original);
            $log.info('vm.horaFim is now %s', current);
        });

        var init = function () {
            if (vm.sessao.nome == '') {
                console.log("faça login");
                $window.location.href = "#!/login/";
            }
        }

        init();
    }
})();