(function () {
	angular
		.module('pdApp')
		.service('UserRelatorioService', UserRelatorioService);

	UserRelatorioService.$inject = ["Requisicoes", "$Rotas"];

	function UserRelatorioService(Requisicoes, $Rotas) {
		this.userRelat = userRelat;

		function userRelat(nome, matricula){

			url = $Rotas.userRelat;
			tipo = "relatorioU";

			dados = {
				matricula: matricula;
			}
			return Requisicoes.post(url, tipo, userRelat);
		}
		
	}
})