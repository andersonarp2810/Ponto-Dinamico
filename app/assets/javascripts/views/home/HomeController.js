(function () {
    angular
        .module('pdApp')
        .controller('HomeController', HomeController);

    function HomeController() {
        // por enquanto não faz nada mas a página home é útil e aqui deve ter o logout
        var vm = this;
        vm.logout = logout;

        function logout(){
            
        }
    }
})()