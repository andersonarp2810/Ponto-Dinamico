(function () {
    angular
        .module('pdApp')
        .controller('ListaUserController', ListaUserController);

    ListaUserController.$inject = ['UserService', 'sessao', '$window'];

    function ListaUserController(UserService, sessao, $window) {
        var vm = this;
        vm.busca = '';
        vm.buscar = buscar;
        vm.filtro;
        vm.radio = 'nome';
        vm.relatorio = relatorio;
        vm.sessao = sessao;

        vm.filtro = {
            nome: '',
            matricula: ''
        }

        function buscar() {
            if (vm.radio == 'nome') {
                vm.filtro.nome = vm.busca;
                vm.filtro.matricula = '';
            } else if (vm.radio == 'matricula') {
                vm.filtro.nome = '';
                vm.filtro.matricula = vm.busca;
            }
        }

        function relatorio(usuario) {
            UserService.relatorio(usuario.id)
                .then(function (data) {
                    console.log(data);
                    switch (data.erro) {
                        case '000':
                            console.log(data.body);
                            break;
                        default:
                            break;
                    }
                });
        }

        var listar = function () {
            UserService.listar()
                .then(function (data) {
                    console.log(data);
                    switch (data.erro) {
                        case '000':
                            console.log(data.body);
                            break;
                        default:
                            break;
                    }
                });
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