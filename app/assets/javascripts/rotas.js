(function () {
    angular.module('pdApp').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$Estados'];
    function config($stateProvider, $urlRouterProvider, $Estados) {

        $stateProvider
            .state($Estados.evento, {
                url: '/cadastrarEvento/',
                templateUrl: "views/cadastroEvento/CadastrodeEventos.html",
                controller: "CadastroEventoController",
                controllerAs: "vm"
            })
            .state($Estados.home, {
                url: '/home/',
                templateUrl: 'views/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state($Estados.login, {
                url: '/login/',
                templateUrl: 'views/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state($Estados.user, {
                url: '/cadastrarUser/',
                templateUrl: "views/cadastroUser/cadastroadm.html",
                controller: "CadastroUserController",
                controllerAs: "vm"
            });
    };

})();