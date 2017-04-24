(function () {
    angular
        .module('pdApp')
        .service('UserService', UserService);

    UserService.$inject = ['Requisicoes', '$Rotas'];

    function UserService(Requisicoes, $Rotas) {

        this.enviarUser = enviarUser;

        function enviarUser(name, senha, email, matricula) {

            url = $Rotas.cadastrarUser;
            tipo = "usuario";

            dados = {
                nome: name,
                senha: senha,
                email: email,
                matricula: matricula
            }

            return Requisicoes.post(url, dados, tipo);
        }

    };
})();