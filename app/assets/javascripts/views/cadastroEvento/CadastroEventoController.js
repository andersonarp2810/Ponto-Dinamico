(function () {
    angular
        .module('pdApp')
        .controller('CadastroEventoController', CadastroEventoController);

    CadastroEventoController.$inject = ['$scope', '$log', 'EventoService', 'token', '$Respostas', '$window'];

    function CadastroEventoController($scope, $log, EventoService, token, $Repostas, $window) {
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
        vm.token = token;

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
                            case "101":
                                vm.nome = '';
                            case "333":
                            default:
                                vm.mensagem = 'Erro: ' + $Repostas[data.erro]; // talvez não venha se não vier resposta
                                console.log(data.status);
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
            if (vm.token.nome == '') {
                console.log("faça login");
                $window.location.href = "#!/login/";
            }
        }

        init();
    }
})();