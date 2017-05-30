(function () {
	angular
		.module('pdApp')
		.controller('EditUserController', EditUserController);

	EditUserController.$inject = ['UserService', 'sessao', '$Respostas', '$window'];

	function EditUserController(UserService, sessao, $Respostas, $window) {
		var vm = this;
		vm.confirmaSenha;
		vm.senha;
		vm.mensagem;
		vm.mac = "";

		function editarMAC() {
			if (vm.form.$invalid) {
				alert("Preencha os campos corretamente");
			}
			else {
				UserService.editarUser(vm.mac)
					.then(function (data) {
						vm.mensagem = '';
						switch (data.erro) {
							case "000":
								console.log(data.body);
								vm.mensagem = "Alteração concluída com sucesso!";
								$window.location.href = "#";
								break;
							default:
								vm.mensagem = "Erro: " + $Respostas[data.erro];
								switch (data.erro) {
									case "321":
										vm.mensagem = "";
										break;
									case "322":
										vm.mensagem = "";
										break;
								}
						}
					});
			}//else
		}

		var init = function () {

		}

		init();

	}
})();