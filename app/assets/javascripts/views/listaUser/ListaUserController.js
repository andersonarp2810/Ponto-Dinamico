(function () {
    angular
        .module('pdApp')
        .controller('ListaUserController', ListaUserController);

    ListaUserController.$inject = ['LoginService', 'UserService', 'sessao', '$Respostas', '$window'];

    function ListaUserController(LoginService, UserService, sessao, $Respostas, $window) {
        var vm = this;
        vm.busca = '';
        vm.buscar = buscar;
        vm.deletar = deletar;
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

        function deletar(id) {
            if (confirm("Tem certeza que deseja deletar este usuário?")) {
                UserService.deletUser(id).then(
                    function (data) {
                        console.log(data);
                        switch (data.erro) {
                            case '000':
                                console.log(data.body);
                                console.log("usuário deletado");
                                vm.listaEventos();
                                break;
                            case '501':
                                console.log("sessão expirada");
                                LoginService.apagar();
                                $window.location.href = "#!/login";
                                break;
                            default:
                                vm.mensagem = 'Erro: ' + $Respostas[data.erro];
                                vm.users = null;
                                break;
                        }
                    }
                );
            }
        }

        function listaPontos(evento) {
            vm.eventos.forEach(function (ev) {
                ev.classe = 'active';
            });
            evento.classe = 'danger';
            vm.pontos = null;
            UserService.pontos(vm.usu_id, evento.id)
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

        function relatorio(user) {
            vm.users.forEach(function (item) {
                item.classe = 'active';
            });
            user.classe = 'danger';
            id = user.id;
            vm.eventos = null;
            vm.usu_id = null;
            UserService.relatorio(id)
                .then(function (data) {
                    console.log(data);
                    switch (data.erro) {
                        case '000':
                            console.log(data.body);
                            vm.eventos = data.body;
                            vm.eventos.forEach(function (ev) {
                                ev.classe = 'active';
                            });
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
                            vm.users.forEach(function (user) {
                                user.classe = 'active';
                            });
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