(function () {
    angular
        .module('pdApp')
        .controller('RelatorioEventoController', RelatorioEventoController);

    RelatorioEventoController.$inject = ['RelatorioEventoService', 'sessao', '$Respostas', '$window'];

    function RelatorioEventoController(RelatorioEventosService, sessao, $Respostas, $window) {
        var vm = this;
        vm.busca;
        vm.botao = false;
        vm.data = data;
        vm.nomeEvento = nomeEvento;
        vm.buscar = buscar;
        vm.radio = "nome";
        vm.mensagem;

        function RelatEvento() {
            
                vm.botao = true;
                RelatorioEventosService.gerarRelatN(vm.nomeEvento)
                    .then(function(data){
                        console.log(data);
                        vm.mensagem = '';
                        switch (data.erro){
                            case '000':
                                console.log(data.body);
                                vm.mensagem = "Relatorio Gerado";
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
        }
        function limpar() {
            vm.botao = false;
            vm.matricula = '';
        }
    }
})();