(function () {
    angular
        .module('pdApp')
        .service('RelatorioEventoService', RelatorioEventoService);

    RelatorioEventoService.$inject = ["Requisicoes", "$Rotas"];

    function RelatorioEventoService(Requisicoes, $Rotas) {
    	this.relatEvento = relatEvento; 

    	function gerarRelatN(nome) {
    		url = $Rotas.relatEvento;
    		tipo = "evento";

    		dados = {
    			keywords: keywords
    		}
    	}

    }
})();