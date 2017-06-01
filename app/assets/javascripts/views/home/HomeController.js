(function () {
    angular
        .module('pdApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['LoginService', 'sessao', '$cookies', '$window'];
    function HomeController(LoginService, sessao, $cookies, $window) {
        var homeVM = this;
        homeVM.sessao = sessao;

        var init = function () {
            if (homeVM.sessao.id == undefined) {
                console.log("faça login");
                $window.location.href = "#!/login/";
            }
            else {
                LoginService.checar();
            }
        }

        init();
    }
})();