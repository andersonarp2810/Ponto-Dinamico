(function () {
    angular
        .module('pdApp')
        .controller('NavController', NavController);

    NavController.$inject = ['token', '$scope'];

    function NavController(token, $scope) {
        var navVM = this;
        navVM.user;
        navVM.token = token;
        navVM.teste = teste;

        function teste() {
            console.log(token);
        }
    }
})();