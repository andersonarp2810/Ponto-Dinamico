(function () {
    angular
        .module('pdApp')
        .controller('NavController', NavController);

    NavController.$inject = ['LoginService', 'sessao', '$cookies', '$Estados', '$state', '$window',];

    function NavController(LoginService, sessao, $cookies, $Estados, $state, $window) {
        var navVM = this;
        navVM.sair = sair;
        navVM.sessao = sessao;

        function sair() {
            LoginService.logout()
                .then(
                function (data) {
                    $state.go($Estados.login);
                },
                function (err) {
                    console.error(err);
                }
                );
        }

        var init = function () {
            navVM.sessao.id = $cookies.get('sessao_pd_id');
            navVM.sessao.nome = $cookies.get('sessao_pd_nome');
            console.log($window.location.href);
            console.log($cookies.get('sessao_pd_nome'));
            console.log($cookies.get('sessao_pd_id'));
            if (navVM.sessao.id != undefined) {
                if ($window.location.href.includes("login") || !($window.location.href.includes("#"))) {
                    $state.go($Estados.home);
                }
            }
            else {
                $state.go($Estados.login);
            }
        }

        init();
    }
})();