(function () {
    angular
        .module('pdApp')
        .service('EventoService', EventoService);

    EventoService.$inject = ["Requisicoes", 'sessao', "$Rotas"];

    function EventoService(Requisicoes, sessao, $Rotas) {

        this.deletEvento = deletEvento;
        this.editEvento = editEvento;
        this.enviarEvento = enviarEvento;
        this.listaEventos = listaEventos;
        this.relatorioEventos = relatorioEventos;

        function deletEvento(id) {

            url = $Rotas.deletEvento;

            return Requisicoes.destroy(url, id);
        }

        function editEvento(evento) {

            url = $Rotas.editEvento;

            ev = Object.assign({}, evento);

            ev.hora_fim = ev.hora_fim.toTimeString().substr(0, 8);
            ev.hora_inicio = ev.hora_inicio.toTimeString().substr(0, 8);

            tipo = "evento";

            return Requisicoes.put(url, ev, tipo);
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

            
            evento.hora_fim = ev.hora_fim.toTimeString().substr(0, 8);
            evento.hora_inicio = ev.hora_inicio.toTimeString().substr(0, 8);

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