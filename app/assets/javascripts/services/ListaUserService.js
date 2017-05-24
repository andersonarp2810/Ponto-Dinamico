(function () {
    angular
        .module('pdApp')
        .service('ListaUserService', ListaUserService);

    ListaUserService.$inject = ["Requisicoes", "$Rotas"];

    function ListaUserService(Requisicoes, $Rotas) {

    }

})();