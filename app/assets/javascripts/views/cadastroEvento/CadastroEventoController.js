(function () {
    angular
        .module('pdApp')
        .controller('CadastroEventoController', CadastroEventoController);

    CadastroEventoController.$inject = ['$scope', '$log', 'EventoService', '$Respostas', '$window'];

    function CadastroEventoController($scope, $log, EventoService, $Repostas, $window) {
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
                        switch (data.id) { // definir erro pra cada campo
                            case 000:
                                console.log(data.body + " " + data.evento_nome);
                                vm.mensagem = "Evento criado";
                                //limpar();
                                $window.location.assign("#!/home");// deve ser página da lista de eventos depois
                                break;
                            default:
                                vm.mensagem = 'Erro: ' + $Repostas[data.id];
                                limpar();
                                break;
                        }
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

    }
})();