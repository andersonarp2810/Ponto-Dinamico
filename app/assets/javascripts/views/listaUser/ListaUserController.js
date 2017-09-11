(function () {
    angular
        .module('pdApp')
        .controller('ListaUserController', ListaUserController);

    ListaUserController.$inject = ['LoginService', 'UserService', 'sessao', '$Respostas', '$window'];

    function ListaUserController(LoginService, UserService, sessao, $Respostas, $window) {
        var vm = this;
        vm.busca = '';
        vm.buscar = buscar;
        vm.eventos = null;
        vm.usu_id = null;
        vm.listaPontos = listaPontos;
        vm.pontos = null;
        vm.radio = 'nome';
        vm.relatorio = relatorio;
        vm.sessao = sessao;
        vm.users = [];

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

        function listaPontos(eve_id) {
            vm.pontos = null;
            UserService.pontos(vm.usu_id, eve_id)
                .then(function (data) {
                    console.log(data);
                    switch (data.erro) {
                        case '000':
                            console.log(data.body);
                            vm.pontos = data.body;
                            break;
                        case '501':
                            console.log("sessão expirada");
                            LoginService.apagar();
                            $window.location.href = "#!/login";
                            break;
                        default:
                            vm.mensagem = 'Erro' + $Respostas[data.erro];
                            break;
                    }
                });
        }

        function relatorio(id) {
            vm.eventos = null;
            vm.usu_id = null;
            UserService.relatorio(id)
                .then(function (data) {
                    console.log(data);
                    switch (data.erro) {
                        case '000':
                            console.log(data.body);
                            vm.eventos = data.body;
                            vm.usu_id = id;
                            break;
                        case '501':
                            console.log("sessão expirada");
                            LoginService.apagar();
                            $window.location.href = "#!/login";
                            break;
                        default:
                            vm.mensagem = 'Erro' + $Respostas[data.erro];
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
                            vm.users = data.body;
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
                LoginService.checar()
                    .then(function (data) {
                        listar();
                    });
            }
        }

        init();
    }
})();