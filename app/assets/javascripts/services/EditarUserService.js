(function () {
	angular
		.module('pdApp')
		.service('EditarUserService', EditarUserService);

	EditarUserService.$inject = ["Requisicoes", "$Rotas"];

	function EditarUserService(Requisicoes, $Rotas) {
		
		this.editarUser = editarUser;

		function editarMac(mac) {
			
			url = $Rotas.editarUser;
			tipo = "usuario";

			dados = {
				mac: mac
			}
		}

		function editarSenha(senha){
			url = $Rotas.editarUser;
			tipo = "usuario";

			dados = {
				senha: senha
			}
		}
	}
})();