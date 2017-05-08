(function () {
    angular
        .module('pdApp')
        .constant("$Rotas", {
            "evento": "cadastrarevento",
            "login": "login",
            "qrs": "",
            "relatorio": "",
            "user": "cadastrarusuario"
        })
        .constant("$Estados", {
            "evento": "cadastrarEvento",
            "home": "home",
            "login": "login",
            "user": "cadastrarUser"
        })
        //.constant("$IP", "http://192.168.74.123:3000/") //felix
        .constant("$IP", "http://localhost:3000/")
        ;
})();