(function () {
    angular
        .module('pdApp')
        .controller('RelatorioEventoController', RelatorioEventoController);

    RelatorioEventoController.$inject = ['RelatorioEventoService', 'sessao', '$Respostas', '$window'];

    function RelatorioEventoController(RelatorioEventosService, sessao, $Respostas, $window) {
        var REvm = this;

        var init = function () {

        }

        init();
    }
})();