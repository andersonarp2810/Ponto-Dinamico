(function () {
    angular
        .module('pdApp')
        .controller('EditEventoController', EditEventoController);

    EditEventoController.$inject = ['$scope', 'EventoService', 'FileUploader', 'GeoService', 'LoginService', 'sessao', '$Respostas', '$Estados', '$state', '$stateParams'];

    function EditEventoController($scope, EventoService, FileUploader, GeoService, LoginService, sessao, $Respostas, $Estados, $state, $stateParams) {
        var vm = this;
        vm.botao = false;
        x = $stateParams.evento;
        x.data_fim = new Date(x.data_fim);
        x.data_inicio = new Date(x.data_inicio);
        x.hora_fim = new Date(x.hora_fim);
        x.hora_inicio = new Date(x.hora_inicio);
        vm.editEvento = editEvento;
        vm.evento = x;
        vm.imprime = imprime;
        vm.mensagem;
        vm.sessao = sessao;
        vm.uploader = new FileUploader({
            url: '/eventos',
            alias: 'imagem',
            method: 'PUT',
            removeAfterUpload: true,
        });

        function editEvento() {
            if (vm.form.$invalid || vm.evento.data_inicio > vm.evento.data_fim) {
                alert("Preencha os campos corretamente.");
            }
            else {
                vm.botao = true;

                ev = Object.assign({}, evento);

                ev.hora_fim = ev.hora_fim.toTimeString().substr(0, 8);
                ev.hora_inicio = ev.hora_inicio.toTimeString().substr(0, 8);

                console.log(ev);

                if (uploader.queue.length > 0) {
                    uploader.queue[0].url = 'eventos/' + ev.id;
                    uploader.queue[0].formData[0] = evento;
                    uploader.queue[0].method = "PUT";
                    console.log(uploader.queue[0]);

                    uploader.queue[0].onSuccess = function (response, status, headers) {
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
                                vm.mensagem = 'Erro: ' + $Respostas[data.erro];
                                console.log(data.status);
                                switch (data.erro) {
                                    case "102":
                                        vm.nome = '';
                                    case "501":
                                        console.log("sessão expirada");
                                        LoginService.apagar();
                                        $state.go($Estados.login);
                                    //deslogar
                                }
                                break;
                        } // end switch
                    }

                    uploader.queue[0].onError = function (response, status, headers) {
                        console.error(response);
                    }

                    uploader.queue[0].onComplete = function (response, status, headers) {
                        vm.botao = false;
                    }

                    uploader.queue[0].upload();
                }

                else { // caso não mude a imagem
                    EventoService.editEvento(vm.evento, vm.uploader)
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
                                    vm.mensagem = 'Erro: ' + $Respostas[data.erro];
                                    console.log(data.status);
                                    switch (data.erro) {
                                        case "102":
                                            vm.nome = '';
                                        case "501":
                                            console.log("sessão expirada");
                                            LoginService.apagar();
                                            $state.go($Estados.login);
                                        //deslogar
                                    }
                                    break;
                            } // end switch
                            vm.botao = false;
                        }); //end then
                }   // fim do else não mude imagem
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
            vm.tipo = '';
        }

        var init = function () {
            if (vm.sessao.nome == '') {
                console.log("faça login");
                $state.go($Estados.login);
            } else {
                LoginService.checar();

                iniciarMapa();

                delete vm.evento.classe;
                console.log(vm.evento);
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
            console.log("iniciando mapa");

            var myLatlng = new google.maps.LatLng(vm.evento.localizacao_lati, vm.evento.localizacao_long);

            console.log(myLatlng.lat());
            console.log(myLatlng.lng());

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
                console.log(event.latLng.lat());
                console.log(event.latLng.lng());
                $scope.$apply(function () {
                    vm.latitude = event.latLng.lat();
                    vm.longitude = event.latLng.lng();
                });
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
        }
        //mapa

        init();
    }
})();