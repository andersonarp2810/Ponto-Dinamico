(function () {
    angular
        .module('pdApp')
        .service('EventoService', EventoService);

    EventoService.$inject = ["Requisicoes", "$Rotas"];

    function EventoService(Requisicoes, $Rotas) {
        this.enviarEvento = enviarEvento;
        this.testarget = testarget;

        function enviarEvento(nome, tipo, dataInicio, dataFim, horaInicio, horaFim, descricao, local, QR,
            latitude, longitude) {
            url = $Rotas.cadastrarEvento;
            tipo = "evento";
            evento = {
                usuario_id : 23,
                nome: nome,
                tipo: tipo,
                data_inicio: dataInicio,
                data_fim: dataFim,
                hora_inicio: horaInicio,
                hora_fim: horaFim,
                descricao: descricao,
                local: local,
                qrcode: QR,
                localizacao_lati: latitude,
                localizacao_long: longitude
            }
            return Requisicoes.post(url, evento, tipo);
        }

        function testarget(){
            console.log(Requisicoes.get($Rotas.testeget));
        }
    };
})();