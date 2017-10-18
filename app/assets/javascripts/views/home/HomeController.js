(function () {
    angular
        .module('pdApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['LoginService', 'sessao', '$cookies', '$Estados', '$state'];
    function HomeController(LoginService, sessao, $cookies, $Estados, $state) {
        var homeVM = this;
        homeVM.sessao = sessao;

        var init = function () {
            if (homeVM.sessao.id == undefined) {
                console.log("faça login");
                $state.go($Estados.login);
            }
            else {
                LoginService.checar().then(
                    function (data) {
                        console.log(data);
                    },
                    function (err) {
                        console.error(err);
                    }
                );
            }
        }

        init();
    }
})();