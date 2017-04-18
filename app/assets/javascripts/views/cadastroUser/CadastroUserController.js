(function () {
	angular
		.module('pdApp')
		.controller("CadastroUserController", CadastroUserController);

	CadastroUserController.$inject = ['UserService'];

	function CadastroUserController(UserService) {

		var userVM = this;
		userVM.name = "";
		userVM.password = "";
		userVM.email = "";
		userVM.matricula = "";
		userVM.cadastrarUsuario = cadastrarUsuario;

		function cadastrarUsuario() {
			enviarUser(name, password, email, matricula)
				.then(function (data) {
					console.log(data);
				});

		};
	};
})();
