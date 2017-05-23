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
        vm.sessao = sessao;


        function buscar() {
        }

        var init = function () {
            if (vm.sessao.nome == '') {
                console.log("faça login");
                $window.location.href = "#!/login/";
            }
        }

        init();
    }
})();