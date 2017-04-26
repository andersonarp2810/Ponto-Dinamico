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
            EventoService.enviarEvento(vm.nome, vm.tipo, vm.dataInicio, vm.dataFim,
                vm.horaInicio, vm.horaFim, vm.descricao, vm.local, vm.QR,
                vm.latitude, vm.longitude)

                .then(function (data) {
                    console.log(data);

                    switch (data.body.id) {

                        case 000:
                            console.log(data.body + " " + data.evento_nome);
                            vm.mensagem = "Evento criado";
                            rl();
                            break;
                        default:
                            vm.mensagem = 'Erro: ' + $Repostas[data.body.id];
                            rl();
                            break;

                    }



                });
        }

        function rl() {
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