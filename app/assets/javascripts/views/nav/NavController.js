(function () {
    angular
        .module('pdApp')
        .controller('NavController', NavController);

    NavController.$inject = ['Auth', '$scope'];

    function NavController(Auth, $scope) {
        var navVM = this;
        navVM.logout = Auth.logout;
        navVM.user;
        navVM.signedIn = Auth.isAuthenticated;

        Auth.currentUser().then(function (user) {
            console.log(user);
            navVM.user = user;
        });

        $scope.$on('devise:login', function (e, user) {
            navVM.user = user;
        });

        $scope.$on('devise:logout', function (e, user) {
            navVM.user = {};
        });
    }
})()