(function () {
    angular
        .module('pdApp')
        .service('EventoService', EventoService);

    EventoService.$inject = ["FileUploader", "Requisicoes", 'sessao', "$q", "$Rotas"];

    function EventoService(FileUploader, Requisicoes, sessao, $q, $Rotas) {

        this.deletEvento = deletEvento;
        this.editEvento = editEvento;
        this.enviarEvento = enviarEvento;
        this.listaEventos = listaEventos;
        this.relatorioEventos = relatorioEventos;

        function deletEvento(id) {

            url = $Rotas.deletEvento + "/" + id;

            return Requisicoes.destroy(url);
        }

        function editEvento(evento) {

            url = $Rotas.editEvento;

            ev = Object.assign({}, vm.evento);

            ev.hora_fim = ev.hora_fim.toTimeString().substr(0, 8);
            ev.hora_inicio = ev.hora_inicio.toTimeString().substr(0, 8);

            console.log(ev);

            return Requisicoes.putEvento(url, ev);

        }

        function enviarEvento(nome, tipo, dataInicio, dataFim, horaInicio, horaFim, descricao, local, QR,
            latitude, longitude, uploader) {
            // só entra aqui se o evento for sem imagem
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
                lugar: local,
                qrcode: QR,
                localizacao_lati: latitude,
                localizacao_long: longitude
            }


            evento.hora_fim = evento.hora_fim.toTimeString().substr(0, 8);
            evento.hora_inicio = evento.hora_inicio.toTimeString().substr(0, 8);

            console.log(evento);

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