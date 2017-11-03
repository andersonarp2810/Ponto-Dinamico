(function () {
	angular
		.module('pdApp')
		.controller('EditUserController', EditUserController);

	EditUserController.$inject = ['LoginService', 'UserService', 'sessao', '$Estados', '$Respostas', '$state', '$stateParams'];

	function EditUserController(LoginService, UserService, sessao, $Estados, $Respostas, $state, $stateParams) {
		var vm = this;
		vm.confirmaSenha;
		vm.editarUser = editarUser;
		vm.sessao = sessao;
		vm.mensagem;
		vm.user = Object.assign({}, $stateParams.user);
		delete (vm.user.classe);

		function editarUser() {
			if (vm.form.$invalid) {
				alert("Preencha os campos corretamente");
			}
			else {
				UserService.editUser(vm.user)
					.then(function (data) {
						console.log(data);
						vm.mensagem = '';
						switch (data.erro) {
							case "000":
								console.log(data.body);
								vm.mensagem = "Alteração concluída com sucesso!";
								$state.go($Estados.userLista);
								break;
							default:
								vm.mensagem = "Erro: " + $Respostas[data.erro];
								switch (data.erro) {
									case "321":
										vm.mensagem = "";
										break;
									case "501":
										console.log("sessão expirada");
										$state.go($Estados.login);
										LoginService.apagar();
										break;
								}
						}
					});
			}//else
		}

		var init = function () {
			if (vm.sessao.nome == '') {
				console.log("faça login");
				$state.go($Estados.login);
			} else {
				LoginService.checar();
			}
		}

		init();

	}
})();