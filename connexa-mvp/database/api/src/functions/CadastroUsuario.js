    document.getElementById('cadastroForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const form = e.target;
        const dados = {
            nomeCompleto: form.nomeCompleto.value,
            email: form.email.value,
            curso: form.curso.value,
            semestre: form.semestre.value,
            senha: form.senha.value
        };
        try {
            const resp = await fetch('https://bancoconexa.azurewebsites.net/api/CadastroBanco', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            const resultado = await resp.json();
            if (resp.status === 201) {
                document.getElementById('mensagem').textContent = `Cadastro realizado! ID: ${resultado.id}`;
                form.reset();
            } else {
                document.getElementById('mensagem').textContent = resultado.erro || 'Erro ao cadastrar.';
            }
        } catch (err) {
            document.getElementById('mensagem').textContent = 'Erro de conexão com o servidor.';
        }
    });