let stats = {
    pv: { current: 5, max: 5 },
    pm: { current: 5, max: 5 }
};

// Seletores fixos
const attrInputs = document.querySelectorAll('.attr-input');
const resInput = document.getElementById('res-input');
const totalPontosSpan = document.getElementById('total-pontos');
const pvCurrentInput = document.getElementById("pv-current");
const pmCurrentInput = document.getElementById("pm-current");

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

        // Limita entre 0 e 2
        if (val < 0) val = 0;
        if (val > 2) val = 2;

        input.value = val;

        total += val;

        const row = input.closest('.skill-row');
        const name = row ? row.querySelector('.skill-name') : null;

        // Cores
        if (val === 1) {
            input.style.color = "#2ecc71";
            if (name) name.style.color = "#2ecc71";
        } 
        else if (val === 2) {
            input.style.color = "#4a90e2";
            if (name) name.style.color = "#4a90e2";
        } 
        else {
            input.style.color = "#777";
            if (name) name.style.color = "#4a90e2";
        }

    });

    totalPontosSpan.textContent = total;

    // 3. Cálculo de PV e PM
    const res = parseInt(resInput.value) || 0;
    const novoMax = 5 + (res * 5);

    const diff = novoMax - stats.pv.max;

    stats.pv.max = novoMax;
    stats.pm.max = novoMax;

    stats.pv.current = (parseInt(pvCurrentInput.value) || 0) + diff;
    stats.pm.current = (parseInt(pmCurrentInput.value) || 0) + diff;

    stats.pv.current = Math.min(Math.max(0, stats.pv.current), stats.pv.max);
    stats.pm.current = Math.min(Math.max(0, stats.pm.current), stats.pm.max);

    pvCurrentInput.value = stats.pv.current;
    pmCurrentInput.value = stats.pm.current;

    renderBars();
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
updateAll();