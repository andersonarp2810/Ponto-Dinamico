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
            LoginService.logout(navVM.sessao.id);
            navVM.sessao.id = '';
            navVM.sessao.nome = '';
            $cookies.remove('sessao_pd_id');
            $cookies.remove('sessao_pd_nome');
            $window.location.href = "#!/login/";
        }

        var init = function () {
            navVM.sessao.id = $cookies.get('sessao_pd_id');
            if ("undefined" != typeof navVM.sessao.id) {
                navVM.sessao.nome = $cookies.get('sessao_pd_nome');
            }
        }

        init();
    }
})();