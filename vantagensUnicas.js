const listaVantagensUnicas = {
    "Humano": {
        custo: 0,
        descricao: "Humanos são versáteis e ambiciosos.",
        traits: [] // Humanos não ganham nada automático no 3D&T base
    },
    "Anão": {
        custo: 1,
        descricao: "Anões são robustos e ótimos ferreiros.",
        traits: [
            { nome: "Infravisão", custo: 0, tipo: "vantagem", desc: "Enxerga no escuro." },
            { nome: "Resistência à Magia", custo: 0, tipo: "vantagem", desc: "Testes de Resistência +1 contra magia." },
            { nome: "Inimigos (Orcs e Trolls)", custo: 0, tipo: "desvantagem", desc: "H+1 contra eles, mas ódio profundo." }
        ]
    },
    "Goblin": {
        custo: -1,
        descricao: "Pequenos, espertos e muitas vezes mal compreendidos.",
        traits: [
            { nome: "Infravisão", custo: 0, tipo: "vantagem", desc: "Enxerga no escuro." },
            { nome: "Má Fama", custo: 0, tipo: "desvantagem", desc: "Ninguém confia em goblins." },
            { nome: "Aptidão para Crime", custo: 0, tipo: "vantagem", desc: "Perícia Crime custa apenas 1 ponto." }
        ]
    }
};