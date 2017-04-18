(function () {
    angular
        .module('pdApp')
        .service('UserService', UserService);

    UserService.$inject = ['$Rotas'];

    function UserService($Rotas) {
        this.enviarUser = enviarUser;
        url = $Rotas.cadastrarUser;
        function enviarUser(name, senha, email, matricula) {
            dados = {
                nome: name,
                senha: senha,
                email: email,
                matricula: matricula
            }
            return post(url, dados);
        }

    };
})();