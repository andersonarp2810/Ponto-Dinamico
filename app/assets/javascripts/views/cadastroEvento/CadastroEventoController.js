(function () {
    angular
        .module('pdApp')
        .controller('CadastroEventoController', CadastroEventoController);

    CadastroEventoController.$inject = ['$scope', '$log', 'EventoService', 'FileUploader', 'LoginService', 'GeoService', 'sessao', '$Respostas', '$Estados', '$state'];

    function CadastroEventoController($scope, $log, EventoService, FileUploader, LoginService, GeoService, sessao, $Repostas, $Estados, $state) {
        var vm = this; //view model
        vm.botao = false;
        vm.cadastrarEvento = cadastrarEvento;
        vm.dataInicio;
        vm.dataFim;
        vm.descricao;
        vm.horaInicio;
        vm.horaFim;
        vm.imprime = imprime;
        vm.local;
        vm.latitude = -7.205858600000001;
        vm.longitude = -39.311446;
        vm.mapLoad = false;
        vm.mensagem;
        vm.nome;
        vm.QR = '';
        vm.uploader = new FileUploader({
            url: '/cadastrarevento',
            alias: 'imagem',
            method: 'POST',
            removeAfterUpload: true,
        });
        vm.tipo;
        vm.sessao = sessao;

        vm.uploader.onAfterAddingFile = function (item, filter, options) {
            if (vm.uploader.queue.length > 1) {
                vm.uploader.queue.splice(0, 1);
            }
        };

        function cadastrarEvento() {
            console.log(vm.uploader);
            if (vm.form.$invalid || vm.dataInicio > vm.dataFim) {
                alert("Preencha os campos corretamente.");
            }
            else {
                vm.botao = true;
                vm.horaInicio.setFullYear(2000);
                vm.horaFim.setFullYear(2000);

                evento = {
                    usuario_id: sessao.id,
                    nome: nome,
                    tipo: tipo,
                    data_inicio: dataInicio,
                    data_fim: dataFim,
                    hora_inicio: horaInicio.toTimeString().substr(0, 8),
                    hora_fim: horaFim.toTimeString().substr(0, 8),
                    descricao: descricao,
                    lugar: local,
                    qrcode: QR,
                    localizacao_lati: latitude,
                    localizacao_long: longitude
                }
                console.log(evento);

                vm.uploader.queue[0].formData[0] = evento;
                console.log(vm.uploader);
                console.log(vm.uploader.queue[0]);

                vm.uploader.queue[0].onSuccess = function (response, status, headers) {
                    data = response.data;
                    console.log(data);
                    vm.mensagem = '';
                    switch (data.erro) { // definir erro pra cada campo
                        case "000":
                            console.log(data.body);
                            vm.mensagem = "Evento criado";
                            //limpar();
                            $state.go($Estados.eventoLista);
                            break;
                        default:
                            vm.mensagem = 'Erro: ' + $Repostas[data.erro];
                            console.log(data.status);
                            switch (data.erro) {
                                case "102":
                                    vm.nome = '';
                                case "501":
                                    console.log("faça login");
                                    $state.go($Estados.login);
                                    LoginService.apagar();
                                //deslogar
                            }
                            break;
                    } // end switch
                }

                vm.uploader.queue[0].onError = function (response, status, headers) {
                    console.error(response);
                }

                vm.uploader.queue[0].onComplete = function (response, status, headers) {
                    vm.botao = false;
                }

                vm.uploader.queue[0].upload();

                /* Como devia ser mas não é por causa do modulo de enviar imagem
                                EventoService.enviarEvento(vm.nome, vm.tipo, vm.dataInicio, vm.dataFim,
                                    vm.horaInicio, vm.horaFim, vm.descricao, vm.local, vm.QR,
                                    vm.latitude, vm.longitude, vm.uploader)
                                    .then(function (data) {
                                        console.log(data);
                                        vm.mensagem = '';
                                        switch (data.erro) { // definir erro pra cada campo
                                            case "000":
                                                console.log(data.body);
                                                vm.mensagem = "Evento criado";
                                                //limpar();
                                                $state.go($Estados.eventoLista);
                                                break;
                                            default:
                                                vm.mensagem = 'Erro: ' + $Repostas[data.erro];
                                                console.log(data.status);
                                                switch (data.erro) {
                                                    case "102":
                                                        vm.nome = '';
                                                    case "501":
                                                        console.log("faça login");
                                                        $state.go($Estados.login);
                                                        LoginService.apagar();
                                                    //deslogar
                                                }
                                                break;
                                        } // end switch
                                        vm.botao = false;
                                    },
                                    function (err) {
                                        console.error(err);
                                        vm.botao = false;
                                    }
                                    ); //end then
                                    */
            }
        }



        function imprime() {
            window.print();
        }

        function limpar() {
            vm.botao = false;
            vm.dataInicio = '';
            vm.dataFim = '';
            vm.horaInicio = '';
            vm.horaFim = '';
            vm.descricao = '';
            vm.local = '';
            vm.nome = '';
            vm.QR = '';
            vm.tipo = '';
        }

        var init = function () {
            if (vm.sessao.nome == '') {
                console.log("faça login");
                $state.go($Estados.login);
            } else {
                LoginService.checar();
                console.log("geo");
                GeoService.getPosicao()
                    .then(
                    function (data) {
                        console.log("pegou geo");
                        console.log(data);
                        vm.latitude = data.latitude;
                        vm.longitude = data.longitude;
                        iniciarMapa();
                    },
                    function (erro) {
                        console.error(erro);
                        //alert("Erro de Geolocalização.");
                    }
                    );
            }


            //jquery do input pra mostrar qual arquivo escolhido
            $(function () {

                // We can attach the `fileselect` event to all file inputs on the page
                $(document).on('change', ':file', function () {
                    var input = $(this),
                        numFiles = input.get(0).files ? input.get(0).files.length : 1,
                        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                    input.trigger('fileselect', [numFiles, label]);
                });

                // We can watch for our custom `fileselect` event like this
                $(document).ready(function () {
                    $(':file').on('fileselect', function (event, numFiles, label) {

                        var input = $(this).parents('.input-group').find(':text'),
                            log = numFiles > 1 ? numFiles + ' files selected' : label;

                        if (input.length) {
                            input.val(log);
                        } else {
                            if (log) alert(log);
                        }

                    });
                });

            });
            // jquery

            //google.maps.event.addDomListener(window, 'load', iniciarMapa);
        }

        // mapa
        function iniciarMapa() {

            var myLatlng = new google.maps.LatLng(vm.latitude, vm.longitude);

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 18,
                center: myLatlng,
                mapTypeId: 'roadmap'
            });

            var marker = new google.maps.Marker({
                draggable: false,
                position: myLatlng,
                map: map,
                title: "Local do evento"
            });

            google.maps.event.addListener(map, 'click', function (event) {
                marker.setPosition(event.latLng);
                //marker.setTitle("" + event.latLng);
                console.log(event.latLng.lat());
                console.log(event.latLng.lng());
                $scope.$apply(function () {
                    vm.latitude = event.latLng.lat();
                    vm.longitude = event.latLng.lng();
                });
                //alert(event.latLng);
            });


            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function () {
                searchBox.setBounds(map.getBounds());
            });

            var markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function () {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                markers = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function (place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    markers.push(new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }));

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);

                // atualiza em busca
                centro = map.getCenter(); // tipo LatLng
                marker.setPosition(centro);
                $scope.$apply(function () {
                    vm.latitude = centro.lat();
                    vm.longitude = centro.lng();
                });

            });

            $scope.$on('$viewContentLoaded', function () { // faz o mapa carregar sem f5
                google.maps.event.trigger(map, 'resize');
            });

            vm.mapLoad = true;
        }
        //mapa

        init();




    }
})();