(function () {
	angular
		.module('pdApp')
		.controller("CadastroUserController", CadastroUserController);

	CadastroUserController.$inject = ['LoginService', 'UserService', 'sessao', '$Respostas', '$window'];

	function CadastroUserController(LoginService, UserService, sessao, $Respostas, $window) {

		var vm = this;

		vm.name = "";
		vm.senha = "";
		vm.email = "";
		vm.matricula = "";
		vm.cadastrarUsuario = cadastrarUsuario;
		vm.mensagem;
		vm.sessao = sessao;


		function cadastrarUsuario() {
			if (vm.form.$invalid) {
				alert("Preencha os campos corretamente.");
			}
			else {
				UserService.enviarUser(vm.name, vm.senha, vm.email, vm.matricula)
					.then(function (data) {
						vm.mensagem = '';
						console.log("data.erro");
						console.log(data.erro);
						switch (data.erro) { // definir erro pra cada campo
							case "000":
								console.log(data.body);
								vm.mensagem = "Usuário criado";
								//limpar();
								$window.location.href = "#!/listaUser/";
								break;
							default:
								vm.mensagem = "Erro: " + $Respostas[data.erro];
								switch (data.erro) {
									case "102":
										vm.name = '';
										break;
									case "103":
										vm.senha = '';
										vm.form.confirma = '';
										break;
									case "104":
										vm.email = '';
										break;
									case "105":
										vm.matricula = '';
										break;
									case "303":
										//deslogar?
										break;
									case "501":
										console.log("Sessão expirada.");
										$window.location.href = "#!/login/";
										LoginService.apagar();
										break;
								}
								break;
						}
					}); // then
			}
		};

		function limpar() {
			vm.name = '';
			vm.senha = '';
			vm.email = '';
			vm.matricula = '';
		}

		var init = function () {
			if (vm.sessao.nome == '') {
				console.log("faça login");
				$window.location.href = "#!/login/";
			}
			else {
				LoginService.checar();
			}
		}

		init();
	}
})();
