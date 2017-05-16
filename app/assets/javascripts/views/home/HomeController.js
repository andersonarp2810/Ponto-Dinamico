(function () {
    angular
        .module('pdApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['token'];
    function HomeController(token) {
        // por enquanto não faz nada mas a página home é útil e aqui deve ter o logout
        var homeVM = this;
        homeVM.token = token;

        var init = function () {
            if (homeVM.token.nome == '') {
                console.log("faça login");
                $window.location.href = "#!/login/";
            }
        }

        init();
    }
})()