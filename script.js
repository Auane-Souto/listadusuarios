console.log("JS carregado!");
console.log(document.getElementById("formUsuario"))
console.log(document.getElementById("formRegistro"))

const form = document.getElementById("formUsuario");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const cargoInput = document.getElementById("cargo");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Form de cadastro enviado!")

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

    // Envia para o backend
  try {
    const response = await fetch('http://localhost/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoUsuario)
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.mensagem || "Usuário cadastrado com sucesso!");
      form.reset();
    } else {
      alert(data.erro || "Erro ao cadastrar usuário.");
    }
  } catch (error) {
    alert("Erro de conexão com o servidor.");
  }
});

//Form registro

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

    //  Registro
const formRegistro = document.getElementById("formRegistro");
const nomeCompletoInput = document.getElementById("nomeCompleto");
const emailRegistroInput = document.getElementById("emailRegistro");
const senhaInput = document.getElementById("senha");

formRegistro.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Form de registro enviado!")

  const novoRegistro = {
    nome: nomeCompletoInput.value.trim(),
    email: emailRegistroInput.value.trim(),
    senha: senhaInput.value.trim()
  };

  if (!novoRegistro.nome || !novoRegistro.email || !novoRegistro.senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoRegistro.email);
  if (!emailValido) {
    alert("Email inválido!");
    return;
  }

  try {
    const response = await fetch('http://localhost/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoRegistro)
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.mensagem || "Registro realizado com sucesso!");
      formRegistro.reset();
    } else {
      alert(data.erro || "Erro ao registrar usuário.");
    }
  } catch (error) {
    alert("Erro de conexão com o servidor.");
  }
});