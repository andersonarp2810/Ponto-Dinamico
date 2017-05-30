(function () {
    angular
        .module('pdApp')
        .service('GeoService', GeoService);

    GeoService.$inject = ['$q', '$window'];

    function GeoService($q, $window) {

        this.getPosicao = getPosicao;

        function getPosicao() {
            var deferred = $q.defer();

            if (!$window.navigator.geolocation) {
                deferred.reject('Geolocalização não suportada.');
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        deferred.resolve(position);
                    },
                    function (erro) {
                        deferred.reject(erro);
                    }
                );
            }

            return deferred.promise;
        }
    }
})();