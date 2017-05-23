(function () {
    angular
        .module('pdApp')
        .controller('RelatorioEventoController', RelatorioEventoController);

    RelatorioEventoController.$inject = ['RelatorioEventoService', 'sessao', '$Respostas', '$window'];

    function RelatorioEventoController(RelatorioEventosService, sessao, $Respostas, $window) {
        var REvm = this;
        REvm.busca;
        REvm.buscar = buscar;
        REvm.radio = "nome";

        function buscar(){
            console.log("oi");
        }

        var init = function () {

        }

        init();
    }
})();