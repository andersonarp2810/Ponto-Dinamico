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

        function editEvento(evento, uploader) {

            var resposta = $q.defer();

            url = $Rotas.editEvento;

            ev = Object.assign({}, evento);

            ev.hora_fim = ev.hora_fim.toTimeString().substr(0, 8);
            ev.hora_inicio = ev.hora_inicio.toTimeString().substr(0, 8);

            console.log(ev);

            if (uploader.queue.length > 0) {
                uploader.queue[0].formData[0] = evento;
                uploader.queue[0].method = "PUT";
                console.log(uploader.queue[0]);

                uploader.queue[0].onSuccess = function (response, status, headers) {
                    resposta.resolve(response.data);
                }

                uploader.queue[0].onError = function (response, status, headers) {
                    resposta.reject(response);
                }

                uploader.queue[0].onComplete = function (response, status, headers) {
                    resposta.resolve(response);
                }

                uploader.queue[0].upload();
                return resposta.promise;
            }
            else {
                return Requisicoes.putEvento(url, ev);
            }

        }

        function enviarEvento(nome, tipo, dataInicio, dataFim, horaInicio, horaFim, descricao, local, QR,
            latitude, longitude, uploader) {

            var resposta = $q.defer();

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

            uploader.queue[0].onSuccess = function (response, status, headers) {
                resposta.resolve(response.data);
            }

            uploader.queue[0].onError = function (response, status, headers) {
                resposta.reject(response);
            }

            uploader.queue[0].onComplete = function (response, status, headers) {
                resposta.resolve(response);
            }

            uploader.queue[0].upload();
            return resposta.promise;
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