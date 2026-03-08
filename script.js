let stats = {
    pv: { current: 5, max: 5 },
    pm: { current: 5, max: 5 }
};

// Custo da raça/vantagem única selecionada
let custoVantagemUnica = 0;

// Seletores fixos
const attrInputs = document.querySelectorAll('.attr-input');
const resInput = document.getElementById('res-input');
const totalPontosSpan = document.getElementById('total-pontos');
const pvCurrentInput = document.getElementById("pv-current");
const pmCurrentInput = document.getElementById("pm-current");


function initVantagensUnicas() {
    const select = document.getElementById('select-vantagem-unica');
    if (!select) return;

    for (let raca in listaVantagensUnicas) {
        let opt = document.createElement('option');
        opt.value = raca;
        opt.innerHTML = `${raca} (${listaVantagensUnicas[raca].custo} Pts)`;
        select.appendChild(opt);
    }
}

function applyUniqueAdvantage() {

    const select = document.getElementById('select-vantagem-unica');
    const racaNome = select.value;

    // LIMPA vantagens de raça antigas
    document.querySelectorAll(".auto-race").forEach(e => e.remove());

    if (!racaNome) {
        custoVantagemUnica = 0;
        updateAll();
        return;
    }

    const raca = listaVantagensUnicas[racaNome];
    custoVantagemUnica = raca.custo;

    raca.traits.forEach(trait => {

        const containerId =
            trait.tipo === 'vantagem'
            ? 'vantagens-list'
            : 'desvantagens-list';

        injectTrait(containerId, trait.nome, trait.custo, trait.desc);

    });

    updateAll();
}

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

function updateAll() {
    let total = 0;

    // 1. Soma atributos
    attrInputs.forEach(input => {
        total += parseInt(input.value) || 0;
    });

    // 2. Soma perícias
    const trainingInputs = document.querySelectorAll(".training-val input");
    trainingInputs.forEach(input => {
        let val = parseInt(input.value) || 0;

        if (val < 0) val = 0;
        if (val > 2) val = 2;

        input.value = val;
        total += val;
        
        const row = input.closest('.skill-row');
        const name = row ? row.querySelector('.skill-name') : null;

        if (val === 1) {
            input.style.color = "#2ecc71";
            if(name) name.style.color = "#2ecc71";
        } 
        else if (val === 2) {
            input.style.color = "#4a90e2";
            if(name) name.style.color = "#4a90e2";
        } 
        else {
            input.style.color = "#777";
            if(name) name.style.color = "#4a90e2";
        }
    
    });

  // 3. Soma Vantagens e Desvantagens
    document.querySelectorAll(".item-cost").forEach(i => {
        total += parseInt(i.value) || 0;
    });

    // Soma custo da raça
    total += custoVantagemUnica;

    // Atualiza na tela
    totalPontosSpan.textContent = total;

    // 4. Atualiza PV/PM baseado na Resistência
    const res = parseInt(resInput.value) || 0;
    const novoMax = 5 + (res * 5);

    const diff = novoMax - stats.pv.max;

    // Atualiza máximos
    stats.pv.max = novoMax;
    stats.pm.max = novoMax;

    // Atualiza atuais baseado no input
    stats.pv.current = (parseInt(pvCurrentInput.value) || 0) + diff;
    stats.pm.current = (parseInt(pmCurrentInput.value) || 0) + diff;

    // Limites
    stats.pv.current = Math.min(Math.max(0, stats.pv.current), stats.pv.max);
    stats.pm.current = Math.min(Math.max(0, stats.pm.current), stats.pm.max);

    // Atualiza inputs visuais
    pvCurrentInput.value = stats.pv.current;
    pmCurrentInput.value = stats.pm.current;

    renderBars();
}

// Função para adicionar o rascunho (Formulário)
function addNewItem(containerId) {
    const container = document.getElementById(containerId);
    const formDiv = document.createElement('div');
    formDiv.className = 'item-accordion item-form-container';
    
    formDiv.innerHTML = `
        <div class="item-form">
            <div style="display:flex; gap:10px;">
                <input type="text" placeholder="Nome da Habilidade" class="edit-name" style="flex:2">
                <input type="number" placeholder="Pts" class="edit-cost" style="flex:1">
            </div>
            <textarea placeholder="Descrição da habilidade..." class="edit-desc" rows="3"></textarea>
            <button class="btn-save-item" onclick="saveItem(this)">SALVAR</button>
        </div>
    `;
    container.appendChild(formDiv);
}

// Função para Salvar e transformar em Accordion
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
    
    updateAll(); // Recalcula os pontos gastos
}

// Função para abrir/fechar
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const allHeaders = header.parentElement.parentElement.querySelectorAll('.item-header');
    
    header.classList.toggle('active');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

// Função para voltar ao modo de edição
function editItem(btn) {
    const accordion = btn.closest('.item-accordion');
    const name = accordion.querySelector('.item-title').innerText;
    const cost = accordion.querySelector('.item-cost').value;
    const desc = accordion.querySelector('.item-description-text').innerText;

    accordion.innerHTML = `
        <div class="item-form">
            <div style="display:flex; gap:10px;">
                <input type="text" value="${name}" class="edit-name" style="flex:2">
                <input type="number" value="${cost}" class="edit-cost" style="flex:1">
            </div>
            <textarea class="edit-desc" rows="3">${desc}</textarea>
            <button class="btn-save-item" onclick="saveItem(this)">SALVAR ALTERAÇÕES</button>
        </div>
    `;
}

function removeItem(btn) {
    btn.closest('.item-accordion').remove();
    updateAll();
}

function renderBars() {

    stats.pv.current = parseInt(pvCurrentInput.value) || 0;
    stats.pm.current = parseInt(pmCurrentInput.value) || 0;

    stats.pv.current = Math.min(Math.max(0, stats.pv.current), stats.pv.max);
    stats.pm.current = Math.min(Math.max(0, stats.pm.current), stats.pm.max);

    pvCurrentInput.value = stats.pv.current;
    pmCurrentInput.value = stats.pm.current;

    document.getElementById("pv-max").textContent = stats.pv.max;
    document.getElementById("pm-max").textContent = stats.pm.max;

    const pvPercent = (stats.pv.current / stats.pv.max) * 100;
    const pmPercent = (stats.pm.current / stats.pm.max) * 100;

    document.getElementById('pv-fill').style.width = pvPercent + "%";
    document.getElementById('pm-fill').style.width = pmPercent + "%";
}

function changeCurrent(type, amount) {

    if (type === "pv") {
        pvCurrentInput.value = (parseInt(pvCurrentInput.value) || 0) + amount;
    }

    if (type === "pm") {
        pmCurrentInput.value = (parseInt(pmCurrentInput.value) || 0) + amount;
    }

    renderBars();
}

// Modal
function showSkillDescription(skillName) {

    const modal = document.getElementById("skill-modal");

    document.getElementById("modal-title").innerText = skillName;

    document.getElementById("modal-body").innerHTML =
        skillDescriptions[skillName] || "Descrição não encontrada.";

    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("skill-modal").style.display = "none";
}

// Listeners
attrInputs.forEach(input => input.addEventListener('input', updateAll));

pvCurrentInput.addEventListener("input", renderBars);
pmCurrentInput.addEventListener("input", renderBars);

window.onclick = (e) => {
    if (e.target.classList.contains('modal')) closeModal();
};

// Inicialização
initVantagensUnicas();
updateAll();
renderBars();