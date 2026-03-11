// ==============================
// SISTEMA DE PERÍCIAS
// ==============================

function calcularPericias() {

    let total = 0;

    const trainingInputs = document.querySelectorAll(".training-val input");

    trainingInputs.forEach(input => {

        let val = parseInt(input.value) || 0;

        // Limite de valores
        if (val < 0) val = 0;
        if (val > 2) val = 2;

        input.value = val;

        total += val;

        const row = input.closest('.skill-row');
        const name = row ? row.querySelector('.skill-name') : null;

        // Cor baseada no nível
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

    return total;
}