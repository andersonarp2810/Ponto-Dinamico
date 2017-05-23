(function () {
    angular
        .module('pdApp')
        .service('ListaEventoService', ListaEventoService);

    ListaEventoService.$inject = ["Requisicoes", "$Rotas"];

    function ListaEventoService(Requisicoes, $Rotas) {
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