(function () {
    angular
        .module('pdApp')
        .controller('NavController', NavController);

    NavController.$inject = ['LoginService', 'sessao', '$cookies', '$window'];

    function NavController(LoginService, sessao, $cookies, $window) {
        var navVM = this;
        navVM.sair = sair;
        navVM.sessao = sessao;

        function sair() {
            LoginService.logout()
                .then(function (data) {
                    $window.location.href = "#!/login/";
                });
        }

        var init = function () {
            navVM.sessao.id = $cookies.get('sessao_pd_id');
            navVM.sessao.nome = $cookies.get('sessao_pd_nome');
            console.log($cookies.get('sessao_pd_nome'));
            console.log($window.location.href);
            console.log($cookies.get('sessao_pd_id'));
            if (navVM.sessao.id != undefined) {
                if ($window.location.href == "http://localhost:3000/#!/login/" || $window.location.href == "http://localhost:3000/") {
                    $window.location.href = "#!/home/";
                }
            }
            else {
                $window.location.href = "#!/login/";
            }
        }

        init();
    }
})();