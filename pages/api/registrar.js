const { v4: uuidv4 } = require('uuid');  // Biblioteca para gerar UUIDs

// Simulando uma "base de dados" para armazenar os usuários e suas mensagens
const usuarios = {};
const mensagens = [];

// Rota para registrar um novo usuário
export default function handler(req, res) {
    if (req.method === 'POST') {
        const idUsuario = uuidv4();  // Gerando um UUID único
        usuarios[idUsuario] = { mensagens: [] };

        console.log('Novo usuário registrado: ${idUsuario}');

        res.json({
            mensagem: 'Usuário registrado com sucesso!',
            idUsuario: idUsuario
        });
    };
};