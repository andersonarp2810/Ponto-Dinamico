(function () {
    angular
        .module('pdApp')
        .service('ListaEventoService', ListaEventoService);

    ListaEventoService.$inject = ["Requisicoes", "$Rotas"];

    function ListaEventoService(Requisicoes, $Rotas) {
    	this.relatEvento = relatEvento; 

    	function relatEvento(nome) {
    		url = $Rotas.listaEventos;
    		tipo = "evento";

    		dados = {
    			keywords: keywords
    		}
    	}
		return Requisicoes.get(url);
    }
})();