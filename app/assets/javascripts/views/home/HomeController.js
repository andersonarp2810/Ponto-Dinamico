(function () {
    angular
        .module('pdApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['token'];
    function HomeController(token) {
        // por enquanto não faz nada mas a página home é útil e aqui deve ter o logout
        var homeVM = this;
        homeVM.logout = logout;
        homeVM.token = token;

        function logout() {
            homeVM.token = '';
        }
    }
})()