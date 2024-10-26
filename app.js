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

    pesquisar(despesa) {
        let despesasFiltradas = Array();
        despesasFiltradas = this.recuperaTodosRegistros();
        console.log(despesa);
        console.log(despesasFiltradas);

        //ano
        if(despesa.ano != '') {
            console.log('filtro de ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
        }
        //mes
        if(despesa.mes != '') {
            console.log('filtro de mês')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
        }
        //dia
        if(despesa.dia != '') {
            console.log('filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
        }
        //tipo
        if(despesa.tipo != '') {
            console.log('filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
        }
        //decricao
        if(despesa.descricao != '') {
            console.log('filtro de descrição')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
        }
        //valor
        if(despesa.valor != '') {
            console.log('filtro de valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
        }

        console.log(despesasFiltradas);
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

        //limpando campos
        function limpaCampos() {
            ano.value = '';
            mes.value = '';
            dia.value = '';
            tipo.value = '';
            descricao.value = '';
            valor.value = '';
        }
        limpaCampos();


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
    let listaDespesas = document.getElementById('listaDespesas');

    /*
    <tr>
        <td>27/10/2024</td>
        <td>Lazer</td>
        <td>Netflix</td>
        <td>59.90</td>
    </tr>
    */

   //percorendo o array despesas, listando cadas despesa de forma dinamica
   despesas.forEach(function(d) {

        //cria uma linha da tabela (tr)
       let linha = listaDespesas.insertRow();

       //ajustar o tipo
       switch(d.tipo) {
           case '1': d.tipo = 'Alimentação';
               break;
           case '2': d.tipo = 'Educação';
               break;
           case '3': d.tipo = 'Lazer';
               break;
           case '4': d.tipo = 'Saúde';
               break;                     
            }
            
            //criar colunas da tabela(td)
            linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}` ;
            linha.insertCell(1).innerHTML = d.tipo;
            linha.insertCell(2).innerHTML = d.descricao;
            linha.insertCell(3).innerHTML = d.valor;            
   });
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);    

    let despesas = bd.pesquisar(despesa);

    // recupera o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = ''

    //percorendo o array despesas

    despesas.forEach(function(d) {    
        //cria uma linha de consulta (tr)
        let linha = listaDespesas.insertRow();

        //ajustar o tipo
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação';
                break;
            case '2': d.tipo = 'Educação';
                break;
            case '3': d.tipo = 'Lazer';
                break;
            case '4': d.tipo = 'Saúde';
                break;                     
        }
            
            //criar colunas da tabela da consulta(td)
            linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}` ;
            linha.insertCell(1).innerHTML = d.tipo;
            linha.insertCell(2).innerHTML = d.descricao;
            linha.insertCell(3).innerHTML = d.valor;            
    });
    
}