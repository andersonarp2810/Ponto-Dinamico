(function () {
	angular
		.module('pdApp')
		.controller('UserRelatorioController', UserRelatorioController);

	UserRelatorioController.$inject = ['UserRelatorioService', '$Respostas', '$window'];

	function UserRelatorioController(UserRelatorioService, $Respostas, $window) {
		var vm = this;
		vm.botao = false;
		vm.matricula;
		vm.mensagem;

		function UserRelatorio() {
			if(vm.matricula.$invalid){
				alerta("Informe sua matricula");
			}
			else {
				vm.botao = true;
				UserRelatorioService.userRelat(vm.matricula)
				.then(function(data){
					console.log(data);
					vm.mensagem = '';
					switch(data.erro){
						case "000":
							console.log(data.body);
							vm.mensagem = "Relatorio Gerado";
							$window.location.href = "#";
							break;
						case "301":
							vm.matricula = '';
						case "302":
							vm.matricula = '';
						default: 
							vm.mensagem = 'Erro: ' + $Repostas[data.erro];
					}
					vm.botao = false;
				});

			}
		}
		function limpar() {
            vm.botao = false;
            vm.matricula = '';
        }
	}
})();