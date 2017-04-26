(function () {
	angular
		.module('pdApp')
		.controller("CadastroUserController", CadastroUserController);

	CadastroUserController.$inject = ['UserService', '$Respostas'];

	function CadastroUserController(UserService, $Respostas) {

		var userVM = this;

		userVM.name = "";
		userVM.senha = "";
		userVM.email = "";
		userVM.matricula = "";
		userVM.cadastrarUsuario = cadastrarUsuario;
		userVM.mensagem;

		function cadastrarUsuario() {
			UserService.enviarUser(name, senha, email, matricula)
				.then(function (data) {

					switch (data.body.id) {

						case 000:
							console.log(data.body);
							userVM.mensagem = "Usuário criado";
							rl();
							break;
						default:
							userVM.mensagem = "Erro: " + $Respostas[data.body.id];
							rl();
							break;

					}

				});

		};

		function rl() {
			userVM.name = '';
			userVM.senha = '';
			userVM.email = '';
			userVM.matricula = '';
		}
	};
})();
