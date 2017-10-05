(function () {
    angular
        .module('pdApp')
        .constant("$Rotas", {
            "checar": "autentica",
            "deletEvento": "eventos",
            "deletUser": "usuarios",
            "editEvento": "eventos",
            "editUser": "usuarios",
            "sendEvento": "cadastrarevento",
            "listaEventos": "eventos",
            "listaUsers": "usuarios",
            "login": "login",
            "logout": "logout",
            "pontos": "relatoriousuario",
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
        .constant("$IP", "http://ponto-dinamico.herokuapp.com/")
        //.constant("$IP", "http://localhost:3000/")
        ;
})();