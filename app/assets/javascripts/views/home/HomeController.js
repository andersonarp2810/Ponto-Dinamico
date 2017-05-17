(function () {
    angular
        .module('pdApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['sessao', '$cookies', '$window'];
    function HomeController(sessao, $cookies, $window) {
        // por enquanto não faz nada mas a página home é útil e aqui deve ter o logout
        var homeVM = this;
        homeVM.sessao = sessao;

        var init = function () {
            if (homeVM.sessao.id == undefined) {
                console.log("faça login");
                $window.location.href = "#!/login/";
            }
        }

        init();
    }
})()