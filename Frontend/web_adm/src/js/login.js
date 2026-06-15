const nome = document.getElementById("nome")
const senha = document.getElementById("senha")
const email = document.getElementById("email")
const entrar = document.getElementById("entrar")
const nivel_acesso = 1

const login = async (nome, email, senha, nivel_acesso) => {
    const OPTIONS = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, nivel_acesso })
    }

    const response = await fetch("http://localhost:8080/v1/sorvetudos/admin/auth/login", OPTIONS)
    const data = await response.json()

    return { response, data }
}

const fazerLogin = async () => {
    const { response, data } = await login(nome.value, email.value, senha.value, nivel_acesso)

    if (response.ok) {
        localStorage.setItem('token', data.response.auth[0].token)
        window.location.href = "dashboard_modelo.html" // redireciona na hora
    } else {
        console.error("Login inválido:", data)
        // aqui você pode mostrar uma mensagem de erro pro usuário
    }
}

entrar.addEventListener("click", fazerLogin)