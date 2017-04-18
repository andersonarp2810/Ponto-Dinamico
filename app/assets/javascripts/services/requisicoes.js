(function () {
    angular
        .module('pdApp')
        .service('Requisicoes', Requisicoes);

    Requisicoes.$inject = ['$http', '$q', '$IP'];

    function Requisicoes($http, $q) {
        var escopo = this;
        escopo.get = get;
        escopo.post = post;

        function get(url) {
            resposta = $q.defer();
            url = $IP+url;
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
            url = $IP+url;
            console.log(`${url}`);
            resposta = $q.defer();
            da = {};
            da[tipo] = dados;
            $http({
                method: "POST",
                url: url,
                data: da,  // um objeto
                headers: { 'Content-Type': 'application/json' }
            }).then(
                function sucesso(response) {
                    console.log("resolve")
                    resposta.resolve(response.data);
                }, function falha(response) {
                    console.log("reject")
                    resposta.reject(response.data);
                }
            );
            console.log('resposta.promise');
            console.log(resposta.promise);
            return resposta.promise;
        };
    };
})();