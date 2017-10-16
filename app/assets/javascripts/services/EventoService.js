(function () {
    angular
        .module('pdApp')
        .service('EventoService', EventoService);

    EventoService.$inject = ["FileUploader", "Requisicoes", 'sessao', "$Rotas"];

    function EventoService(FileUploader, Requisicoes, sessao, $Rotas) {

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

            ev = Object.assign({}, evento);

            ev.hora_fim = ev.hora_fim.toTimeString().substr(0, 8);
            ev.hora_inicio = ev.hora_inicio.toTimeString().substr(0, 8);

            if ("file" in ev.imagem) {
                ev.imagem = ev.imagem.file;
            }

            tipo = "evento";

            console.log(ev);

            return Requisicoes.put(url, ev, tipo);
        }

        function enviarEvento(nome, tipo, dataInicio, dataFim, horaInicio, horaFim, descricao, local, QR,
            latitude, longitude, uploader) {

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
                //imagem: imagem,
                qrcode: QR,
                localizacao_lati: latitude,
                localizacao_long: longitude
            }


            evento.hora_fim = evento.hora_fim.toTimeString().substr(0, 8);
            evento.hora_inicio = evento.hora_inicio.toTimeString().substr(0, 8);

            console.log(evento);

            //return Requisicoes.post(url, evento, tipo);

            uploader.queue[0].formData[0] = evento;
            console.log(uploader);
            console.log(uploader.queue[0]);
            uploader.queue[0].upload();
            return 1;
            //return uploader.queue[0].upload();
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