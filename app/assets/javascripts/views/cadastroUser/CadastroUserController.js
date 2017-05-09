(function () {
	angular
		.module('pdApp')
		.controller("CadastroUserController", CadastroUserController);

	CadastroUserController.$inject = ['UserService', '$Respostas'];

	function CadastroUserController(UserService, $Respostas) {

		var vm = this;

		vm.name = "";
		vm.senha = "";
		vm.email = "";
		vm.matricula = "";
		vm.cadastrarUsuario = cadastrarUsuario;
		vm.mensagem;

		function cadastrarUsuario() {
			if (vm.form.$invalid) {
				alert("Preencha os campos corretamente.");
			}
			else {
				UserService.enviarUser(vm.name, vm.senha, vm.email, vm.matricula)
					.then(function (data) {
						switch (data.erro) { // definir erro pra cada campo
							case 000:
								console.log(data.body);
								vm.mensagem = "Usuário criado";
								//limpar();
								$window.location.assign("#!/home");//deve redirecionar pra lista de usuários depois
								break;
							case 102:
								vm.name = '';
							case 103:
								vm.senha = '';
								vm.form.confirma = '';
							case 104:
								vm.email = '';
							case 105:
								vm.matricula = '';
							default:
								vm.mensagem = "Erro: " + $Respostas[data.erro];
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
	};
})();
