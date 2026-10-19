const btnAddDadosFiada = document.querySelector('#btnAddDadosFiada');
const btnLimparDadosFiada = document.querySelector('#btnLimparDadosFiada');
const btnAddTijolo = document.querySelector('#btnAddTijolos');
const btnLimparDadosTijolo = document.querySelector('#btnLimparTijolos');

btnAddDadosFiada.addEventListener('click',AddDadosTabelaDiam);
btnLimparDadosFiada.addEventListener('click', LimparDadosTabelaDiam);
btnAddTijolo.addEventListener('click',AddTijolo);
//btnLimparDadosTijolo.addEventListener('click',LimparDadosTijolo);

//###############################################TABELA DE DIAMETROS##############################################
function AddDadosTabelaDiam(){
    const espessura = parseFloat(document.querySelector('#espessura').value);
    const diamExterno = parseFloat(document.querySelector('#diamExt').value);
    const angulo = parseFloat(document.querySelector('#angulo').value);
    const junta = parseFloat(document.querySelector('#junta').value);
    const tabela = document.querySelector('#tabelaDiam');
    const linha = tabela.tBodies[0].rows[0];
    
    if (isNaN(espessura)){
        window.alert('Por favor, insira um valor numérico válido para a espessura.');
        document.querySelector('#espessura').focus();
        return;
    }
    if (isNaN(diamExterno)){
        window.alert('Por favor, insira um valor numérico válido para ØExterno.');
        document.querySelector('#diamExt').focus();
        return;
    }
    if (isNaN(angulo)){
        window.alert('Por favor, insira um valor numérico válido para ângulo.');
        document.querySelector('#angulo').focus();
        return;
    }
    if (isNaN(junta)){
        document.querySelector('#junta').value = 0;
        return;
    }
    const diamInterno = diamExterno - (2*espessura);
    if (diamInterno <= 0){
        window.alert('O diâmetro interno calculado é inválido. Verifique os valores de espessura e diâmetro externo.');
        document.querySelector('#espessura').value = '';
        document.querySelector('#diamExt').value = '';
        document.querySelector('#espessura').focus();
        return;
    }
    
    
    linha.cells[1].innerText = espessura;
    linha.cells[2].innerText = diamExterno;
    linha.cells[3].innerText = diamInterno;
    linha.cells[4].innerText = angulo;
    linha.cells[5].innerText = junta;
}
function LimparDadosTabelaDiam(){
    const tabela = document.querySelector('#tabelaDiam');
    const linha = tabela.tBodies[0].rows[0];
    document.querySelector('#espessura').value = '';
    document.querySelector('#diamExt').value = '';
    document.querySelector('#angulo').value = '';
    document.querySelector('#junta').value = '';
    document.querySelector('#espessura').focus();
    linha.cells[1].innerText = '-';
    linha.cells[2].innerText = '-';
    linha.cells[3].innerText = '-';
    linha.cells[4].innerText = '-';
    linha.cells[5].innerText = '-';
    return;
}
//###############################################TABELA DE FORMATOS##############################################

function AddTijolo(){
    let tabela = document.querySelector('#tabelaTijolo');
    const espFiada = parseFloat(document.querySelector('#espessura').value);
    const juntaFiada = parseFloat(document.querySelector('#junta').value);
    
    const cordaExterna = document.querySelector('#cordaExterna');
    const cordaInterna = document.querySelector('#cordaInterna');
    const indice = tabela.rows.length;
    
    let fechamentoTijolo;
    let anguloTijolo;

    if (isNaN(parseFloat(cordaExterna.value))){
        window.alert('Por favor, insira um valor numérico válido para a corda externa.');
        document.querySelector('#cordaExterna').focus();
        return;
    }
    if (isNaN(parseFloat(cordaInterna.value))){
        window.alert('Por favor, insira um valor numérico válido para a corda interna.');
        document.querySelector('#cordaInterna').focus();
        return;
    }
    if((parseFloat(cordaExterna.value) - parseFloat(cordaInterna.value)) == 0){
        fechamentoTijolo = 0;
        inserirLinha(tabela, indice, cordaExterna, cordaInterna ,fechamentoTijolo,0);
    }else if((parseFloat(cordaExterna.value) - parseFloat(cordaInterna.value)) < 0){
        window.alert('A corda interna deve ser menor que a corda externa. Verifique os valores inseridos.');
        cordaExterna.value = '';
        cordaInterna.value = '';
        cordaExterna.focus();
        return;
    }
    else{
        fechamentoTijolo = calcularFechamento(espFiada, juntaFiada, parseFloat(cordaExterna.value), parseFloat(cordaInterna.value));
        anguloTijolo = calculoAnguloTijolo(espFiada, parseFloat(cordaExterna.value), parseFloat(cordaInterna.value));
        inserirLinha(tabela, indice, cordaExterna, cordaInterna ,fechamentoTijolo, anguloTijolo);
    }
}
function calcularFechamento(esp, junta, cordaExt, cordaInt){
    let fechamento = (esp*2)*(cordaExt + junta)/(cordaExt - cordaInt);
    return fechamento;
}
function inserirLinha(tabela, indice, cordaExt, cordaInt, fechamentoTijolo,anguloTijolo){
    
    let linha = document.createElement('tr');

    linha.innerHTML = `
    <td>${indice}</td>
    <td>${cordaExt.value}</td>
    <td>${cordaInt.value}</td>
    <td>${fechamentoTijolo.toFixed(2)}</td>
    <td>${anguloTijolo.toFixed(2)}</td>
    `;
    tabela.tBodies[0].appendChild(linha);
    cordaExt.value = '';
    cordaInt.value  ='';
    cordaExt.focus();
}
function calculoAnguloTijolo(esp, cordaExt, cordaInt){
    const pi = 3.141593;
    let ang = (((cordaExt-cordaInt)/esp)*(180/pi));
    return ang;
}

