# Desafio 01 RocketSeat Node puro

Sem utilizar um framework eu contrui uma API utilizando os conceitos de Buffer's, para reforçar de forma prática o que aprendemos nesse módulo 01.

Como se trata de um desafio, ele necessita de alguns conhecimentos além dos abordados no módulo, então foi importante ter autonomia e pesquisar para conseguir resolver.

## Sobre o desafio

Neste desafio eu desenvolvi uma API para realizar o CRUD de _tasks_ (tarefas).

A API deve conter as seguintes funcionalidades:

- Criação de uma task.
- Listagem de todas as tasks.
- Atualização de uma task pelo `id`.
- Remover uma task pelo `id`.
- Marcar pelo `id` uma task como completa.
- E o verdadeiro desafio: Importação de tasks em massa por um arquivo CSV.

### Rotas e regras de negócio

Antes das rotas, vamos entender qual a estrutura que uma task deve ter:

- `id` - Identificador único de cada task.

- `title` - Título da task.

- `description` - Descrição detalhada da task.

- `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`.

- `created_at` - Data de quando a task foi criada.

- `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.

Rotas:

- `POST - /tasks`
  Deve ser possível criar uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.
  Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` devem ser preenchidos automaticamente, conforme a orientação das propriedades acima.

- `GET - /tasks`
  Deve ser possível listar todas as tasks salvas no banco de dados.
  Também deve ser possível realizar uma busca, filtrando as tasks pelo `title` e `description`

- `PUT - /tasks/:id`
  Deve ser possível atualizar uma task pelo `id`.
  No `body` da requisição, deve receber somente o `title` e/ou `description` para serem atualizados.
  Se for enviado somente o `title`, significa que o `description` não pode ser atualizado e vice-versa.
  Antes de realizar a atualização, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.

- `DELETE - /tasks/:id`
  Deve ser possível remover uma task pelo `id`.
  Antes de realizar a remoção, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.
- `PATCH - /tasks/:id/complete`.

## Indo além

Foram implementados:

- Validação se as propriedades `title` e `description` das rotas `POST` e `PUT` estão presentes no `body` da requisição.

- Nas rotas que recebem o `/:id`, além de validar se o `id` existe no banco de dados, retornar a requisição com uma mensagem informando que o registro não existe.

#### requisito para rodar localmente

Ter o node 18 ou maior preferencial --lts (`latest`)

## Para Rodar o projeto localmente

Primeiramente você deve fazer o git clone do projeto ou baixar o arquivo zip na sua maquina e descomparctar os arquivos em uma pasta, depois acessar a pasta com um terminal e executar os compandos abaixo.

#### para instalar as bibliotecas de depêmdencias

´´´
npm install
´´´

#### para rodar o projeto em Prod

´´´
npm start
´´´

#### para rodar o projeto em Desenvolvimento

´´´
npm run dev
´´´

Após rodar o comando o servidor será inicializado na endereço/porta `http://localhost:3333`, então você poderá utilizar qualquer padrão de requisições Rest. Ex: Postman, Insomnia, Fetch, Curl.
