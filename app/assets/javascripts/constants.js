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
            "eventoCadastro": "cadastrarEvento",
            "eventoLista": "listaEvento",
            "eventoRelat": "relatorioEvento",
            "home": "home",
            "login": "login",
            "userCadastro": "cadastrarUser",
            "userLista": "listaUser",
            "userRelat": "relatorioUser",
        })
        //.constant("$IP", "http://192.168.74.123:3000/") //felix
        .constant("$IP", "http://localhost:3000/")
        ;
})();