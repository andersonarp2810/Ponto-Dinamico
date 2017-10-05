(function () {
    angular
        .module('pdApp')
        .controller('NavController', NavController);

    NavController.$inject = ['LoginService', 'sessao', '$cookies', '$IP', '$window'];

    function NavController(LoginService, sessao, $cookies, $IP, $window) {
        var navVM = this;
        navVM.sair = sair;
        navVM.sessao = sessao;

        function sair() {
            LoginService.logout()
                .then(
                function (data) {
                    $window.location.href = "#!/login/";
                },
                function (err) {
                    console.error(err);
                }
            );
        }

        var init = function () {
            navVM.sessao.id = $cookies.get('sessao_pd_id');
            navVM.sessao.nome = $cookies.get('sessao_pd_nome');
            console.log($cookies.get('sessao_pd_nome'));
            console.log($window.location.href);
            console.log($cookies.get('sessao_pd_id'));
            if (navVM.sessao.id != undefined) {
                if ($window.location.href == $IP+"#!/login/" || $window.location.href ==  $IP) {
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