(function () {
    angular
        .module('pdApp')
        .controller('ListaEventoController', ListaEventoController);

    ListaEventoController.$inject = ['LoginService', 'EventoService', 'sessao', '$Respostas', '$window'];

    function ListaEventoController(LoginService, EventoService, sessao, $Respostas, $window) {
        var vm = this;
        vm.busca = '';
        vm.buscar = buscar;
        vm.botao = false;
        vm.data;
        vm.eventos = [];
        vm.filtro;
        vm.mensagem;
        vm.radio = "nome";
        vm.relatorio = relatorio;
        vm.sessao = sessao;
        vm.users = null;

        vm.filtro = {
            nome: '',
            data_inicio: ''
        }

        function buscar() {
            if (vm.radio == 'nome') {
                vm.filtro.nome = vm.busca;
                vm.filtro.data_inicio = '';
            } else if (vm.radio == 'data') {
                vm.filtro.nome = '';
                vm.filtro.data_inicio = vm.busca;
            }
        }


        function relatorio(evento) {
            EventoService.relatorioEventos(evento.id)
                .then(function (data) {
                    console.log(data);
                    switch (data.erro) {
                        case '000':
                            console.log(data.body);
                            vm.users = data.body;
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
                });
        }

        var listarEventos = function () {
            EventoService.listaEventos()
                .then(function (data) {
                    console.log(data);
                    vm.mensagem = '';
                    switch (data.erro) {
                        case '000':
                            console.log(data.body);
                            vm.mensagem = "Lista Gerado";
                            vm.eventos = data.body;
                            break;
                        default:
                            console.log('Erro: ' + $Respostas[data.erro]);
                            break;
                    }
                });
        }

        var init = function () {
            if (vm.sessao.nome == '') {
                console.log("faça login");
                $window.location.href = "#!/login/";
            } else {
                LoginService.checar();
                listarEventos();
            }
        }

        init();
    }
})();