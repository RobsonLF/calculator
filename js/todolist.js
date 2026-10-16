const inputTarefa = document.querySelector('#input-tarefa');
const btnTarefa = document.querySelector('#btn-tarefa');
const tarefas = document.querySelector('.tarefas');
//###############################AÇÕES - EVENTOS####################################
//pega o evento do botão de criar tarefa
btnTarefa.addEventListener('click',function(){
    //verifica se o inputTarefa tem algum valor ou não.
    if (!inputTarefa.value)return; // se não tem valor se sai da funcção
    //se tem valor e passa esse valor para a função criaTarefa
    criaTarefa(inputTarefa.value);
    //depois de executar o criaTarefa e limpa os valores do inputTarefa
    limparInputTarefa();
});
document.addEventListener('click',function(e){
//funçao para capturar o evendo click do botão de apagar tarefa que inda não foi criado
    const elemento = e.target;
    if (elemento.classList.contains('apagar')){
        elemento.closest('li').remove();
        salvarTarefas();
    }
});
inputTarefa.addEventListener('keypress',function(e){
    if (e.keyCode===13){
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
        limparInputTarefa();
    };
});
document.addEventListener('change', function (e) {
    if (e.target.classList.contains('check')) {
        const label = e.target.closest('li').querySelector('label');
        label.classList.toggle('text-decoration-line-through', e.target.checked);
        salvarTarefas();
    }
});
//###############################FUNÇÕES####################################
function criaTarefa(textoInput){
    //função para criar a li na lista do html
    const li = criaLi();
    //Inseri o texto do inputTarefa no li da lista
    li.querySelector('label').textContent = textoInput;
    //add o li com filho do tarefas
    tarefas.appendChild(li);
    
        
    //Salva o dado no localstorage do navegador
    salvarTarefas();
};
function limparInputTarefa(){
    inputTarefa.value = '';
    inputTarefa.focus();
};
function criaLi(){
    const li = document.createElement('li');
    const div = document.createElement('div');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const buttonApagar = document.createElement('button');
    //seta atributos para as tags html que serão criadas e inseridas na ul
    label.textContent = '';
    buttonApagar.textContent = 'Apagar';
    li.setAttribute('class','list-group-item');
    div.setAttribute('class','form-field d-flex align-items-center gap-2');
    checkbox.setAttribute('type','checkbox');
    checkbox.setAttribute('value','');
    checkbox.setAttribute('id','firstCheckboxStretched');
    checkbox.setAttribute('class','check');
    label.setAttribute('class','mb-0 flex-grow-1 text-start');
    label.setAttribute('for','firstCheckboxStretched');
    buttonApagar.setAttribute('type','button');
    buttonApagar.setAttribute('class','btn-outline theme-danger apagar');

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(buttonApagar);
    li.appendChild(div);
    return li;
};
function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];
    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas',tarefasJSON);
};
function addTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
};
addTarefasSalvas();
