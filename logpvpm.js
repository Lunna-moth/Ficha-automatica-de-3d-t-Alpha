// ============================
// SISTEMA DE PV / PM
// ============================

let stats = {
    pv: { current: 5, max: 5 },
    pm: { current: 5, max: 5 }
};

function calcularPVPM(resInput, pvCurrentInput, pmCurrentInput) {

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
}

function renderBars(pvCurrentInput, pmCurrentInput) {

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

function changePVPM(type, amount, pvCurrentInput, pmCurrentInput) {

    if (type === "pv") {
        pvCurrentInput.value = (parseInt(pvCurrentInput.value) || 0) + amount;
    }

    if (type === "pm") {
        pmCurrentInput.value = (parseInt(pmCurrentInput.value) || 0) + amount;
    }

    renderBars(pvCurrentInput, pmCurrentInput);
}