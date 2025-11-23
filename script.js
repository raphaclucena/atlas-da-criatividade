let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Falha ao buscar dados:", error);
            return; // Interrompe a execução se houver erro
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca) || 
        dado.highlight.some(h => h.toLowerCase().includes(termoBusca))
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p><strong>Data de criação:</strong> ${dado.data_criacao}</p>
        <p><strong>Breve descrição:</strong> ${dado.descricao}</p>
        <p><strong>Principais Características:</strong></p>
        <ul>
            ${dado.highlight.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <p><strong>Similar a estes outros itens da lista:</strong></p>
        <ol>
            ${dado.relationship.map(item => `<li>${item}</li>`).join('')}
        </ol>
        <a href="${dado.link}" target="_blank">Conheça mais</a>
        `
        cardContainer.appendChild(article);
    }
}

iniciarBusca();