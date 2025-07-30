const form = document.getElementById("formUsuario");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const cargoInput = document.getElementById("cargo");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function salvarUsuarios() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita o envio padrão do formulário

  const novoUsuario = {
    nome: nomeInput.value.trim(),
    email: emailInput.value.trim(),
    cargo: cargoInput.value.trim()
  };

  // Validação de campos vazios
  if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.cargo) {
    alert("Preencha todos os campos!");
    return;
  }

  // Validação de formato do email
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoUsuario.email);
  if (!emailValido) {
    alert("Email inválido!");
    return;
  }

  // Verificação de email já cadastrado
  const jaExiste = usuarios.some(u => u.email === novoUsuario.email);
  if (jaExiste) {
    alert("Esse email já está cadastrado!");
    return;
  }

  // Salvar novo usuário
  usuarios.push(novoUsuario);
  salvarUsuarios();
  form.reset();
  console.log("Usuário cadastrado:", novoUsuario);
});

//Form registro

const emailRegistroInput = document.getElementById("emailRegistro");

// Remove espaços indesejados
const emailDigitado = emailRegistroInput.value.trim();

document.addEventListener("DOMContentLoaded", function () {
  // Impede rolagem inicialmente
  document.body.style.overflow = "hidden";

  // Seleciona o link e o container do formulário de registro
  const linkRegistro = document.querySelector('.footer-text a');
  const registroContainer = document.querySelector('.registro');

  // Garante que o formulário esteja oculto
  registroContainer.classList.remove("show");

  // Evento de clique no link
  linkRegistro.addEventListener("click", function (e) {
    e.preventDefault();

    // Mostra o formulário de registro
    registroContainer.classList.add("show");

    // Libera rolagem
    document.body.style.overflow = "auto";

    // Rola até o formulário
    registroContainer.scrollIntoView({ behavior: "smooth" });
  });
});