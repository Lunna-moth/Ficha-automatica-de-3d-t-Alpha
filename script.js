// Seletores fixos
const attrInputs = document.querySelectorAll('.attr-input');
const resInput = document.getElementById('res-input');
const totalPontosSpan = document.getElementById('total-pontos');
const pvCurrentInput = document.getElementById("pv-current");
const pmCurrentInput = document.getElementById("pm-current");
const selectRaca = document.getElementById("select-vantagem-unica");

if (selectRaca) {
    selectRaca.addEventListener("change", () => {
        applyUniqueAdvantage();
        mostrarDescricaoRaca(selectRaca.value);
    });
}

function updateAll(event) {

    let total = 0;

    // 1. Soma atributos
    attrInputs.forEach(input => {
        total += parseInt(input.value) || 0;
    });

    // 2. Soma perícias
    total += calcularPericias();

    // 3. Soma vantagens/desvantagens
    document.querySelectorAll(".item-cost").forEach(i => {
        total += parseInt(i.value) || 0;
    });

    // 4. soma custo da raça
    total += custoVantagemUnica;

    // 5. valida limites do patamar
    if (typeof validarLimites === "function") {

        const ultimoInput = event ? event.target : null;

        if (!validarLimites(total, ultimoInput)) {
            updateAll(); 
            return;
        }
    }

    // 6. Atualiza total gasto
    totalPontosSpan.textContent = total;

    // 7. Sistema de patamar
    if (typeof renderPatamar === "function") {
        renderPatamar(total);
    }

    // 8. Atualiza PV/PM
    calcularPVPM(resInput, pvCurrentInput, pmCurrentInput);

    renderBars(pvCurrentInput, pmCurrentInput);
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

function changeCurrent(type, amount) {
    changePVPM(type, amount, pvCurrentInput, pmCurrentInput);
}

function showWarning(text){

    const el = document.getElementById("system-warning");

    if(!el) return;

    el.textContent = text;

    el.classList.add("show");

    setTimeout(()=>{
        el.classList.remove("show");
    },3000);
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
attrInputs.forEach(input => input.addEventListener('input', (e) => updateAll(e)));

pvCurrentInput.addEventListener("input", () => renderBars(pvCurrentInput, pmCurrentInput));
pmCurrentInput.addEventListener("input", () => renderBars(pvCurrentInput, pmCurrentInput));

window.onclick = (e) => {
    if (e.target.classList.contains('modal')) closeModal();
};

// Inicialização

    initVantagensUnicas();
    if (selectRaca && selectRaca.value) {
        mostrarDescricaoRaca(selectRaca.value);
    }

    updateAll();
    renderBars();
// --- SISTEMA DE MAGIAS ---

    // Define uma cor baseada na escola
    let schoolClass = "";
    if(data.school.includes("Negra")) schoolClass = "magia-negra";
    else if(data.school.includes("Elemental")) schoolClass = "magia-elemental";

    container.classList.remove('item-form-container');
    container.innerHTML = `
        <div class="item-header" onclick="toggleAccordion(this)">
            <span class="arrow">▼</span>
            <span class="item-title ${schoolClass}">${data.name}</span>
            <span class="spell-info-tags">${data.school} | ${data.cost} PMs</span>
        </div>
        <div class="item-content">
            <div style="margin-bottom: 10px; font-size: 0.85em; color: #aaa;">
                <strong>Alcance:</strong> ${data.range} | <strong>Duração:</strong> ${data.duration}
            </div>
            <div class="item-description-text">${data.desc}</div>
            <div class="item-footer">
                <button class="btn-action-remove" onclick="removeItem(this)">Remover</button>
                <button class="btn-action-edit" onclick="editSpell(this)">Editar</button>
            </div>
        </div>
        <input type="hidden" class="h-name" value="${data.name}">
        <input type="hidden" class="h-school" value="${data.school}">
        <input type="hidden" class="h-cost" value="${data.cost}">
        <input type="hidden" class="h-range" value="${data.range}">
        <input type="hidden" class="h-duration" value="${data.duration}">
    `;
