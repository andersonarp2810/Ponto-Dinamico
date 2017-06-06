(function () {
    angular
        .module('pdApp')
        .service('LoginService', LoginService);

    LoginService.$inject = ['Requisicoes', 'sessao', '$cookies', '$q', '$Rotas', '$window'];

    function LoginService(Requisicoes, sessao, $cookies, $q, $Rotas, $window) {

        this.apagar = apagar;
        this.checar = checar;
        this.enviarLogin = enviarLogin;
        this.logout = logout;

        function apagar() {
            $cookies.remove('sessao_pd_id');
            $cookies.remove('sessao_pd_nome');
            sessao.id = '';
            sessao.nome = '';
        }

        function checar() {
            res = $q.defer();
            url = $Rotas.checar;
            Requisicoes.get(url).then(function (data) {
                console.log(data);
                if (data.erro == '501') {
                    apagar();
                    $window.location.href = "#!/login/";
                    res.reject(0);
                } else {
                    res.resolve(1);
                }
            });
            return res.promise;
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
            dados = {
                id: sessao.id
            }
            apagar();
            console.log(sessao);
            return Requisicoes.destroy(url, dados, tipo);
        }

    };
})();