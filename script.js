// script.js

document.getElementById('placaForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const tipoVeiculo = document.getElementById('tipoVeiculo').value;
    const placa = document.getElementById('placa').value.toUpperCase();

    const veiculo = { nome, telefone, tipoVeiculo, placa };

    // Verificar duplicidade
    const db = firebase.database();
    const referencia = db.ref('veiculos');

    // Verificar se a placa já existe
    const placaSnapshot = await referencia.orderByChild('placa').equalTo(placa).once('value');
    if (placaSnapshot.exists()) {
        document.getElementById('mensagem').innerText = 'Erro: Placa já cadastrada.';
        document.getElementById('mensagem').style.color = 'red';
        return;
    }

    // Verificar se o telefone já existe
    const telefoneSnapshot = await referencia.orderByChild('telefone').equalTo(telefone).once('value');
    if (telefoneSnapshot.exists()) {
        document.getElementById('mensagem').innerText = 'Erro: Telefone já cadastrado.';
        document.getElementById('mensagem').style.color = 'red';
        return;
    }

    // Se não houver duplicidade, armazene os dados
    referencia.push(veiculo)
        .then(() => {
            document.getElementById('mensagem').innerText = 'Veículo cadastrado com sucesso!';
            document.getElementById('mensagem').style.color = 'green';
            document.getElementById('placaForm').reset();
            
        })
        .catch((error) => {
            document.getElementById('mensagem').innerText = 'Erro ao cadastrar: ' + error.message;
            document.getElementById('mensagem').style.color = 'red';
        });
});
