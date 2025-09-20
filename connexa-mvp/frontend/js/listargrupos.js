// Função para carregar os grupos do localStorage
function carregarGrupos() {
  const grupos = JSON.parse(localStorage.getItem("grupos")) || [];
  const groupList = document.getElementById("groupList");

  groupList.innerHTML = ""; // limpa a lista antes de renderizar

  if (grupos.length === 0) {
    groupList.innerHTML = "<p style='text-align:center;color:#636e72;'>Nenhum grupo criado ainda.</p>";
    return;
  }

  grupos.forEach(grupo => {
    const div = document.createElement("div");
    div.classList.add("group");

    div.innerHTML = `
      <span class="group-name">${grupo.nome}</span>
      <button onclick="entrarNoGrupo(${grupo.id})">Entrar</button>
    `;

    groupList.appendChild(div);
  });
}

// Função ao clicar em "Entrar"
function entrarNoGrupo(id) {
  localStorage.setItem("grupoAtual", id);
  window.location.href = "TelaGrupo.html";
}



// Carrega os grupos ao abrir a página
window.addEventListener("DOMContentLoaded", carregarGrupos);
