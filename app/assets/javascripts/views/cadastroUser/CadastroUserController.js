(function () {
	angular
		.module('pdApp')
		.controller("CadastroUserController", CadastroUserController);

	CadastroUserController.$inject = ['UserService'];

	function CadastroUserController(UserService) {

		var userVM = this;
		
		userVM.name = "";
		userVM.senha = "";
		userVM.email = "";
		userVM.matricula = "";
		userVM.cadastrarUsuario = cadastrarUsuario;

		function cadastrarUsuario() {
			UserService.enviarUser(name, senha, email, matricula)
				.then(function (data) {
					console.log(data);
				});

		};
	};
})();
