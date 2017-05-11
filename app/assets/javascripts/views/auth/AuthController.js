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
            navVM.user.password = SHA_256(navVM.user.password);
            Auth.login(navVM.user).then(function () {
                $state.go($Estados.home);
            });
        }

        function register() {
            navVM.user.password = SHA_256(navVM.user.password);
            Auth.register(navVM.user).then(function () {
                $state.go($Estados.home);
            });
        }
    }
})