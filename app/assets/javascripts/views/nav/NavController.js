(function () {
    angular
        .module('pdApp')
        .controller('NavController', NavController);

    NavController.$inject = ['token', '$window'];

    function NavController(token, $window) {
        var navVM = this;
        navVM.logout = logout;
        navVM.token = token;

        function logout() {
            navVM.token.id = '';
            navVM.token.nome = '';
            $window.location.href = "#!/login/";
        }
    }
})();