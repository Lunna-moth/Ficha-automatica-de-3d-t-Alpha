// ==============================
// SISTEMA DE RAÇAS / VANTAGENS ÚNICAS
// ==============================

// custo atual da raça selecionada
window.custoVantagemUnica = 0;

// ==============================
// MOSTRAR DESCRIÇÃO
// ==============================

function mostrarDescricaoRaca(raca) {

    if (typeof racasDescricao === "undefined") return;

    const descricao = racasDescricao[raca] || "Sem descrição.";

    const descBox = document.getElementById("descricao-raca");

    if (descBox) {
        descBox.innerText = descricao;
    }

}


// ==============================
// POPULAR SELECT
// ==============================

function initVantagensUnicas() {

    const select = document.getElementById('select-vantagem-unica');

    if (!select) return;

    // limpa opções antigas
    select.innerHTML = `<option value="">Nenhuma</option>`;

    for (let raca in listaVantagensUnicas) {

        let opt = document.createElement('option');

        opt.value = raca;

        opt.innerHTML = `${raca} (${listaVantagensUnicas[raca].custo} Pts)`;

        select.appendChild(opt);

    }

}


// ==============================
// APLICAR VANTAGENS DA RAÇA
// ==============================

function applyUniqueAdvantage() {

    const select = document.getElementById('select-vantagem-unica');

    if (!select) return;

    const racaNome = select.value;

    // remove traços automáticos antigos
    document.querySelectorAll(".auto-race").forEach(e => e.remove());

    if (!racaNome) {

        custoVantagemUnica = 0;

        updateAll();

        return;

    }

    const raca = listaVantagensUnicas[racaNome];

    if (!raca) return;

    custoVantagemUnica = raca.custo;

    raca.traits.forEach(traitNome => {

        // procura primeiro em vantagens
        let trait = listaVantagens[traitNome];

        // se não achar, procura em desvantagens
        if (!trait) {
            trait = listaDesvantagens[traitNome];
        }

        if (!trait) {

            console.warn("Traço não encontrado:", traitNome);

            return;

        }

        // decide onde colocar
        const containerId =
            trait.custo >= 0
                ? "vantagens-list"
                : "desvantagens-list";

        injectTrait(
            containerId,
            traitNome,
            0, // vantagens de raça não custam pontos
            trait.desc
        );

    });

    updateAll();

}