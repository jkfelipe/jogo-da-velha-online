// Simulando uma "base de dados" para armazenar os usuários e suas mensagens
let usuarios = {};   // Objeto para armazenar os usuários
let mensagens = [];  // Array para armazenar mensagens

// Getter para obter todos os usuários
export function getUsuarios() {
    return usuarios;
}

// Setter para adicionar ou modificar um usuário
export function setUsuario(id, dadosUsuario) {
    usuarios[id] = dadosUsuario;
}

// Getter para obter todas as mensagens
export function getMensagens() {
    return mensagens;
}

// Setter para adicionar uma nova mensagem
export function addMensagem(mensagem) {
    mensagens.push(mensagem);
}
