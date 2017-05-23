(function () {
    angular
        .module('pdApp')
        .controller('ListaUserController', ListaUserController);

    ListaUserController.$inject = ['ListaUserService', 'sessao', '$window'];

    function ListaUserController() {
        var vm = this;
        vm.buscar = buscar;
        vm.radio = 'nome';
        vm.search = '';


        function buscar() {
        }

        var init = function () {

        }

        init();
    }
})();