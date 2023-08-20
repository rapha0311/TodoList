const btnAdicionar = document.getElementById('btnAdicionar');
const inputTarefa = document.getElementById('novaTarefa');
const listaTarefas = document.getElementById('listaTarefas');
const subTarefasContainer = document.getElementById('subTarefasContainer');
const subTarefasInput = document.getElementById('subTarefasInput');
const subTarefasLista = document.getElementById('subTarefasLista');
let tarefaSelecionada = null; // Variável para armazenar a tarefa selecionada
let botaoSubTarefaCriado = false; // Variável para controlar se o botão já foi criado

btnAdicionar.addEventListener('click', () => {
    const tarefa = inputTarefa.value.trim();
    if (tarefa !== '') {
        const li = document.createElement('li');
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
            event.stopPropagation(); // Impede que o evento de clique seja propagado para o li
            listaTarefas.removeChild(li);
            if (tarefaSelecionada === li) {
                subTarefasContainer.style.display = 'none';
                tarefaSelecionada = null;
            }
        });

        li.addEventListener('click', (event) => {
            if (event.target !== checkbox) {
                tarefaSelecionada = li;
                subTarefasContainer.style.display = 'block'; // Abre o contêiner ao clicar no texto da tarefa
                subTarefasInput.value = ''; // Limpa o campo de entrada de subtarefas
                subTarefasLista.innerHTML = ''; // Limpa a lista de subtarefas

                const subTarefasUl = document.createElement('ul'); // Lista de subtarefas
                subTarefasUl.className = 'sub-tarefas-lista'; // Aplicar estilo

                subTarefasLista.appendChild(subTarefasUl); // Anexa a nova lista de subtarefas

                const botaoSubTarefa = document.createElement('button');
                botaoSubTarefa.innerText = 'Adicionar Sub Tarefa';
                botaoSubTarefa.className = 'btn-adicionar-sub-tarefa'; // Adicionar a classe ao botão

                botaoSubTarefa.addEventListener('click', () => {
                    const subTarefa = subTarefasInput.value.trim();
                    if (subTarefa !== '') {
                        const subLi = document.createElement('li');
                        subLi.textContent = subTarefa;
                        subTarefasUl.appendChild(subLi); // Anexa a nova subtarefa na lista correta
                        subTarefasInput.value = '';
                    }
                });

                subTarefasContainer.appendChild(botaoSubTarefa); // Anexa o botão ao contêiner de subtarefas
            }
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(tarefa));
        li.appendChild(iconeExcluir);
        listaTarefas.appendChild(li);
        inputTarefa.value = '';
    }
});

// Função para salvar as subtarefas como subitens da tarefa selecionada
function salvarSubtarefas() {
    if (tarefaSelecionada) {
        const subtarefas = subTarefasLista.getElementsByClassName('sub-tarefas-lista');
        tarefaSelecionada.appendChild(subtarefas[0].cloneNode(true));
        subTarefasContainer.style.display = 'none';
        tarefaSelecionada = null;
        subTarefasInput.value = ''; // Limpa o campo de entrada de subtarefas

        // Remover botões "Adicionar Sub Tarefa" existentes
        const botoesSubTarefa = subTarefasContainer.getElementsByClassName('btn-adicionar-sub-tarefa');
        while (botoesSubTarefa.length > 0) {
            botoesSubTarefa[0].parentNode.removeChild(botoesSubTarefa[0]);
        }
    }
}

document.getElementById('btnSalvarSubtarefas').addEventListener('click', salvarSubtarefas);






























