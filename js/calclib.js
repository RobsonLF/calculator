const btnAddDadosFiada = document.querySelector('#btnAddDadosFiada');
const btnLimparDadosFiada = document.querySelector('#btnLimparDadosFiada');

btnAddDadosFiada.addEventListener('click',AddDadosTabelaDiam);
btnLimparDadosFiada.addEventListener('click', LimparDadosTabelaDiam);

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

/*
    const espessura = parseFloat(document.querySelector('#espessura').value);
    const diamExterno = parseFloat(document.querySelector('#diamExt').value);
    const angulo = parseFloat(document.querySelector('#angulo').value);
    const junta = parseFloat(document.querySelector('#junta').value);
    const tabela = document.querySelector('#tabelaDiam');
    const linha = tabela.tBodies[0].rows[0];
*/