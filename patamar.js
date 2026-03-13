// ==============================
// SISTEMA DE PATAMARES
// ==============================

const dadosPatamares = {

    "pessoa-comum": {
        nome: "Pessoa Comum",
        pontos: 4,
        desvantagens: -1
    },

    "novato": {
        nome: "Novato",
        pontos: 5,
        desvantagens: -3
    },

    "lutador": {
        nome: "Lutador",
        pontos: 7,
        desvantagens: -4
    },

    "campeao": {
        nome: "Campeão",
        pontos: 10,
        desvantagens: -5
    },

    "lenda": {
        nome: "Lenda",
        pontos: 12,
        desvantagens: -6
    }

};

// patamar atual
let patamarAtual = "novato";


// ==============================
// PEGAR LIMITE DE PONTOS
// ==============================

function getLimitePontos() {
    return dadosPatamares[patamarAtual].pontos;
}


// ==============================
// PEGAR LIMITE DE DESVANTAGENS
// ==============================

function getLimiteDesvantagens() {
    return dadosPatamares[patamarAtual].desvantagens;
}


// ==============================
// MUDAR PATAMAR
// ==============================

function setPatamar(valor) {

    if (!dadosPatamares[valor]) return;

    patamarAtual = valor;

    updateAll();

}


// ==============================
// MOSTRAR INFORMAÇÕES NA TELA
// ==============================

function renderPatamar(totalGasto) {

    const limite = getLimitePontos();

    const restante = limite - totalGasto;

    const el = document.getElementById("pontos-restantes");

    if (el) {
        el.textContent = restante;
    }

}

// ==============================
// VALIDAÇÃO DE LIMITES
// ==============================

function validarLimites(total, ultimoInput) {

    const limitePontos = getLimitePontos();
    const limiteDesv = getLimiteDesvantagens();

    // Conta desvantagens
    let totalDesvantagens = 0;

    document.querySelectorAll(".item-cost").forEach(i => {
        const v = parseInt(i.value) || 0;
        if (v < 0) totalDesvantagens += v;
    });

    // =========================
    // LIMITE DE DESVANTAGENS
    // =========================

    if (totalDesvantagens < limiteDesv) {

        showWarning("Você não pode ter mais desvantagens");
        if (ultimoInput) {
            ultimoInput.value = 0;
        }

        return false;
    }

    // =========================
    // LIMITE DE PONTOS
    // =========================

    if (total > limitePontos) {

        showWarning("Você não tem patamar o suficiente");
        if (ultimoInput) {
            ultimoInput.value = 0;
        }

        return false;
    }

    return true;
}