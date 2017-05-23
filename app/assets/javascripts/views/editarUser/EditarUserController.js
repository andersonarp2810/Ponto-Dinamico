(function () {
	angular
	.module('pdApp')
	.controller('EditarUserController', EditarUserController);

	EditarUserController.$inject = ['EditarUserService', '$Respostas', '$window'];

	function EditarUserController(EditarUserService, $Respostas, $window) {
		var vm = this;
		vm.senha = "";
		vm.mensagem;
		vm.mac = "";

		function editarUser(){
			if(vm.form.$invalid){
				alert("Preencha os campos corretamente");
			}
		} 
		else {

			EditarUserService.editarUser(vm.mac, vm.senha)
				.then(function(data){
					vm.mensagem = '';
				switch(data.erro){
					case "000":
					console.log(data.body);
					vm.mensagem = "Alteração concluída com sucesso!";
					$window.location.href = "#";
					break;
				default:
					vm.mensagem = "Erro: " + $Respostas[data.erro];
					switch (data.erro){
						case "321"
						vm.mensagem = "";
						break;
						case "322"
						vm.mensagem = "";
						break;
					}
				}					
		
		}
	}
})();