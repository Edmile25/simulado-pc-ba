let questoes = [];
let questoesAtuais = [];
let numQuestoesSorteadas = 5;
let respostasUsuario = [];

fetch('questoes.json')
  .then(res => res.json())
  .then(data => {
    questoes = data;
    questoesAtuais = [...questoes];
    popularFiltro();
    mostrarQuestoes();
  });

function popularFiltro() {
  const filtro = document.getElementById('filtro');
  let disciplinas = [...new Set(questoes.map(q => q.disciplina))];
  disciplinas.forEach(d => {
    let option = document.createElement('option');
    option.value = d;
    option.text = d;
    filtro.add(option);
  });
}

function mostrarQuestoes() {
  const container = document.getElementById('simulado');
  container.innerHTML = '';
  respostasUsuario = [];
  questoesAtuais.forEach((q, i) => {
    let html = `<div class="questao">
                  <b>${i+1}. [${q.disciplina}] ${q.questao}</b><br>`;
    q.alternativas.forEach((alt) => {
      html += `<input type="radio" name="q${i}" value="${alt}"> ${alt}<br>`;
    });
    html += '</div>';
    container.innerHTML += html;
  });
}

function filtrar() {
  const filtro = document.getElementById('filtro').value;
  if (filtro === 'todas') {
    questoesAtuais = [...questoes];
  } else {
    questoesAtuais = questoes.filter(q => q.disciplina === filtro);
  }
  mostrarQuestoes();
}

function sortear() {
  let qtd = Math.min(numQuestoesSorteadas, questoes.length);
  questoesAtuais = [];
  let copia = [...questoes];
  for (let i = 0; i < qtd; i++) {
    let idx = Math.floor(Math.random() * copia.length);
    questoesAtuais.push(copia[idx]);
    copia.splice(idx, 1);
  }
  mostrarQuestoes();
}

function finalizar() {
  let resultado = document.getElementById('resultado');
  let pontuacao = 0;
  let texto = '';
  questoesAtuais.forEach((q, i) => {
    let radios = document.getElementsByName('q'+i);
    let respostaEscolhida;
    for (let r of radios) {
      if (r.checked) respostaEscolhida = r.value;
    }
    if (respostaEscolhida === q.resposta) {
      pontuacao++;
      texto += `<p>${i+1}. Correta! <br>Comentário: ${q.comentario}</p>`;
    } else {
      texto += `<p>${i+1}. Errada. <br>Sua resposta: ${respostaEscolhida || 'Nenhuma'} <br>Correta: ${q.resposta} <br>Comentário: ${q.comentario}</p>`;
    }
  });
  resultado.innerHTML = texto;
  document.getElementById('pontuacao').innerHTML = `<h3>🏆 Pontuação: ${pontuacao} / ${questoesAtuais.length}</h3>`;
}
