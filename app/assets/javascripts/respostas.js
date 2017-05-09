(function () {
    angular
        .module('pdApp')
        .constant('$Respostas', {
            "000": "OK",
            //cadastro pessoa
            "101": "Campo obrigatório não preenchido",
            "102": "Nome já existente",
            "103": "Senha inválida",
            "104": "Usuário já existente",
            "105": "Matrícula já cadastrada",
            "106": "Confirmação de senha errada",
            "107": "Cadastro inválido",
            //login
            "201": "Usuário ou senha inválido",
            "202": "Usuário ou senha inválido",
            "203": "Campo(s) obrigatório(s) não preenchido",
            "204": "MAC não cadastrado",
            //logado
            "301": "Relatório indisponível",
            "302": "Relatório inexistente",
            "303": "Nenhum evento cadastrado para hoje",
            "304": "Fora de dia ou horário válidos",
            //registrar ponto
            "311": "QRcode ou evento inválido",
            "312": "Evento já iniciado ou usuário atrasado",
            "313": "Fora de horário / Muito depois dos eventos",
            "314": "Não cadastrado no evento",
            "315": "Evento expirado",
            //alteração do perfil
            "321": "Alteração não concluída por erro de conexão",
            //cadastro de evento
            "331": "Horário inválido",
            "332": "Data de evento inválido",
            "333": "Usuário não tem privilégio",
            "334": "Campo(s) obrigatório(s) não preenchido",
            "335": "Horário de início ou termino não informados ou inválidos",
            //conexão
            "401": "Erro de conexão (sem internet)",
            "402": "Tempo limite atingido",
            "403": "Erro interno do servidor",
            //autenticação
            "501": "Autenticação falhou",
            "502": "Usuário ou senha inválidos",
        })
}());