(function () {
    angular
        .module('pdApp')
        .controller('ListaEventoController', ListaEventoController);

    ListaEventoController.$inject = ['LoginService', 'EventoService', 'sessao', '$Respostas', '$window'];

    function ListaEventoController(LoginService, EventoService, sessao, $Respostas, $window) {
        var vm = this;
        vm.busca = '';
        vm.buscar = buscar;
        vm.data;
        vm.formatar = formatar;
        vm.eventos = [];
        vm.mensagem;
        vm.radio = "nome";
        vm.relatorio = relatorio;
        vm.sessao = sessao;
        vm.users = null;

        vm.filtro = {
            nome: vm.busca,
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


        function formatar(para) {
            hf = para.hora_fim.split(":");
            para.hora_fim = new Date(1970, 0, 1, parseInt(hf[0], 10), parseInt(hf[1], 10));
            hi = para.hora_inicio.split(":");
            para.hora_inicio = new Date(1970, 0, 1, parseInt(hi[0], 10), parseInt(hi[1], 10));
            df = para.data_fim.split("/");
            para.data_fim = new Date(parseInt(df[2]), + parseInt(df[1], 10) - 1, parseInt(df[0], 10));
            di = para.data_inicio.split("/");
            para.data_inicio = new Date(parseInt(di[2]), parseInt(di[1], 10) - 1, parseInt(di[0], 10));

            return para;
        }


        function relatorio(eventoid) {
            EventoService.relatorioEventos(eventoid)
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
                            console.log('Lista');
                            console.log(data.body);
                            vm.mensagem = "Lista Gerado";
                            //evs = JSON.parse(JSON.stringify(data.body));
                            evs = data.body;
                            for (i = 0; i < evs.length; i++) {
                                evs[i] = formatar(evs[i]);
                            }
                            vm.eventos = evs;
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
                LoginService.checar()
                    .then(function (data) {
                        listarEventos();
                    });
            }
        }

        init();
    }
})();