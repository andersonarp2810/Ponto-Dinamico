(function () {
    angular
        .module('pdApp')
        .service('LoginService', LoginService);

    LoginService.$inject = ['Requisicoes', 'sessao', '$cookies', '$Rotas', '$window'];

    function LoginService(Requisicoes, sessao, $cookies, $Rotas, $window) {

        this.checar = checar;
        this.enviarLogin = enviarLogin;
        this.logout = logout;

        function checar() {
            url = $Rotas.checar;
            Requisicoes.get(url).then(function (data) {

            });
        }

        function enviarLogin(login, ciphertext) {

            url = $Rotas.login;
            tipo = "user_session";

            dados = {
                email: login,
                password: ciphertext
            }
            return Requisicoes.post(url, dados, tipo);
        }

        function logout() {
            url = $Rotas.logout;
            tipo = "user_session";
            $cookies.remove('sessao_pd_id');
            $cookies.remove('sessao_pd_nome');
            dados = {
                id: sessao.id
            }
            sessao.id = '';
            sessao.nome = '';
            console.log(sessao);
            return Requisicoes.destroy(url, dados, tipo);
        }

    };
})();