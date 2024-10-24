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

    recuperaTodosRegistros() {
        let despesas = Array();

        let id = localStorage.getItem('id');

        //recupera todas as despesas cadastradas em localStorage
        for(let i = 1; i <= id; i++) {

            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i));


            //verificar a possibilidade de haver itens que foram pulados/removidos
            //nestes casos nós vamos pular esses itens
            if(despesa === null) {
                continue
            }

            despesas.push(despesa);
        }
        return despesas;
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
        $('#modalRegistraDespesa').modal('show');
        
        function criaDialogSucesso(){
            let textoSucesso = 'Despesa adicionada com sucesso';
            let textBtn = 'Voltar';
            document.getElementById('titulo_modal').innerHTML = textoSucesso;
            document.getElementById('modal_titulo_div').className = 'modal-header text-success';
            document.getElementById('botao').innerHTML = textBtn;
            document.getElementById('botao').className = 'btn btn-success';
        }
        criaDialogSucesso();
    } else {
        //dialog de erro
        $('#modalRegistraDespesa').modal('show')
    //---------------------------------------------------------


        //  exibe a caixa de dialogo de gravação com sucesso
        function criaDialogErro(){
            let textoErro = 'Erro na gravação';
            let textBtn = 'Voltar e corrigir';
            document.getElementById('titulo_modal').innerHTML = textoErro;
            document.getElementById('botao').innerHTML = textBtn;
            document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
            document.getElementById('botao').className = 'btn btn-danger';


        }
        criaDialogErro();
    }    
}


//acionar o modal de erro de gravação
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus');
  })


//método para carregar lista de despesas

function carregarListaDespesas() {

    let despesas = Array()

    despesas = bd.recuperaTodosRegistros()

    // recupera o elemento tbody da tabela
    var listaDespesas = document.getElementById('listaDespesas');

    /*
    <tr>
        <td>27/10/2024</td>
        <td>Lazer</td>
        <td>Netflix</td>
        <td>59.90</td>
    </tr>
    */

   //percorendo o array despesas, listando cadas despensa de forma dinamica
   despesas.forEach(function(d) {

        //cria uma linha da tabela
        listaDespesas.insertRow();
   })

}