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
<br />

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

bash

```sh
git clone https://github.com/seuusuario/seuprojeto.git
```

<br />
Navegue até o diretório do projeto:
<br />

```sh
cd seuprojeto
```

<br /><br />
Instale as dependências:
<br />

```sh
npm install
```

<br /><br />
Inicie o ambiente de desenvolvimento com Docker:
<br />

```sh
docker-compose up
```

Uso Registro de Usuários Endpoint: POST/register
<br />
Para registrar um usuário, faça uma requisição POST/register/ com o corpo da seguinte forma:

```sh
{
"email": "seuusername",
"password": "suasenha"
}
```

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

Autenticação de Usuários após o Endpoint: POST /login
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

#### Rotas<br />

/clients: CRUD de Clientes (Requer Autenticação)

Para registrar um cliente, faça uma requisição POST/clients/ com o corpo da seguinte forma:

```sh
{
  "name":"Nome do Cliente",
  "cpf": "12345678963",
  "user_id": 2
}
```

Obs: o user_id deve ser o mesmo recebino na rota POST/register/

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

A rota GET/clients o retorno será no seguinte formato.

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

A rota PUT/clientes/:id necessitara das mesmas insformaçoes na POST

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

A rota DELETE/clients/:id, o retorno será no seguinte formato.

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
/sales: CRUD de Vendas (Requer Autenticação)
<br />
/products: CRUD de Produtos (Requer Autenticação)
