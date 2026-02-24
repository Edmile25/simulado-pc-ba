let questoes = [];
let respostasUsuario = [];

fetch('questoes.json')
  .then(res => res.json())
  .then(data => {
    questoes = data;
    mostrarQuestoes();
  });

function mostrarQuestoes() {
  const container = document.getElementById('simulado');
  container.innerHTML = '';
  questoes.forEach((q, i) => {
    let html = `<div class="questao">
                  <b>${i+1}. [${q.disciplina}] ${q.questao}</b><br>`;
    q.alternativas.forEach((alt, j) => {
      html += `<input type="radio" name="q${i}" value="${alt}"> ${alt}<br>`;
    });
    html += '</div>';
    container.innerHTML += html;
  });
}

function finalizar() {
  let resultado = document.getElementById('resultado');
  let texto = '';
  questoes.forEach((q, i) => {
    let radios = document.getElementsByName('q'+i);
    let respostaEscolhida;
    for (let r of radios) {
      if (r.checked) respostaEscolhida = r.value;
    }
    if (respostaEscolhida === q.resposta) {
      texto += `<p>${i+1}. Correta! <br>Comentário: ${q.comentario}</p>`;
    } else {
      texto += `<p>${i+1}. Errada. <br>Sua resposta: ${respostaEscolhida || 'Nenhuma'} <br>Correta: ${q.resposta} <br>Comentário: ${q.comentario}</p>`;
    }
  });
  resultado.innerHTML = texto;
}
