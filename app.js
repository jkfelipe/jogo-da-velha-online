const express = require('express');
const { v4: uuidv4 } = require('uuid');  // Biblioteca para gerar UUIDs
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Simulando uma "base de dados" para armazenar os usuários e suas mensagens
const usuarios = {};
const mensagens = [];

// Rota para registrar um novo usuário
app.post('/registrar', (req, res) => {
    const idUsuario = uuidv4();  // Gerando um UUID único
    usuarios[idUsuario] = { mensagens: [] };

    console.log(`Novo usuário registrado: ${idUsuario}`);

    res.json({
        mensagem: 'Usuário registrado com sucesso!',
        idUsuario: idUsuario
    });
});


// Rota para registrar um novo usuário
app.get('/testar-comunicacao', (req, res) => {

    const nome = req.query.nome;
    console.log(`req variavel: ${nome}`);

    res.json({
        mensagem: 'Teste recebido',
    });
});

// Rota para enviar uma mensagem de um usuário para outro
app.post('/enviar-mensagem', (req, res) => {
    const { idRemetente, idDestinatario, mensagem } = req.body;

    // Verifica se o remetente e o destinatário existem
    if (!usuarios[idRemetente] || !usuarios[idDestinatario]) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    // Armazenando a mensagem para o destinatário
    const novaMensagem = {
        de: idRemetente,
        para: idDestinatario,
        conteudo: mensagem
    };

    usuarios[idDestinatario].mensagens.push(novaMensagem);
    mensagens.push(novaMensagem);  // Para fins de registro geral

    console.log(`Mensagem de ${idRemetente} para ${idDestinatario}: "${mensagem}"`);

    res.json({
        mensagem: 'Mensagem enviada com sucesso!',
        detalhes: novaMensagem
    });
});

// Rota para verificar as mensagens recebidas por um usuário
app.get('/mensagens/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;

    if (!usuarios[idUsuario]) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json({
        mensagens: usuarios[idUsuario].mensagens
    });
});

// Inicializa o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
