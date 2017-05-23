(function () {
    angular
        .module('pdApp')
        .controller('ListaEventoController', ListaEventoController);

    ListaEventoController.$inject = ['ListaEventoService', 'sessao', '$Respostas', '$window'];

    function ListaEventoController(ListaEventosService, sessao, $Respostas, $window) {
        var vm = this;
        vm.busca;
        vm.botao = false;
        vm.data = data;
        vm.nomeEvento = nomeEvento;
        vm.buscar = buscar;
        vm.radio = "nome";
        vm.sessao = sessao;
        vm.mensagem;

        function RelatEvento() {
            vm.botao = true;
            ListaEventosService.gerarRelatN(vm.nomeEvento)
                .then(function (data) {
                    console.log(data);
                    vm.mensagem = '';
                    switch (data.erro) {
                        case '000':
                            console.log(data.body);
                            vm.mensagem = "Lista Gerado";
                            $window.location.href = "#";
                            break;
                        case '301':
                            vm.mensagem = 'Relatório Indisponivel';
                        case '302':
                            vm.mensagem = 'Relatório Inexistente';
                        default:
                            vm.mensagem = 'Erro: ' + $Repostas[data.erro];
                    }
                    vm.botal = false;
                });
        }

        function limpar() {
            vm.botao = false;
            vm.matricula = '';
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