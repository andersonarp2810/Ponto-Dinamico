(function () {
    angular
        .module('pdApp')
        .controller('CadastroEventoController', CadastroEventoController);

    CadastroEventoController.$inject = ['$scope', '$log', 'EventoService'];

    function CadastroEventoController($scope, $log, EventoService) {
        var vm = this; //view model

        vm.botao = false;
        vm.cadastrarEvento = cadastrarEvento;
        vm.dataInicio;
        vm.dataFim;
        vm.horaInicio;
        vm.horaFim;
        vm.descricao;
        vm.local = "Local";
        vm.latitude;
        vm.longitude;
        vm.nome;
        vm.QR;
        vm.tipo;
        vm.testget = testget;

        function cadastrarEvento() {
            EventoService.enviarEvento(vm.nome, vm.tipo, vm.dataInicio, vm.dataFim,
                vm.horaInicio, vm.horaFim, vm.descricao, vm.local, vm.QR,
                vm.latitude, vm.longitude)
                
                .then(function (data) {
                    console.log(data);
                    alert(data.body + " " + data.evento_nome);
                });
        }

        //isso é apenas um teste de observador - remover em versão final
        $scope.$watch('vm.local', function (current, original) {
            $log.info('vm.local was %s', original);
            $log.info('vm.local is now %s', current);
        });

    }
})();