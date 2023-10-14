# ApiRestAdonisJs

## Uma API RESTful para Registro de Usuários e Autenticação

Descrição
Este projeto é uma API RESTful construída com o framework AdonisJS para o registro de usuários e autenticação. Ele fornece um mecanismo seguro para que os usuários se registrem, autentiquem e acessem recursos protegidos por token.
<br /><br />

### Funcionalidades

<br />
Registro de Usuários com Senha Criptografada
<br />
Autenticação de Usuários com Token
<br />
Recursos Protegidos por Token
<br />
CRUD de Clientes (Rotas Protegidas)
<br />
CRUD de Vendas (Rotas Protegidas)
<br />
CRUD de Produtos (Rotas Protegidas)
<br /><br />

### Tecnologias Utilizadas

<br />
AdonisJS
<br />
MySQL (Banco de Dados)
<br />
Docker (Para Ambiente de Desenvolvimento)
<br />...
<br />

### Documentação do AdonisJS

Você pode encontrar a documentação oficial do AdonisJS [aqui](https://adonisjs.com/).

### Pré-requisitos

<br />
Node.js (Versão 18.0.0)
<br />
npm (Gerenciador de Pacotes)
<br />
Docker (Para Ambiente de Desenvolvimento)
<br />
...
<br /><br />

### Instalação

<br />
Clone este repositório:
<br />

```sh
git clone git@github.com:luishrs/ApiRestAdonisJs.git
```

<br />
Navegue até o diretório do projeto:
<br />

```sh
cd ApiRestAdonisJs
```

<br />

#### Renomear arquivo ".env.example" para ".env"

<br /> 
Em seguida, execute o seguinte comando para configurar seu ambiente e iniciar o serviço do backend:

```sh
npm run prestart
```

<br />

O comando npm run prestart realiza várias etapas essenciais para a inicialização do projeto, incluindo a instalação de dependências, a configuração do ambiente, a execução das migrações de banco de dados e a inserção de dados fictícios no banco . Depois disso, você pode iniciar o serviço do backend usando:
<br />

```sh
npm run dev
```

<br />

### Conectando ao Banco de Dados

Para interagir com o banco de dados e gerenciar seus dados de forma visual, você pode usar uma aplicação de interface gráfica de banco de dados de sua escolha. Recomendamos o uso da extensão "MySQL" para o Visual Studio Code, que oferece funcionalidades poderosas e é uma opção conveniente para desenvolvedores que já estão familiarizados com o ambiente do VS Code.

No entanto, se você preferir usar uma aplicação independente, existem várias opções populares disponíveis:

1. **MySQL Workbench**: Uma aplicação oficial da Oracle para gerenciar bancos de dados MySQL. Você pode baixá-la [aqui](https://www.mysql.com/products/workbench/).

2. **DBeaver**: Uma ferramenta de banco de dados universal que suporta vários sistemas de gerenciamento de bancos de dados, incluindo MySQL. Você pode baixá-la [aqui](https://dbeaver.io/).

3. **phpMyAdmin**: Uma aplicação web para gerenciar bancos de dados MySQL. É acessível através de um navegador. Você pode instalá-lo seguindo as instruções disponíveis [aqui](https://www.phpmyadmin.net/).

Escolha a aplicação que melhor se adapte às suas necessidades e preferências. Depois de instalá-la, você poderá usar a interface gráfica para conectar-se ao seu banco de dados, criar tabelas, inserir dados e realizar outras tarefas de gerenciamento.

Lembre-se de configurar a conexão com o banco de dados **usuário: root**, **password: betest**, demais informações são fornecidas no arquivo `.env` do projeto.

### Testando a API

Para testar a API e realizar solicitações, recomendamos o uso de uma ferramenta de cliente HTTP, como o [Insomnia](https://insomnia.rest/) ou o [Thunder Client](https://www.thunderclient.io/). Você pode escolher qualquer uma dessas ferramentas para começar a fazer solicitações à API.

<br />
Para registrar um usuário, faça uma requisição POST http://localhost:3333/register com o corpo da seguinte forma:

```sh
{
"email": "seuusername",
"password": "suasenha"
}
```

<br />

O retorno será no seguinte formato.

```sh
{
  "email": "seuemail@email.com",
  "password": "$scrypt$n=16384,r=8,p=1$WC/B3zZ0m6uG7QKwikad2A$NfyLulR3+DRLJIkSrABKtkjc4XbCgrOXw5K0QIJTWZ67m850Crtg27U8KGX9DgurgnMAhCIvuf02aKd3tFQhXQ",
  "created_at": "2023-10-13T15:49:34.835-03:00",
  "updated_at": "2023-10-13T15:49:34.837-03:00",
  "id": 2
}
```

<br />

Autenticação de Usuários após o Endpoint: POST http://localhost:3333/login
<br />
<br />
Para autenticar um usuário, faça uma requisição POST com o corpo da seguinte forma:

```sh
{
"email": "seuusername",
"password": "suasenha"
}
```

<br />
A resposta incluirá um token de autenticação.
<br />

```sh
{
  "message": "user successfully logged in",
  "token": {
    "type": "bearer",
    "token": "Ng.7EhvXVHCHs_-zijYyrDx0fVbbv6BIdsv2Gi0Mtbn4HnHP_sLG1vJ6bsA9prJ"
  }
}

```

<br /><br />

### Acesso a Recursos Protegidos

As seguintes rotas são protegidas e requerem autenticação por meio do token recebido após o login, que deve ser incluído no cabeçalho de autenticação (Auth) com o tipo "Bearer" para ser autorizado:

- **/clients**: Permite operações CRUD (Criar, Ler, Atualizar e Deletar) de Clientes.

- **/products**: Permite operações CRUD de Produtos.

- **/sales**: Permite operações CRUD de Vendas.

Para acessar essas rotas, certifique-se de que o token de autenticação esteja corretamente configurado no cabeçalho de suas solicitações, como no exemplo a seguir:

<br />

### Rotas<br />

/clients: CRUD de Clientes (Requer Autenticação)

Para registrar um cliente, faça uma requisição POST http://localhost:3333/clients com o corpo da seguinte forma:

```sh
{
  "name":"Nome do Cliente",
  "cpf": "12345678963",
  "user_id": 2
}
```

<br />
Obs: o user_id deve ser o mesmo recebino na rota POST http://localhost:3333/register

O retorno será no seguinte formato.

```sh
{
  "message": "Client successfully registered",
  "data": {
    "name": "Nome do Cliente",
    "cpf": "12345678963",
    "user_id": 2,
    "created_at": "2023-10-13T16:46:52.878-03:00",
    "updated_at": "2023-10-13T16:46:52.878-03:00",
    "id": 1
  }
}
```

<br />
A rota GET/clients ou GET http://localhost:3333/clientes/:id, retorno será no seguinte formato.

```sh
[
  {
    "id": 1,
    "name": "Nome do Cliente",
    "cpf": "12345678963",
    "user_id": 2,
    "created_at": "2023-10-13T16:46:52.000-03:00",
    "updated_at": "2023-10-13T16:46:52.000-03:00",
    "addresses": [
      {
        "id": 1,
        "state": "RS",
        "city": "Pelotas",
        "neighborhood": "Areal",
        "street": "Rua UM",
        "number": "1234",
        "client_id": 1,
        "created_at": null,
        "updated_at": null
      }
    ],
    "telephones": [
      {
        "id": 1,
        "number": "999887766",
        "client_id": 1,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 2,
        "number": "999336625",
        "client_id": 1,
        "created_at": null,
        "updated_at": null
      }
    ],
    "user": {
      "id": 2,
      "email": "seuemail@email.com",
      "password": "$scrypt$n=16384,r=8,p=1$WC/B3zZ0m6uG7QKwikad2A$NfyLulR3+DRLJIkSrABKtkjc4XbCgrOXw5K0QIJTWZ67m850Crtg27U8KGX9DgurgnMAhCIvuf02aKd3tFQhXQ",
      "created_at": "2023-10-13T15:49:34.000-03:00",
      "updated_at": "2023-10-13T15:49:34.000-03:00"
    },
    "sales": []
  }
]

```

A rota PUT http://localhost:3333/clientes/:id necessitara das mesmas insformaçoes na POST

```sh
{
  "name":"Nome do Cliente Atualizado",
  "cpf": "00000000000",
  "user_id": 2
}
```

O retorno será no seguinte formato.

```sh
{
  "message": "Client successfully updated",
  "data": {
    "id": 1,
    "name": "Nome do Cliente Atualizado",
    "cpf": "00000000000",
    "user_id": 2,
    "created_at": "2023-10-13T16:46:52.000-03:00",
    "updated_at": "2023-10-13T17:00:01.348-03:00"
  }
}
```

A rota DELETE http://localhost:3333/clients/:id, o retorno será no seguinte formato.

```sh
{
  "message": "Client successfully deleted",
  "data": {
    "id": 2,
    "name": "Nome do Cliente para deletar",
    "cpf": "85296374147",
    "user_id": 2,
    "created_at": "2023-10-13T17:02:07.000-03:00",
    "updated_at": "2023-10-13T17:02:07.000-03:00"
  }
}
```

<br />
/products: CRUD de Produtos (Requer Autenticação)

Para registrar um produto, faça uma requisição POST http://localhost:3333/products com o corpo da seguinte forma:

```sh
{
  "name": "Livro 2",
  "author": "autor 2",
  "editor":"editora 2",
  "price":"8"
}

```

O retorno será no seguinte formato.

```sh
{
  "name": "Livro 2",
  "author": "autor 2",
  "editor": "editora 2",
  "price": "8",
  "created_at": "2023-10-13T17:12:47.920-03:00",
  "updated_at": "2023-10-13T17:12:47.920-03:00",
  "id": 3
}
```

Para listar todos os produtos, faça uma requisição GET http://localhost:3333/products ou GET http://localhost:3333/products/:id, o retorno será no seguinte formato.

```sh
[
  {
    "id": 3,
    "name": "Livro 2 atualizado",
    "author": "autor 2 atualizado",
    "editor": "editora 2 atualizado",
    "price": 3,
    "created_at": "2023-10-13T17:12:47.000-03:00",
    "updated_at": "2023-10-13T17:14:57.000-03:00"
  },
  {
    "id": 2,
    "name": "Livro 1",
    "author": "autor 1",
    "editor": "editora 1",
    "price": 8,
    "created_at": "2023-10-13T17:12:07.000-03:00",
    "updated_at": "2023-10-13T17:12:07.000-03:00"
  },
]

```

Para atualizar um produto, faça uma requisição PUT http://localhost:3333/products/:id com o corpo da seguinte forma:

```sh
{
  "name": "Livro 2 atualizado",
  "author": "autor 2 atualizado",
  "editor":"editora 2 atualizado",
  "price":3
}
```

<br />
o retorno será no seguinte formato.

```sh
{
  "id": 3,
  "name": "Livro 2 atualizado",
  "author": "autor 2 atualizado",
  "editor": "editora 2 atualizado",
  "price": 3,
  "created_at": "2023-10-13T17:12:47.000-03:00",
  "updated_at": "2023-10-13T17:14:57.886-03:00"
}
```

<br />
Para deletar um produto, faça uma requisição DELETE http://localhost:3333/products/:id com o corpo da seguinte forma:

```sh
{
  "message": "Product deleted",
  "product": {
    "id": 5,
    "name": "Livro para ser deletado",
    "author": "autor ",
    "editor": "editora",
    "price": 6,
    "created_at": "2023-10-13T17:23:36.000-03:00",
    "updated_at": "2023-10-13T17:23:36.000-03:00"
  }
}
```

<br />
/sales: CRUD de Vendas (Requer Autenticação)

Para Criar uma venda, faça uma requisição POST http://localhost:3333/sales com o corpo da seguinte forma:

```sh
{
  "client_id":1,
  "product_id":1,
  "quantity":2,
  "unit_price":5
}
```

<br />
o retorno será no seguinte formato.

```sh
{
  "client_id": 1,
  "product_id": 1,
  "quantity": 2,
  "unit_price": 5,
  "total_price": 10,
  "created_at": "2023-10-13T17:31:08.688-03:00",
  "updated_at": "2023-10-13T17:31:08.688-03:00",
  "id": 1
}
```

<br />
Para filtrar uma venda pelo ano/mês, faça uma requisição GET http://localhost:3333/sales nesse formato:<br />
http://localhost:3333/sales/filter?year=2023&month=1 onde o mês e anos foram descritos, o retorno será no seguinte formato.

```sh
[
  {
    "id": 3,
    "client_id": 1,
    "product_id": 1,
    "quantity": 5,
    "unit_price": 3,
    "total_price": 15,
    "created_at": "2023-01-03T00:00:00.000-03:00",
    "updated_at": "2023-01-03T00:00:00.000-03:00",
    "product": {
      "id": 1,
      "name": "Naruto",
      "author": "naruto",
      "editor": "xablau",
      "price": 8,
      "created_at": "2023-10-13T14:55:54.000-03:00",
      "updated_at": "2023-10-13T14:55:54.000-03:00"
    },
    "client": {
      "id": 1,
      "name": "Nome do Cliente Atualizado",
      "cpf": "00000000000",
      "user_id": 2,
      "created_at": "2023-10-13T16:46:52.000-03:00",
      "updated_at": "2023-10-13T17:00:01.000-03:00"
    }
  }
]
```

<br />
Para listar todas as vendas, faça uma requisição GET http://localhost:3333/sales, o retorno será no seguinte formato.

```sh
[
  {
    "id": 2,
    "client_id": 1,
    "product_id": 1,
    "quantity": 5,
    "unit_price": 3,
    "total_price": 15,
    "created_at": "2023-10-13T17:32:26.000-03:00",
    "updated_at": "2023-10-13T17:32:37.000-03:00",
    "client": {
      "id": 1,
      "name": "Nome do Cliente Atualizado",
      "cpf": "00000000000",
      "user_id": 2,
      "created_at": "2023-10-13T16:46:52.000-03:00",
      "updated_at": "2023-10-13T17:00:01.000-03:00"
    },
    "product": {
      "id": 1,
      "name": "Naruto",
      "author": "naruto",
      "editor": "xablau",
      "price": 8,
      "created_at": "2023-10-13T14:55:54.000-03:00",
      "updated_at": "2023-10-13T14:55:54.000-03:00"
    }
  },
  {
    "id": 1,
    "client_id": 1,
    "product_id": 1,
    "quantity": 2,
    "unit_price": 5,
    "total_price": 10,
    "created_at": "2023-10-13T17:31:08.000-03:00",
    "updated_at": "2023-10-13T17:31:08.000-03:00",
    "client": {
      "id": 1,
      "name": "Nome do Cliente Atualizado",
      "cpf": "00000000000",
      "user_id": 2,
      "created_at": "2023-10-13T16:46:52.000-03:00",
      "updated_at": "2023-10-13T17:00:01.000-03:00"
    },
    "product": {
      "id": 1,
      "name": "Naruto",
      "author": "naruto",
      "editor": "xablau",
      "price": 8,
      "created_at": "2023-10-13T14:55:54.000-03:00",
      "updated_at": "2023-10-13T14:55:54.000-03:00"
    }
  },
  {
    "id": 3,
    "client_id": 1,
    "product_id": 1,
    "quantity": 5,
    "unit_price": 3,
    "total_price": 15,
    "created_at": "2023-01-03T00:00:00.000-03:00",
    "updated_at": "2023-01-03T00:00:00.000-03:00",
    "client": {
      "id": 1,
      "name": "Nome do Cliente Atualizado",
      "cpf": "00000000000",
      "user_id": 2,
      "created_at": "2023-10-13T16:46:52.000-03:00",
      "updated_at": "2023-10-13T17:00:01.000-03:00"
    }

]
```
