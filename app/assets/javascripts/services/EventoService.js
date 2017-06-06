(function () {
    angular
        .module('pdApp')
        .service('EventoService', EventoService);

    EventoService.$inject = ["Requisicoes", 'sessao', "$Rotas"];

    function EventoService(Requisicoes, sessao, $Rotas) {

        this.editEvento = editEvento;
        this.enviarEvento = enviarEvento;
        this.listaEventos = listaEventos;
        this.relatorioEventos = relatorioEventos;

        function editEvento(evento) {

            url = $Rotas.editEvento;

            tipo = "evento";

            return Requisicoes.put(url, evento, tipo);
        }

        function enviarEvento(nome, tipo, dataInicio, dataFim, horaInicio, horaFim, descricao, local, QR,
            latitude, longitude) {

            url = $Rotas.sendEvento;
            tipo = "evento";

            evento = {
                usuario_id: sessao.id,
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

        function listaEventos() {
            url = $Rotas.listaEventos;
            return Requisicoes.get(url);
        }

        function relatorioEventos(id) {
            url = $Rotas.listaEventos + '?keywords=' + id;
            return Requisicoes.get(url);
        }

    };
})();