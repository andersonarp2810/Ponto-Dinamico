(function () {
    angular
        .module('pdApp')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['Auth', '$Estados', '$state'];

    function AuthController(Auth, $Estados, $state) {
        var authVM = this;
        authVM.login = login;
        authVM.register = register;

        function login() {
            Auth.login(navVM.user).then(function () {
                $state.go($Estados.home);
            });
        }

        function register() {
            Auth.register(navVM.user).then(function () {
                $state.go($Estados.home);
            });
        }
    }
})