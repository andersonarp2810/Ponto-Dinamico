(function () {
    angular
        .module('pdApp')
        .service('UserService', UserService);

    UserService.$inject = ['Requisicoes', '$Rotas'];

    function UserService(Requisicoes, $Rotas) {

        this.editUser = editUser;
        this.enviarUser = enviarUser;
        this.listar = listar;
        this.relatorio = relatorio;

        function editUser(user) {

            url = $Rotas.sendUser + '/' + user.id;
            tipo = "usuario";

            return Requisicoes.put(url, user, tipo);
        }

        function listar() {
            url = $Rotas.listaUsers;
            return Requisicoes.get(url);
        }

        function enviarUser(name, senha, email, matricula) {

            url = $Rotas.sendUser;
            tipo = "usuario";

            dados = {
                nome: name,
                senha: senha,
                email: email,
                matricula: matricula
            }

            return Requisicoes.post(url, dados, tipo);
        }

        function listar() {
            url = $Rotas.listaUsers;
            return Requisicoes.get(url);
        }

        function relatorio(id) {
            url = $Rotas.listaUsers + "?keywords=" + id;
            return Requisicoes.get(url);
        }

    };
})();