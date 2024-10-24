class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados(){
        for(let i in this) { //o método for in recuperar as chaves de um determinado objeto, e é colocado dentro de uma variável//o método for in recuperar as chaves de um determinado objeto, e é colocado dentro de uma variável
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            } 
        } 
        return true;
    }
}


class Bd {

    constructor() {
        let id = localStorage.getItem('id')
        if(id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id'); //getItem faz a recuperação de um dado no Localstorage
        return parseInt(proximoId) + 1;
    }

    gravar(d) {
        let id = this.getProximoId();

        localStorage.setItem(id, JSON.stringify(d));

        localStorage.setItem('id', id);
    }
}

let bd = new Bd();


function cadastrarDespesa() {
    
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');
    
    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    );


    if(despesa.validarDados()) {
        bd.gravar(despesa);
        //dialog de sucesso
        $('#sucessoGravacao').modal('show')
    } else {
        //dialog de erro
        $('#erroGravacao').modal('show')
    }    
}


//acionar o modal de erro de gravação
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })


