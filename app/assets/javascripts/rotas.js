(function () {
    angular.module('pdApp').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$Estados'];
    function config($stateProvider, $urlRouterProvider, $Estados) {

        $stateProvider
            .state($Estados.eventoCadastro, {
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
            .state($Estados.userCadastro, {
                url: '/cadastrarUser/',
                templateUrl: "views/cadastroUser/cadastroadm.html",
                controller: "CadastroUserController",
                controllerAs: "vm"
            })
            .state($Estados.userLista, {
                url: '/listaUser/',
                templateUrl: "views/listaUser/listaUser.html",
                controller: "ListaUserController",
                controllerAs: "vm"
            })
            .state($Estados.userRelat, {
                url: '/relatorioUser',
                templateUrl: "views/relatorioUser/relatorioUser.html",
                controller: "RelatorioUserController",
                controllerAs: "vm"
            })
            .state($Estados.eventoLista, {
                url: '/listaEvento',
                templateUrl: "views/listaEvento/listaEvento.html",
                controller: "ListaEventoController",
                controllerAs: "vm"
            });
    };

})();