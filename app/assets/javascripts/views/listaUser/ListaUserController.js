(function () {
    angular
        .module('pdApp')
        .controller('ListaUserController', ListaUserController);

    ListaUserController.$inject = ['UserService', 'sessao', '$window'];

    function ListaUserController(UserService, sessao, $window) {
        var vm = this;
        vm.busca = '';
        vm.buscar = buscar;
        vm.filtro = {
            nome: '',
            matricula: ''
        }
        vm.radio = 'nome';
        vm.sessao = sessao;

        function buscar() {
            if (vm.radio == 'nome') {
                vm.filtro.nome = vm.busca;
                vm.filtro.matricula = '';
            } else if (vm.radio == 'matricula') {
                vm.filtro.nome = '';
                vm.filtro.matricula = vm.busca;
            }
        }

        var listar = function () {

        }

        var init = function () {
            if (vm.sessao.nome == '') {
                console.log("faça login");
                $window.location.href = "#!/login/";
            } else {
                listar();
            }
        }

        init();
    }
})();