(function () {
    angular
        .module('pdApp')
        .constant("$Rotas", {
            "checar": "",
            "editEvento": "",
            "sendEvento": "cadastrarevento",
            "listaEventos": "eventos",
            "listaUsers": "usuarios",
            "login": "login",
            "logout": "logout",
            "qrs": "",
            "relatorio": "",
            "sendUser": "cadastrarusuario"
        })
        .constant("$Estados", {
            "eventoCadastro": "cadastrarEvento",
            "eventoEdit": "editEvento",
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