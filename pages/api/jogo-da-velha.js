// pages/api/jogo-da-velha.js

export default function handler(req, res) {

  //recebendo solicitaçõs por POST
  const { method } = req

  switch (method) {

    case 'POST':
      const { acao } = req.query;

      if (!acao) {
        return res.status(400).json({ error: 'A variável "testar" não foi fornecida.' });
      }

      if (acao === 'teste') {
        return res.status(200).json({ message: 'Você enviou "teste" na query string.' });
      } else if (acao === 'outroValor') {
        return res.status(200).json({ message: 'Você enviou "outroValor" na query string.' });
      } else {
        return res.status(200).json({ message: `Você enviou "${testar}" na query string.` });
      }
      
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Método ${method} não permitido`);
      
  }
}
