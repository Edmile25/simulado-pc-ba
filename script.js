let questoes = [];
let pontuacao = 0;

// Puxar JSON
fetch('questoes_corrigidas.json') // use o arquivo novo
  .then(response => response.json())
  .then(data => {
      questoes = data;
  });

document.getElementById('sortear').addEventListener('click', () => {
    const disciplina = document.getElementById('disciplina').value;

    let listaFiltrada = questoes;

    if(disciplina !== 'todas') {
        listaFiltrada = questoes.filter(q =>
            q.disciplina.trim() === disciplina.trim()
        );
    }

    const q = listaFiltrada[Math.floor(Math.random() * listaFiltrada.length)];

    let html = `<h2>${q.disciplina}</h2>`;
    html += `<p>${q.questao}</p>`;

    q.alternativas.forEach((alt) => {
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
