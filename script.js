console.log("JS carregado!");
console.log(document.getElementById("formUsuario"))

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
    const response = await fetch('http://localhost:3000/usuarios', {
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

