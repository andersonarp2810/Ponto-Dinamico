(function () {
    angular
        .module('pdApp')
        .service('Requisicoes', Requisicoes);

    Requisicoes.$inject = ['sessao', '$http', '$q', '$IP'];

    function Requisicoes(sessao, $http, $q, $IP) {

        var escopo = this;
        escopo.del = del;
        escopo.get = get;
        escopo.post = post;
        escopo.sessao = sessao;

        function get(url) {
            resposta = $q.defer();
            url = $IP + url;
            $http({
                method: "GET",
                url: `${url}`
            }).then(function sucesso(response) {
                resposta.resolve(response.data);
            }, function falha(response) {
                resposta.reject(response.data);
            });
            return resposta.promise;
        };

        function post(url, dados, tipo) {
            url = $IP + url;
            console.log(`${url}`);
            resposta = $q.defer();
            da = {};
            da[tipo] = dados;
            //da[id] = escopo.sessao;
            $http({
                method: "POST",
                url: url,
                data: da,  // um objeto
                headers: { 'Content-Type': 'application/json' }
            }).then(
                function sucesso(response) {
                    console.log("resolve")
                    resposta.resolve(response.data);
                }, function falha(erro) {
                    response = { erro: erro.data, status: erro.status };
                    console.log("reject")
                    resposta.reject(response);
                }
                );
            console.log('resposta.promise');
            console.log(resposta.promise);
            return resposta.promise;
        };

        function del(url, dados, tipo) {
            rl = $IP + url;
            console.log(`${url}`);
            resposta = $q.defer();
            da = {};
            da[tipo] = dados;
            //da[id] = escopo.sessao;
            $http({
                method: "DELETE",
                url: url,
                data: da,  // um objeto
                headers: { 'Content-Type': 'application/json' }
            }).then(
                function sucesso(response) {
                    console.log("resolve")
                    resposta.resolve(response.data);
                }, function falha(erro) {
                    response = { erro: erro.data, status: erro.status };
                    console.log("reject")
                    resposta.reject(response);
                }
                );
            console.log('resposta.promise');
            console.log(resposta.promise);
            return resposta.promise;
        }
    };
})();