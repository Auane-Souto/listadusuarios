const form = document.getElementById("formUsuario");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const cargoInput = document.getElementById("cargo");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function salvarUsuarios() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // evita o envio padrão do formulário

  const novoUsuario = {
    nome: nomeInput.value.trim(),
    email: emailInput.value.trim(),
    cargo: cargoInput.value.trim()
  };

  // validação de campos vazios
  if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.cargo) {
    alert("Preencha todos os campos!");
    return;
  }

  // validação de formato do email
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoUsuario.email);
  if (!emailValido) {
    alert("Email inválido!");
    return;
  }

  // verificação de email já cadastrado
  const jaExiste = usuarios.some(u => u.email === novoUsuario.email);
  if (jaExiste) {
    alert("Esse email já está cadastrado!");
    return;
  }

  // salvar novo usuário
  usuarios.push(novoUsuario);
  salvarUsuarios();
  form.reset();
  console.log("Usuário cadastrado:", novoUsuario);
});
