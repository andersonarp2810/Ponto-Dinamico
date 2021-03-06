(function () {
    angular
        .module('pdApp')
        .service('UserService', UserService);

    UserService.$inject = ['Requisicoes', '$Rotas'];

    function UserService(Requisicoes, $Rotas) {

        this.deletUser = deletUser;
        this.editUser = editUser;
        this.enviarUser = enviarUser;
        this.listar = listar;
        this.pontos = pontos;
        this.relatorio = relatorio;

        function deletUser(id) {
            
            url = $Rotas.deletUser + "/" + id;

            return Requisicoes.destroy(url);
        }

        function editUser(usuario) {

            user = Object.assign({}, usuario);
            if (user.password != undefined) {
                user.password = SHA2_256(user.password);
            }
            url = $Rotas.editUser;
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
                password: SHA2_256(senha),
                email: email,
                matricula: matricula
            }

            return Requisicoes.post(url, dados, tipo);
        }

        function listar() {
            url = $Rotas.listaUsers;
            return Requisicoes.get(url);
        }

        function pontos(usu_id, eve_id) {
            url = $Rotas.pontos + '/' + usu_id + '/' + eve_id;
            return Requisicoes.get(url);
        }

        function relatorio(id) {
            url = $Rotas.listaUsers + "?keywords=" + id;
            return Requisicoes.get(url);
        }

    };
})();