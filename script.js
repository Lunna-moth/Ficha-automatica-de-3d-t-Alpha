let stats = {
    pv: { current: 5, max: 5 },
    pm: { current: 5, max: 5 }
};

const attrInputs = document.querySelectorAll('.attr-input');
const resInput = document.getElementById('res-input');
const totalPontosSpan = document.getElementById('total-pontos');

const pvCurrentInput = document.getElementById("pv-current");
const pmCurrentInput = document.getElementById("pm-current");

const trainingInputs = document.querySelectorAll(".training-val input");

function updateAll() {

    let total = 0;

    // Soma atributos
    attrInputs.forEach(input => {
        total += parseInt(input.value) || 0;
    });

    // Soma perícias
    trainingInputs.forEach(input => {

        let val = parseInt(input.value) || 0;

        if (val < 0) val = 0;
        if (val > 2) val = 2;

        input.value = val;

        total += val;

        // cores
        if (val === 1) {
            input.style.color = "#2ecc71"; // verde
        }
        else if (val === 2) {
            input.style.color = "#4a90e2"; // azul
        }
        else {
            input.style.color = "#777";
        }

    });

    totalPontosSpan.textContent = total;

    // PV e PM
    const res = parseInt(resInput.value) || 0;
    const novoMax = 5 + (res * 5);

    const diffPV = novoMax - stats.pv.max;
    const diffPM = novoMax - stats.pm.max;

    stats.pv.max = novoMax;
    stats.pm.max = novoMax;

    stats.pv.current += diffPV;
    stats.pm.current += diffPM;

    if (stats.pv.current < 0) stats.pv.current = 0;
    if (stats.pm.current < 0) stats.pm.current = 0;

    if (stats.pv.current > stats.pv.max) stats.pv.current = stats.pv.max;
    if (stats.pm.current > stats.pm.max) stats.pm.current = stats.pm.max;

    pvCurrentInput.value = stats.pv.current;
    pmCurrentInput.value = stats.pm.current;

    renderBars();
}

function renderBars() {

    stats.pv.current = parseInt(pvCurrentInput.value) || 0;
    stats.pm.current = parseInt(pmCurrentInput.value) || 0;

    if (stats.pv.current > stats.pv.max) stats.pv.current = stats.pv.max;
    if (stats.pm.current > stats.pm.max) stats.pm.current = stats.pm.max;

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

    stats[type].current += amount;

    if (stats[type].current < 0) stats[type].current = 0;
    if (stats[type].current > stats[type].max) stats[type].current = stats[type].max;

    if (type === "pv") pvCurrentInput.value = stats[type].current;
    if (type === "pm") pmCurrentInput.value = stats[type].current;

    renderBars();
}

// Eventos atributos
attrInputs.forEach(input => {
    input.addEventListener('input', updateAll);
});

// Eventos perícias
trainingInputs.forEach(input => {
    input.addEventListener("input", updateAll);
});

// Atualizar quando digitar PV ou PM
pvCurrentInput.addEventListener("input", renderBars);
pmCurrentInput.addEventListener("input", renderBars);

// Descrições das Perícias (Baseadas no 3D&T Alpha)
const skillDescriptions = {
    "Animais": "Você sabe lidar com criaturas. Inclui cavalgar, treinar animais e entender comportamentos selvagens.",
    "Arte": "Você sabe se expressar através de música, dança, escrita ou artes visuais. <br><br><b>Uso Comum:</b> Impressionar plateias ou identificar obras valiosas.",
    "Ciencia": "Representa conhecimento acadêmico. Física, química, biologia, história ou arqueologia. Permite entender fenômenos naturais e tecnológicos.",
    "Crime": "Habilidades ilegais como arrombamento, furto, falsificação e infiltração sem ser notado.",
    "Esporte": "Capacidades atléticas além do comum. Inclui natação, escalada, parkour e competições esportivas.",
    "Idiomas": "Capacidade de falar, ler e escrever línguas estrangeiras, além de decifrar códigos e escritas antigas.",
    "Investigação": "Você é bom em encontrar pistas, deduzir eventos através de evidências e vigilância.",
    "Maquinas": "Habilidade para consertar aparelhos eletrônicos, pilotar veículos complexos e hackear sistemas simples.",
    "Manipulação": "Sua lábia é poderosa. Inclui persuadir, enganar, intimidar ou seduzir pessoas para obter informações ou favores.",
    "Medicina": "Capacidade de curar ferimentos, diagnosticar doenças e realizar cirurgias. Fundamental para recuperar PVs.",
    "Sobrevivencia": "Habilidade para caçar, rastrear, encontrar água e navegar em ambientes selvagens ou hostis."
};

// Funções do Modal
function showSkillDescription(skillName) {
    const modal = document.getElementById("skill-modal");
    const title = document.getElementById("modal-title");
    const body = document.getElementById("modal-body");

    title.innerText = skillName;
    body.innerHTML = skillDescriptions[skillName] || "Descrição não disponível para esta perícia.";

    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("skill-modal");
    modal.style.display = "none";
}

// Fechar modal ao clicar fora da caixa preta
window.onclick = function(event) {
    const modal = document.getElementById("skill-modal");
    if (event.target == modal) {
        closeModal();
    }
}

// Inicialização
updateAll();