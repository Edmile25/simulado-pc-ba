let questoes = [];
let pontuacao = 0;

// Puxar JSON
fetch('questoes.json')
  .then(response => response.json())
  .then(data => {
      questoes = data.questoes;
  });

document.getElementById('sortear').addEventListener('click', () => {
    const disciplina = document.getElementById('disciplina').value;

    // Filtra por disciplina
    let listaFiltrada = questoes;
    if(disciplina !== 'todas') {
        listaFiltrada = questoes.filter(q => q.disciplina === disciplina);
    }

    // Sorteia aleatoriamente
    const q = listaFiltrada[Math.floor(Math.random() * listaFiltrada.length)];

    // Mostra a questão
    let html = `<h2>${q.disciplina}</h2>`;
    html += `<p>${q.questao}</p>`;
    q.alternativas.forEach((alt, i) => {
        html += `<button onclick="responder('${alt}', '${q.resposta}', '${q.comentario}')">${alt}</button><br>`;
    });

    document.getElementById('questao-container').innerHTML = html;
});

function responder(escolha, correta, comentario) {
    if(escolha === correta) {
        pontuacao++;
        alert(`✅ Correta!\nComentário: ${comentario}\nPontuação: ${pontuacao}`);
    } else {
        alert(`❌ Errada!\nComentário: ${comentario}\nPontuação: ${pontuacao}`);
    }
}
