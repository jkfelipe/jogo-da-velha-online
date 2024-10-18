
export default function handler (req, res) {
    if(req.method === 'GET'){
        const { idRemetente, idDestinatario, mensagem } = req.query;

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
    }
}