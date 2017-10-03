(function () {
    angular
        .module('pdApp')
        .controller('CadastroEventoController', CadastroEventoController);

    CadastroEventoController.$inject = ['$scope', '$log', 'EventoService', 'LoginService', 'GeoService', 'sessao', '$Respostas', '$window'];

    function CadastroEventoController($scope, $log, EventoService, LoginService, GeoService, sessao, $Repostas, $window) {
        var vm = this; //view model
        vm.botao = false;
        vm.cadastrarEvento = cadastrarEvento;
        vm.dataInicio;
        vm.dataFim;
        vm.descricao;
        vm.horaInicio;
        vm.horaFim;
        vm.imprime = imprime;
        vm.imagem;
        vm.local;
        vm.latitude = -7.205858600000001;
        vm.longitude = -39.311446;
        vm.mensagem;
        vm.nome;
        vm.QR = '';
        vm.tipo;
        vm.sessao = sessao;

        function cadastrarEvento() {
            if (vm.form.$invalid) {
                alert("Preencha os campos corretamente.");
            }
            else {
                vm.botao = true;
                vm.horaInicio.setFullYear(2000);
                vm.horaFim.setFullYear(2000);
                EventoService.enviarEvento(vm.nome, vm.tipo, vm.dataInicio, vm.dataFim,
                    vm.horaInicio, vm.horaFim, vm.descricao, vm.local, vm.QR,
                    vm.latitude, vm.longitude)
                    .then(function (data) {
                        console.log(data);
                        vm.mensagem = '';
                        switch (data.erro) { // definir erro pra cada campo
                            case "000":
                                console.log(data.body);
                                vm.mensagem = "Evento criado";
                                //limpar();
                                $window.location.href = "#!/listaEvento/";
                                break;
                            default:
                                vm.mensagem = 'Erro: ' + $Repostas[data.erro];
                                console.log(data.status);
                                switch (data.erro) {
                                    case "102":
                                        vm.nome = '';
                                    case "501":
                                        console.log("faça login");
                                        $window.location.href = "#!/login";
                                        LoginService.apagar();
                                    //deslogar
                                }
                                break;
                        } // end switch
                        vm.botao = false;
                    }); //end then
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

        //isso é apenas um teste de observador - remover em versão final
        $scope.$watch('vm.horaFim', function (current, original) {
            $log.info('vm.horaFim was %s', original);
            $log.info('vm.horaFim is now %s', current);
        });

        var init = function () {
            if (vm.sessao.nome == '') {
                console.log("faça login");
                $window.location.href = "#!/login/";
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
                    },
                    function (erro) {
                        console.log(erro);
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

            //mapa
            var map;

            function initialize() {
                var myLatlng = new google.maps.LatLng(vm.latitude, vm.longitude);

                var myOptions = {
                    zoom: 20,
                    center: myLatlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

                var marker = new google.maps.Marker({
                    draggable: true,
                    position: myLatlng,
                    map: map,
                    title: "Sua localização"
                });

                google.maps.event.addListener(map, 'click', function (event) {
                    marker.setPosition(event.latLng);
                    marker.setTitle("" + event.latLng);
                    console.log(event.latLng.lat());
                    console.log(event.latLng.lng());
                    vm.latitude = event.latLng.lat();
                    vm.longitude = event.latLng.lng();
                    //alert(event.latLng);
                });
            }

            google.maps.event.addDomListener(window, 'load', initialize);
            //mapa



        }

        init();



    }
})();