export default function handler(req, res) {

    let message;
    
    if (req.method === 'GET') {
        // const nome = req.query.nome;
        const { nome, sobrenome, idade } = req.query;        

        res.status(200).json({
            message: `Nome: ${nome}, Sobrenome: ${sobrenome}, Idade: ${idade}`,
        })

    } else {
        res.status(405).json({ message: 'Método não permitido' });
    };

    res.json({
        message
    });

};