// ==============================
// SISTEMA DE MAGIAS
// ==============================

function addNewSpell() {

    const container = document.getElementById('magias-list');

    const formDiv = document.createElement('div');
    formDiv.className = 'item-accordion item-form-container';

    formDiv.innerHTML = `
        <div class="item-form">
            <div class="spell-form-grid">

                <input type="text" placeholder="Nome da Magia" class="edit-spell-name full-width">

                <div class="input-group">
                    <label>Escola</label>
                    <select class="edit-spell-school">
                        <option value="Magia Branca">Magia Branca</option>
                        <option value="Magia Elemental">Magia Elemental</option>
                        <option value="Magia Negra">Magia Negra</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Custo (PMs)</label>
                    <input type="number" placeholder="Custo" class="edit-spell-cost">
                </div>

                <div class="input-group">
                    <label>Alcance</label>
                    <select class="edit-spell-range">
                        <option value="Toque">Toque</option>
                        <option value="Pessoal">Pessoal</option>
                        <option value="Curto">Curto</option>
                        <option value="Longo">Longo</option>
                        <option value="Visão">Visão</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Duração</label>
                    <select class="edit-spell-duration">
                        <option value="Instantânea">Instantânea</option>
                        <option value="Sustentável">Sustentável</option>
                        <option value="Permanente">Permanente</option>
                    </select>
                </div>

            </div>

            <textarea placeholder="Descrição dos efeitos da magia..." class="edit-spell-desc" rows="3"></textarea>

            <button class="btn-save-item" onclick="saveSpell(this)">ADICIONAR AO LIVRO</button>

        </div>
    `;

    container.appendChild(formDiv);
}



function saveSpell(btn) {

    const container = btn.closest('.item-accordion');
    const form = btn.closest('.item-form');

    const data = {

        name: form.querySelector('.edit-spell-name').value || "Magia Sem Nome",
        school: form.querySelector('.edit-spell-school').value,
        cost: form.querySelector('.edit-spell-cost').value || "0",
        range: form.querySelector('.edit-spell-range').value,
        duration: form.querySelector('.edit-spell-duration').value,
        desc: form.querySelector('.edit-spell-desc').value || ""

    };


    let schoolClass = "";

    if (data.school.includes("Negra")) schoolClass = "magia-negra";
    else if (data.school.includes("Elemental")) schoolClass = "magia-elemental";


    container.classList.remove('item-form-container');

    container.innerHTML = `

        <div class="item-header" onclick="toggleAccordion(this)">

            <span class="arrow">▼</span>

            <span class="item-title ${schoolClass}">${data.name}</span>

            <span class="spell-info-tags">${data.school} | ${data.cost} PMs</span>

        </div>

        <div class="item-content">

            <div style="margin-bottom:10px;font-size:0.85em;color:#aaa;">
                <strong>Alcance:</strong> ${data.range} |
                <strong>Duração:</strong> ${data.duration}
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
}



function editSpell(btn) {

    const accordion = btn.closest('.item-accordion');

    const old = {

        name: accordion.querySelector('.h-name').value,
        school: accordion.querySelector('.h-school').value,
        cost: accordion.querySelector('.h-cost').value,
        range: accordion.querySelector('.h-range').value,
        duration: accordion.querySelector('.h-duration').value,
        desc: accordion.querySelector('.item-description-text').innerText

    };


    accordion.innerHTML = `

        <div class="item-form">

            <div class="spell-form-grid">

                <input type="text" value="${old.name}" class="edit-spell-name full-width">

                <select class="edit-spell-school">

                    <option value="Magia Branca" ${old.school === 'Magia Branca' ? 'selected' : ''}>Magia Branca</option>
                    <option value="Magia Elemental" ${old.school === 'Magia Elemental' ? 'selected' : ''}>Magia Elemental</option>
                    <option value="Magia Negra" ${old.school === 'Magia Negra' ? 'selected' : ''}>Magia Negra</option>

                </select>

                <input type="number" value="${old.cost}" class="edit-spell-cost">

                <select class="edit-spell-range">
                    ${['Toque','Pessoal','Curto','Longo','Visão'].map(r =>
                        `<option value="${r}" ${old.range === r ? 'selected' : ''}>${r}</option>`
                    ).join('')}
                </select>

                <select class="edit-spell-duration">
                    ${['Instantânea','Sustentável','Permanente'].map(d =>
                        `<option value="${d}" ${old.duration === d ? 'selected' : ''}>${d}</option>`
                    ).join('')}
                </select>

            </div>

            <textarea class="edit-spell-desc" rows="3">${old.desc}</textarea>

            <button class="btn-save-item" onclick="saveSpell(this)">
                SALVAR ALTERAÇÕES
            </button>

        </div>
    `;
}