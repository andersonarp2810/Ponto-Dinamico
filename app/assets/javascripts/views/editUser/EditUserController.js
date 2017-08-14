(function () {
	angular
		.module('pdApp')
		.controller('EditUserController', EditUserController);

	EditUserController.$inject = ['LoginService', 'UserService', 'sessao', '$Respostas', '$stateParams', '$window'];

	function EditUserController(LoginService, UserService, sessao, $Respostas, $stateParams, $window) {
		var vm = this;
		vm.confirmaSenha;
		vm.editarUser = editarUser;
		vm.sessao = sessao;
		vm.mensagem;
		vm.user = $stateParams.user;

		function editarUser() {
			if (vm.form.$invalid) {
				alert("Preencha os campos corretamente");
			}
			else {
				UserService.editUser(vm.user)
					.then(function (data) {
						vm.mensagem = '';
						switch (data.erro) {
							case "000":
								console.log(data.body);
								vm.mensagem = "Alteração concluída com sucesso!";
								$window.location.href = "#!/listaUser";
								break;
							default:
								vm.mensagem = "Erro: " + $Respostas[data.erro];
								switch (data.erro) {
									case "321":
										vm.mensagem = "";
										break;
									case "501":
										console.log("sessão expirada");
										$window.location.href = "#!/login";
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
				$window.location.href = "#!/login/";
			} else {
				LoginService.checar();
			}
		}

		init();

	}
})();