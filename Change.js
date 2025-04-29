document.addEventListener("DOMContentLoaded", () => {
  const tipoCorridaInputs = document.querySelectorAll('input[name="tipoCorrida"]');
  const opcoesVoltas = document.getElementById("opcoesVoltas");
  const opcoesEndurance = document.getElementById("opcoesEndurance");

  const esconderTodasOpcoes = () => {
    opcoesVoltas.style.display = "none";
    opcoesEndurance.style.display = "none";
  };

  tipoCorridaInputs.forEach(input => {
    input.addEventListener("change", () => {
      esconderTodasOpcoes();
      if (input.value === "voltas") {
        opcoesVoltas.style.display = "block";
      } else if (input.value === "endurance") {
        opcoesEndurance.style.display = "block";
      }
    });
  });

  esconderTodasOpcoes();
});

function calcular(event) {
  event.preventDefault();

  const inputTipoSelecionado = document.querySelectorAll('input[name="tipoCorrida"]:checked');
  if (inputTipoSelecionado.length < 1) {
    alert("Selecione o tipo da corrida");
    return;
  }

  // Identificar pneu selecionado
  const pneuSelecionado = document.querySelector('input[name="tipoPneu"]:checked');
  if (!pneuSelecionado) {
    alert("Selecione o tipo de pneu");
    return;
  }
  const pneuImagem = pneuSelecionado.nextElementSibling.querySelector("img").src;

  const isTipoVoltas = inputTipoSelecionado[0].value === "voltas";
  let resultadoTexto = "";

  if (isTipoVoltas) {
    const numeroVoltas = document.getElementById('numeroVoltas').value;
    const desgastePneuVoltas = document.getElementById('desgastePneuVoltas').value;

    if (!numeroVoltas || !desgastePneuVoltas) {
      alert("Preencha os campos para concluir o cálculo");
      return;
    }

    const resultado = desgastePneuVoltas * numeroVoltas;
    resultadoTexto = `
      Desgaste de pneu: <span style="color: yellow;">${resultado}%</span><br>
      Número de voltas: <span style="color: yellow;">${numeroVoltas}</span>
    `;
  } else {
    const tempoVoltaEndurance = document.getElementById('tempoVoltaEndurance').value;
    const numeroVoltasEndurance = document.getElementById('numeroVoltasEndurance').value;
    const desgastePneuEndurance = document.getElementById('desgastePneuEndurance').value;

    if (!numeroVoltasEndurance || !desgastePneuEndurance || !tempoVoltaEndurance) {
      alert("Preencha os campos para concluir o cálculo");
      return;
    }

    const tempoFormatado = tempoVoltaEndurance.split(":");
    const minuto = Number.parseInt(tempoFormatado[0]) * 60000;
    const segundo = Number.parseInt(tempoFormatado[1]) * 1000;
    const milessegundos = Number.parseInt(tempoFormatado[2]);

    const totalMilessegundos = (minuto + segundo + milessegundos) * numeroVoltasEndurance;
    const minutosTotais = Math.trunc(totalMilessegundos / 60000);
    const segundosTotais = Math.trunc((totalMilessegundos % 60000) / 1000);
    const milessegundosTotais = Math.trunc(totalMilessegundos % 1000);

    const minutosFormatados = minutosTotais < 10 ? "0" + minutosTotais : minutosTotais;
    const segundosFormatados = segundosTotais < 10 ? "0" + segundosTotais : segundosTotais;
    const milessegundosFormatados = milessegundosTotais.toString().padStart(3, "0");

    const resultadoTempo = `${minutosFormatados}:${segundosFormatados}:${milessegundosFormatados}`;
    const resultadoDesgaste = desgastePneuEndurance * numeroVoltasEndurance;

    resultadoTexto = `
      Desgaste de pneu: <span style="color: #FFDA37;">${resultadoDesgaste}%</span><br>
      Tempo total: <span style="color: #FFDA37;">${resultadoTempo}</span>
    `;
  }

  // Exibir resultado na popup
  const resultadoTextoElemento = document.getElementById('resultadoTexto');
  const popupContainer = document.getElementById('resultadoPopup');

  resultadoTextoElemento.innerHTML = resultadoTexto; // Usar innerHTML para incluir o span estilizado

  // Adicionar pneu selecionado
  const pneuIcone = document.createElement("img");
  pneuIcone.src = pneuImagem;
  pneuIcone.alt = "Ícone do pneu selecionado";
  pneuIcone.style.margin = "16px 0 0 0";
  resultadoTextoElemento.insertAdjacentElement("beforebegin", pneuIcone);
  popupContainer.style.display = "block";
}

function fecharPopup() {
  const popupContainer = document.getElementById('resultadoPopup');
  popupContainer.style.display = "none";

  // Remover todos os ícones de pneu adicionados anteriormente
  const iconesAdicionados = document.querySelectorAll("#resultadoPopup img");
  iconesAdicionados.forEach(icone => icone.remove());

  // Limpar a seleção de pneu
  const pneuSelecionado = document.querySelector('input[name="tipoPneu"]:checked');
  if (pneuSelecionado) {
    pneuSelecionado.checked = false;
  }
}
