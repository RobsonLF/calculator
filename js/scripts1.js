const btnAddDadosFiada = document.querySelector('#btnAddDadosFiada');
const btnLimparDadosFiada = document.querySelector('#btnLimparDadosFiada');

btnAddDadosFiada.addEventListener('click',AddDadosTabelaDiam)


function AddDadosTabelaDiam(){
    const espessura = parseFloat(document.querySelector('#espessura').value);
    const diamExterno = parseFloat(document.querySelector('#diamExt').value);
    const angulo = parseFloat(document.querySelector('#angulo').value);
    const junta = parseFloat(document.querySelector('#junta').value);
    const tabela = document.querySelector('tabelaDiam');

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

}

