(function () {
    angular
        .module('pdApp')
        .service('GeoService', GeoService);

    GeoService.$inject = ['$q', '$window'];

    function GeoService($q, $window) {

        this.getPosicao = getPosicao;

        function getPosicao() {
            deferred = $q.defer();

            if (!$window.navigator.geolocation) {
                deferred.reject('Geolocalização não suportada.');
            } else {
                console.log($window.navigator.geolocation);
                console.log($window.navigator.geolocation.getCurrentPosition);
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        console.log(entrou);
                        deferred.resolve(position.coords);
                    },
                    function (erro) {
                        deferred.reject(erro);
                    },
                    { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 }
                );
            }
            return deferred.promise;
        }
    }
})();