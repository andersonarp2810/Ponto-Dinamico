(function () {
    angular
        .module('pdApp')
        .constant("$Rotas", {
            "evento": "cadastrarevento",
            "login": "login",
            "logout": "logout",
            "qrs": "",
            "relatorio": "",
            "user": "cadastrarusuario"
        })
        .constant("$Estados", {
            "auth": "auth",
            "evento": "cadastrarEvento",
            "home": "home",
            "login": "login",
            "user": "cadastrarUser",
            "userRelat": "relatorioUser",
            "eventoRelat": "relatorioEvento"
        })
        //.constant("$IP", "http://192.168.74.123:3000/") //felix
        .constant("$IP", "http://localhost:3000/")
        ;
})();