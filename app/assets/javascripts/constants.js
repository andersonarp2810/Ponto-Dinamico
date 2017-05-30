(function () {
    angular
        .module('pdApp')
        .constant("$Rotas", {
            "evento": "cadastrarevento",
            "listaEventos": "eventos",
            "login": "login",
            "logout": "logout",
            "qrs": "",
            "relatorio": "",
            "user": "cadastrarusuario"
        })
        .constant("$Estados", {
            "eventoCadastro": "cadastrarEvento",
            "eventoLista": "listaEvento",
            "eventoRelat": "relatorioEvento",
            "home": "home",
            "login": "login",
            "userCadastro": "cadastrarUser",
            "userEdit": "editUser",
            "userLista": "listaUser",
            "userRelat": "relatorioUser",
        })
        //.constant("$IP", "http://192.168.74.123:3000/") //felix
        .constant("$IP", "http://localhost:3000/")
        ;
})();