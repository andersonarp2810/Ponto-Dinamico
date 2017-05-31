(function () {
    angular
        .module('pdApp')
        .service('UserService', UserService);

    UserService.$inject = ['Requisicoes', '$Rotas'];

    function UserService(Requisicoes, $Rotas) {

        this.enviarUser = enviarUser;
        this.listar = listar;
        this.relatorio = relatorio;

        function editMac(mac) {

            url = $Rotas.editarUser;
            tipo = "usuario";

            dados = {
                mac: mac
            }
        }

        function editSenha(senha) {
            url = $Rotas.editarUser;
            tipo = "usuario";

            dados = {
                senha: senha
            }
        }

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