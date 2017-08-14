(function () {
    angular.module('pdApp').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$Estados'];
    function config($stateProvider, $urlRouterProvider, $Estados) {

        $stateProvider
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
                templateUrl: "views/cadastroUser/cadastroUser.html",
                controller: "CadastroUserController",
                controllerAs: "vm"
            })
            .state($Estados.userEdit, {
                url: '/editUser/{user: json}/',
                templateUrl: "views/editUser/editUser.html",
                controller: "EditUserController",
                controllerAs: "vm"
            })
            .state($Estados.userLista, {
                url: '/listaUser/',
                templateUrl: "views/listaUser/listaUser.html",
                controller: "ListaUserController",
                controllerAs: "vm"
            })
            .state($Estados.eventoCadastro, {
                url: '/cadastrarEvento/',
                templateUrl: "views/cadastroEvento/CadastrodeEventos.html",
                controller: "CadastroEventoController",
                controllerAs: "vm"
            })
            .state($Estados.eventoEdit, {
                url: '/editEvento/{evento: json}/',
                templateUrl: "views/editarEvento/editEvento.html",
                controller: "EditEventoController",
                controllerAs: "vm"
            })
            .state($Estados.eventoLista, {
                url: '/listaEvento/',
                templateUrl: "views/listaEvento/listaEvento.html",
                controller: "ListaEventoController",
                controllerAs: "vm"
            });
    };

})();