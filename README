# Jogo da Velha Online

Este projeto é uma implementação básica do jogo da velha online, utilizando comunicação em socket com Node.js. O objetivo inicial é testar e demonstrar a troca de mensagens em tempo real entre jogadores.

Este é apenas um teste de comunicação com sockets, mas novas tecnologias serão aplicadas em futuras branches. Quando essas funcionalidades estiverem finalizadas, elas serão mescladas à branch principal do projeto.

## Funcionalidades

- Registrar usuários e obter um ID único.
- Enviar mensagens de um usuário para outro.
- Verificar as mensagens recebidas por um usuário.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **UUID** (para geração de IDs únicos)
- **Postman** (para testar a API)

## Como Executar o Projeto

1. **Instalar Dependências:**

   Após clonar o repositório, instale as dependências do projeto com:

   ```bash
   npm install
   ```

2. **Iniciar o Servidor:**

   Execute o comando abaixo para iniciar o servidor:

   ```bash
   node app.js
   ```

   O servidor estará disponível em `http://localhost:3000`.

## Testando a API com o Postman

### 1. Registrar um Usuário

- **Método:** POST
- **URL:** `http://localhost:3000/registrar`

Essa requisição registra um novo usuário e retorna um ID único para ser usado nas próximas requisições.

**Exemplo de Resposta:**

```json
{
  "mensagem": "Usuário registrado com sucesso!",
  "idUsuario": "7c6d1594-4d32-4bcb-9332-d17760af67fb"
}
```

### 2. Enviar uma Mensagem

- **Método:** POST
- **URL:** `http://localhost:3000/enviar-mensagem`
- **Corpo (JSON):**

```json
{
  "idRemetente": "7c6d1594-4d32-4bcb-9332-d17760af67fb",
  "idDestinatario": "8b9f191d-9dfb-4b90-81a3-82f4379ae1d1",
  "mensagem": "Olá, como você está?"
}
```

Essa requisição envia uma mensagem de um usuário (identificado por `idRemetente`) para outro (identificado por `idDestinatario`).

**Exemplo de Resposta:**

```json
{
  "mensagem": "Mensagem enviada com sucesso!",
  "detalhes": {
    "de": "7c6d1594-4d32-4bcb-9332-d17760af67fb",
    "para": "8b9f191d-9dfb-4b90-81a3-82f4379ae1d1",
    "conteudo": "Olá, como você está?"
  }
}
```

### 3. Verificar Mensagens Recebidas

- **Método:** GET
- **URL:** `http://localhost:3000/mensagens/{idUsuario}`

Substitua `{idUsuario}` pelo ID do usuário cujas mensagens você deseja verificar.

**Exemplo de Resposta:**

```json
{
  "mensagens": [
    {
      "de": "7c6d1594-4d32-4bcb-9332-d17760af67fb",
      "para": "8b9f191d-9dfb-4b90-81a3-82f4379ae1d1",
      "conteudo": "Olá, como você está?"
    }
  ]
}
```

## Dicas de Uso com o Postman

- **Histórico de requisições**: O Postman salva um histórico de todas as requisições que você já fez, facilitando repetir testes.
- **Coleções**: Você pode agrupar todas as suas requisições em uma coleção para organizar os testes.
- **Variáveis de ambiente**: Use variáveis para tornar os testes mais dinâmicos (como IDs que mudam).
