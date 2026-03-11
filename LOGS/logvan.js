// ==============================
// SISTEMA DE VANTAGENS / DESVANTAGENS
// ==============================

// Injeta vantagem ou desvantagem na ficha
function injectTrait(containerId, nome, custo, desc) {

    const container = document.getElementById(containerId);

    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-accordion auto-race';

    itemDiv.innerHTML = `
        <div class="item-header" onclick="toggleAccordion(this)">
            <span class="arrow">▼</span>
            <span class="item-title">${nome}</span>
            <span class="item-cost-display">${custo} Pts</span>
        </div>

        <div class="item-content">
            <div class="item-description-text">${desc}</div>

            <div class="item-footer">
                <button class="btn-action-remove" onclick="removeItem(this)">Remover</button>
                <button class="btn-action-edit" onclick="editItem(this)">Editar</button>
            </div>
        </div>

        <input type="hidden" class="item-cost" value="${custo}">
    `;

    container.appendChild(itemDiv);
}

// Adicionar nova vantagem/desvantagem
function addNewItem(containerId) {

    const container = document.getElementById(containerId);

    const formDiv = document.createElement('div');
    formDiv.className = 'item-accordion item-form-container';

    const isDesvantagem = containerId === 'desvantagens-list';

    const listaParaUsar =
        isDesvantagem ? listaDesvantagens : listaVantagens;

    let options = '<option value="">-- Selecione da Biblioteca --</option>';

    for (let nome in listaParaUsar) {
        options += `<option value="${nome}">${nome} (${listaParaUsar[nome].custo} Pts)</option>`;
    }

    formDiv.innerHTML = `
        <div class="item-form">

            <label style="font-size:0.7em;color:#888;">BUSCAR NA BIBLIOTECA</label>

            <select onchange="fillFormFromLibrary(this,'${containerId}')" style="margin-bottom:10px;">
                ${options}
            </select>

            <div style="display:flex; gap:10px;">
                <input type="text" placeholder="Nome da Habilidade" class="edit-name" style="flex:2">
                <input type="number" placeholder="Pts" class="edit-cost" style="flex:1">
            </div>

            <textarea placeholder="Descrição..." class="edit-desc" rows="3"></textarea>

            <button class="btn-save-item" onclick="saveItem(this)">SALVAR</button>

        </div>
    `;

    container.appendChild(formDiv);
}

// Salvar item
function saveItem(btn) {

    const form = btn.closest('.item-form');
    const container = btn.closest('.item-accordion');

    const name = form.querySelector('.edit-name').value || "Sem Nome";
    const cost = form.querySelector('.edit-cost').value || "0";
    const desc = form.querySelector('.edit-desc').value || "";

    container.classList.remove('item-form-container');

    container.innerHTML = `
        <div class="item-header" onclick="toggleAccordion(this)">
            <span class="arrow">▼</span>
            <span class="item-title">${name}</span>
            <span class="item-cost-display">${cost} Pts</span>
        </div>

        <div class="item-content">
            <div class="item-description-text">${desc}</div>

            <div class="item-footer">
                <button class="btn-action-remove" onclick="removeItem(this)">Remover</button>
                <button class="btn-action-edit" onclick="editItem(this)">Editar</button>
            </div>
        </div>

        <input type="hidden" class="item-cost" value="${cost}">
    `;

    updateAll();
}

// Biblioteca automática
function fillFormFromLibrary(select, containerId) {

    const nome = select.value;
    if (!nome) return;

    const form = select.closest('.item-form');

    const listaParaUsar =
        containerId === 'desvantagens-list'
        ? listaDesvantagens
        : listaVantagens;

    const item = listaParaUsar[nome];

    if (item) {

        form.querySelector('.edit-name').value = nome;
        form.querySelector('.edit-cost').value = item.custo;
        form.querySelector('.edit-desc').value = item.desc;

    }
}