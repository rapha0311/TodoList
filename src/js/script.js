const btnAdicionar = document.getElementById('btnAdicionar');
const inputTarefa = document.getElementById('novaTarefa');
const listaTarefas = document.getElementById('listaTarefas');
const subTarefasContainer = document.getElementById('subTarefasContainer');
const subTarefasInput = document.getElementById('subTarefasInput');
const subTarefasLista = document.getElementById('subTarefasLista');
let tarefaSelecionada = null;
let botaoSubTarefaCriado = false;

btnAdicionar.addEventListener('click', () => {
    const tarefa = inputTarefa.value.trim();
    if (tarefa !== '') {
        const li = document.createElement('a');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const iconeExcluir = document.createElement('span');
        iconeExcluir.className = 'excluir-tarefa';
        iconeExcluir.innerHTML = '&times;';
        iconeExcluir.style.display = 'none';

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.classList.add('tarefa-concluida');
                iconeExcluir.style.display = 'inline';
            } else {
                li.classList.remove('tarefa-concluida');
                iconeExcluir.style.display = 'none';
            }
        });

        iconeExcluir.addEventListener('click', (event) => {
            event.stopPropagation();
            listaTarefas.removeChild(li);
            if (tarefaSelecionada === li) {
                subTarefasContainer.style.display = 'none';
                tarefaSelecionada = null;
            }
        });

        li.addEventListener('click', (event) => {
            if (event.target !== checkbox) {
                tarefaSelecionada = li;
                subTarefasContainer.style.display = 'block';
                subTarefasInput.value = '';
                subTarefasLista.innerHTML = '';

                const subTarefasUl = document.createElement('ul');
                subTarefasUl.className = 'sub-tarefas-lista';

                subTarefasLista.appendChild(subTarefasUl);

                const botaoSubTarefa = document.createElement('button');
                botaoSubTarefa.innerText = 'Adicionar Sub Tarefa';
                botaoSubTarefa.className = 'btn-adicionar-sub-tarefa';

                botaoSubTarefa.addEventListener('click', () => {
                    const subTarefa = subTarefasInput.value.trim();
                    if (subTarefa !== '') {
                        const subLi = document.createElement('li');
                        const subCheckbox = document.createElement('input');
                        subCheckbox.type = 'checkbox';
                        subLi.appendChild(subCheckbox);
                        subLi.appendChild(document.createTextNode(subTarefa));
                        subTarefasUl.appendChild(subLi);
                        subTarefasInput.value = '';
                        botaoSubTarefaCriado = true;
                    }
                });

                subTarefasContainer.appendChild(botaoSubTarefa);

            }
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(tarefa));
        li.appendChild(iconeExcluir);
        listaTarefas.appendChild(li);
        inputTarefa.value = '';
    }
});


function salvarSubtarefas() {
    if (tarefaSelecionada) {
        const subtarefas = subTarefasLista.getElementsByClassName('sub-tarefas-lista');
        tarefaSelecionada.appendChild(subtarefas[0].cloneNode(true));
        subTarefasContainer.style.display = 'none';
        tarefaSelecionada = null;
        subTarefasInput.value = '';


        const botoesSubTarefa = subTarefasContainer.getElementsByClassName('btn-adicionar-sub-tarefa');
        while (botoesSubTarefa.length > 0) {
            botoesSubTarefa[0].parentNode.removeChild(botoesSubTarefa[0]);
        }
    }
}

document.getElementById('btnSalvarSubtarefas').addEventListener('click', salvarSubtarefas);






























