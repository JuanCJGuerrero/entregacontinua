const grupoId = localStorage.getItem("grupoAtual");

// Containers e inputs
const listaIntegrantes = document.getElementById("listaIntegrantes");
const materiasContainer = document.getElementById("materiasContainer");
const novaMateriaInput = document.getElementById("novaMateria");
const addMateriaBtn = document.getElementById("addMateriaBtn");

const objetivosContainer = document.getElementById("objetivosContainer");
const novoObjetivoInput = document.getElementById("novoObjetivo");
const addObjetivoBtn = document.getElementById("addObjetivoBtn");

const chatContainer = document.getElementById("chatContainer");
const mensagemInput = document.getElementById("mensagemInput");
const sendMsgBtn = document.getElementById("sendMsgBtn");

function carregarGrupo() {
  if (!grupoId) {
    alert("Nenhum grupo selecionado!");
    window.location.href = "ListagemGrupo.html";
    return;
  }

  const grupos = JSON.parse(localStorage.getItem("grupos")) || [];
  const grupo = grupos.find(g => g.id == grupoId);

  if (!grupo) {
    alert("Grupo não encontrado!");
    window.location.href = "ListagemGrupo.html";
    return;
  }

  document.getElementById("nomeGrupo").textContent = grupo.nome;
  document.getElementById("visibilidadeGrupo").textContent = grupo.visibilidade.charAt(0).toUpperCase() + grupo.visibilidade.slice(1);

  // Integrantes
  listaIntegrantes.innerHTML = "";
  grupo.integrantes.forEach(email => {
    const li = document.createElement("li");
    li.textContent = email;
    listaIntegrantes.appendChild(li);
  });

  // Matérias
  if (!grupo.materias) grupo.materias = [];
  atualizarMaterias(grupo);

  // Objetivos
  if (!grupo.objetivos) grupo.objetivos = [];
  atualizarObjetivos(grupo);

  // Chat
  if (!grupo.chat) grupo.chat = [];
  atualizarChat(grupo);
}

// Atualiza visual de matérias
function atualizarMaterias(grupo) {
  materiasContainer.innerHTML = "";
  grupo.materias.forEach((mat, index) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = mat;
    span.addEventListener("click", () => {
      grupo.materias.splice(index, 1);
      salvarGrupo(grupo);
      atualizarMaterias(grupo);
    });
    materiasContainer.appendChild(span);
  });
}

// Atualiza visual de objetivos
function atualizarObjetivos(grupo) {
  objetivosContainer.innerHTML = "";
  grupo.objetivos.forEach((obj, index) => {
    const li = document.createElement("li");
    li.textContent = obj;
    li.addEventListener("click", () => {
      grupo.objetivos.splice(index, 1);
      salvarGrupo(grupo);
      atualizarObjetivos(grupo);
    });
    objetivosContainer.appendChild(li);
  });
}

// Atualiza chat
function atualizarChat(grupo) {
  chatContainer.innerHTML = "";
  grupo.chat.forEach(msg => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${msg.usuario}:</strong> ${msg.texto}`;
    chatContainer.appendChild(p);
  });
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Salva grupo no localStorage
function salvarGrupo(grupo) {
  const grupos = JSON.parse(localStorage.getItem("grupos")) || [];
  const index = grupos.findIndex(g => g.id == grupo.id);
  grupos[index] = grupo;
  localStorage.setItem("grupos", JSON.stringify(grupos));
}

// Eventos
addMateriaBtn.addEventListener("click", () => {
  const valor = novaMateriaInput.value.trim();
  if (valor) {
    const grupos = JSON.parse(localStorage.getItem("grupos"));
    const grupo = grupos.find(g => g.id == grupoId);
    grupo.materias.push(valor);
    salvarGrupo(grupo);
    atualizarMaterias(grupo);
    novaMateriaInput.value = "";
  }
});

addObjetivoBtn.addEventListener("click", () => {
  const valor = novoObjetivoInput.value.trim();
  if (valor) {
    const grupos = JSON.parse(localStorage.getItem("grupos"));
    const grupo = grupos.find(g => g.id == grupoId);
    grupo.objetivos.push(valor);
    salvarGrupo(grupo);
    atualizarObjetivos(grupo);
    novoObjetivoInput.value = "";
  }
});

sendMsgBtn.addEventListener("click", () => {
  const texto = mensagemInput.value.trim();
  if (texto) {
    const grupos = JSON.parse(localStorage.getItem("grupos"));
    const grupo = grupos.find(g => g.id == grupoId);
    grupo.chat.push({ usuario: "Você", texto });
    salvarGrupo(grupo);
    atualizarChat(grupo);
    mensagemInput.value = "";
  }
});

// Botão voltar
document.getElementById("voltarBtn").addEventListener("click", () => {
  localStorage.removeItem("grupoAtual");
  window.location.href = "ListagemGrupo.html";
});

// Inicializa
window.addEventListener("DOMContentLoaded", carregarGrupo);
