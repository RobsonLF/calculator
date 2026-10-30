const btnAddDadosFiada = document.querySelector('#btnAddDadosFiada');
const btnLimparDadosFiada = document.querySelector('#btnLimparDadosFiada');
const btnAddTijolo = document.querySelector('#btnAddTijolos');
const btnLimparDadosTijolo = document.querySelector('#btnLimparTijolos');
const btnCalcular = document.querySelector('#CalcularComposicao');
const btnLimparCalculo = document.querySelector('#LimparComposicao');
const inputCordaInterna = document.querySelector('#cordaInterna');


btnAddDadosFiada.addEventListener('click',AddDadosTabelaDiam);

btnLimparDadosFiada.addEventListener('click', LimparDadosTabelaDiam);
btnAddTijolo.addEventListener('click',AddTijolo);
btnLimparDadosTijolo.addEventListener('click',limparTabelaTijolos);
inputCordaInterna.addEventListener('blur', function(){
    btnAddTijolo.focus();
});
btnCalcular.addEventListener('click',calcularComp);

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
    const celCheckbox = linha.insertCell();
    const newCheckbox  = document.createElement('input');

    newCheckbox.type = 'checkbox';
    newCheckbox.id = 'checksecondary';
    newCheckbox.className = 'check theme-secondary';
    newCheckbox.setAttribute('aria-label', `Selecionar tijolo ${indice}`);

    celCheckbox.appendChild(newCheckbox);

    [indice,
        cordaExt.value,
        cordaInt.value,
        fechamentoTijolo.toFixed(2),
        anguloTijolo.toFixed(2)
    ].forEach(valor =>{
        const celula = linha.insertCell();
        celula.textContent = valor;
    });
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

function limparTabelaTijolos(){
    const checkboxMarcado = document.querySelectorAll('#tabelaTijolo tbody input[type="checkbox"]:checked');
    const tabela = document.querySelector('#tabelaTijolo');
    if (checkboxMarcado.length ===0){
        alert("Nenhuma linha selecionada para exclusão!");
        return;
    }

    checkboxMarcado.forEach(checkbox => {
        const linha = checkbox.closest('tr');
        linha.remove();
    });

    Array.from(tabela.tBodies[0].rows).forEach((linha, indice) => {
        linha.cells[1].textContent = indice + 1;
        linha.cells[0].querySelector('input').setAttribute('aria-label', `Selecionar tijolo ${indice + 1}`);
    });
}
//###############################################CALCULO DE COMP##############################################

function calcularComp(){
    const tabelaDadosFiada = document.querySelector('#tabelaDiam');
    const espessura = parseFloat(tabelaDadosFiada.tBodies[0].rows[0].cells[1].textContent);
    const diamExt = parseFloat(tabelaDadosFiada.tBodies[0].rows[0].cells[2].textContent);
    const diamInt = parseFloat(tabelaDadosFiada.tBodies[0].rows[0].cells[3].textContent);
    const ang = parseFloat(tabelaDadosFiada.tBodies[0].rows[0].cells[4].textContent);
    const junta = parseFloat(tabelaDadosFiada.tBodies[0].rows[0].cells[5].textContent);

    const tabelaTijolos = document.querySelector('#tabelaTijolo');
    const nlinhas = tabelaTijolos.tBodies[0].rows;
    let indice = 0
    if (nlinhas.length > 1){
        for (let cont = 0; cont < nlinhas.length; cont++){
            for (let cont1 = cont+1;cont1 < nlinhas.length; cont1++){
                const tijACordaExt = parseFloat(tabelaTijolos.tBodies[0].rows[cont].cells[2].textContent);
                const tijACordaInt = parseFloat(tabelaTijolos.tBodies[0].rows[cont].cells[3].textContent);
                const tijBCordaExt = parseFloat(tabelaTijolos.tBodies[0].rows[cont1].cells[2].textContent);
                const tijBCordaInt = parseFloat(tabelaTijolos.tBodies[0].rows[cont1].cells[3].textContent);
                indice += 1;
                const { qtdTijA, qtdTijB } = calculo(
                    espessura,
                    diamExt,
                    diamInt,
                    ang,
                    junta,
                    tijACordaExt,
                    tijACordaInt,
                    tijBCordaExt,
                    tijBCordaInt
                );
                if (qtdTijA<= 0 || qtdTijB <- 0){
                    inserirCardVermelho({
                        tijolo1:`${tijACordaExt} - ${tijACordaInt}`,
                        tijolo2:`${tijBCordaExt} - ${tijBCordaInt}`,
                        qtA: qtdTijA,
                        qtB: qtdTijB,
                        header: `Arranjo ${indice}`
                    });
                }else{
                    inserirCardVerde({
                        tijolo1:`${tijACordaExt} - ${tijACordaInt}`,
                        tijolo2:`${tijBCordaExt} - ${tijBCordaInt}`,
                        qtA: qtdTijA,
                        qtB: qtdTijB,
                        header: `Arranjo ${indice}`
                    });
                }
            }
        }
    }
}
function inserirCardVerde({tijolo1, tijolo2, qtA, qtB, header}){
    const grid = document.querySelector('.cards-grid');
    if (!grid){
        console.log("Conteiner .cards-grid não encontrado. Verifique o HTML.");
        return;
    }
    const card = document.createElement('div');
    card.className = "card border-success mb-3";
    card.style.maxWidth = "15rem";

    card.innerHTML = `
        <div class="card-header text-success bg-transparent border-success">${header}</div>
        <div class="card-body text-success">
        <h5 class="card-title">${tijolo1} - Qtd.: ${qtA}</h5> <br>
        <h5 class="card-title">${tijolo2} - Qtd.: ${qtB}</h5>
    </div>
    `;
    grid.appendChild(card);
}
function inserirCardVermelho({tijolo1, tijolo2, qtA, qtB, header}){
    const grid = document.querySelector('.cards-grid');
    if (!grid){
        console.log("Conteiner .cards-grid não encontrado. Verifique o HTML.");
        return;
    }
    const card = document.createElement('div');
    card.className = "card border-danger mb-3";
    card.style.maxWidth = "15rem";

    card.innerHTML = `
        <div class="card-header text-danger bg-transparent border-danger">${header}</div>
        <div class="card-body text-danger">
            <h5 class="card-title">${tijolo1} - Qtd.: ${qtA}</h5> <br>
            <h5 class="card-title">${tijolo2} - Qtd.: ${qtB}</h5>
        </div>
    `;
    grid.appendChild(card);
}
function calculo(esp, dE, dI, ang, jun, tijACordaE, tijACordaI, tijBCordaE, tijBCordaI ){
    const pi = Math.PI;
    let qtdTijA = (pi * ( dI* ( tijBCordaE + jun ) - dE * ( tijBCordaI + jun ))) / (( tijBCordaE + jun ) * (tijACordaI + jun) - ( tijACordaE + jun) * (tijBCordaI + jun));
    let qtdTijB = ( dE * pi - ( qtdTijA ) * (tijACordaE + jun)) / (tijBCordaE + jun);

    qtdTijA = qtdTijA * ang / 360;
    qtdTijB = qtdTijB * ang / 360;

    return {qtdTijA: qtdTijA.toFixed(1),qtdTijB: qtdTijB.toFixed(1) };
}
