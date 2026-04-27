# Documentação do Projeto

## Visão geral

Este projeto é uma API Express com TypeScript que expõe apenas o recurso `calcados` no momento.
A arquitetura segue um padrão em camadas simples, com separação clara entre:

- `controllers` — recebimento das requisições HTTP
- `services` — regras de negócio e validações
- `repositories` — acesso ao banco de dados via Prisma
- `database` — configuração e conexão com o Prisma
- `middlewares` — tratamento de erros centralizado

A ideia é manter o código organizado, fácil de entender e preparado para evoluir sem misturar responsabilidades.

## Arquitetura e como foi pensado

### 1. Controller

O controller é a porta de entrada da API. Ele:

- recebe o `Request` do Express
- chama o service apropriado
- devolve a resposta (`Response`)
- envia erros para o middleware de tratamento

No arquivo `server/src/controllers/CalcadoController.ts`, cada método corresponde a uma rota de CRUD.

### 2. Service

O service contém a lógica do domínio. Ele:

- valida se o recurso existe antes de atualizar ou apagar
- decide se a operação é permitida ou não
- encapsula o fluxo de negócio
- delega a persistência ao repository

Em `server/src/services/CalcadoService.ts` já existem regras como verificar se um produto foi encontrado antes de atualizar ou excluir.

### 3. Repository

O repository é responsável por conversar com o banco de dados. Ele:

- usa Prisma para executar consultas
- abstrai operações como `findMany`, `findUnique`, `create`, `update` e `delete`
- evita que o restante da aplicação dependa diretamente do cliente Prisma

O arquivo `server/src/repositories/CalcadoRepository.ts` contém essas operações de persistência.

### 4. Database

A conexão com o banco é inicializada em `server/src/database/index.ts`, onde o Prisma é instanciado e conectado.

### 5. Middleware de erro

O tratamento de erro está centralizado no arquivo `server/src/middlewares/errorHandler.ts`.
Ele captura erros lançados pelos controllers ou services e transforma em respostas HTTP consistentes.

## Rotas disponíveis

Atualmente, a API expõe apenas o recurso `calcados`.

Base URL: `http://localhost:3001`

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/calcados` | Lista todos os calçados |
| GET | `/calcados/:id` | Busca um calçado por ID |
| POST | `/calcados` | Cria um novo calçado |
| PUT | `/calcados/:id` | Atualiza um calçado existente |
| DELETE | `/calcados/:id` | Remove um calçado |
| GET | `/calcados/tamanho/:tamanho` | Lista calçados por tamanho específico |
| GET | `/calcados/marca/:marca` | Lista calçados por marca |
| GET | `/calcados/estoque/total` | Retorna o total de pares no estoque |

### Exemplo de corpo para `POST /calcados`

```json
{
  "nome_produto": "Tênis esportivo",
  "cor": "preto",
  "marca": "Marca X",
  "tamanho": 42,
  "preco": 299,
  "quantidade_em_estoque": 10
}
```

## Padrão de respostas HTTP

Durante o desenvolvimento da API, houve o cuidado de utilizar corretamente os códigos de status HTTP para representar o resultado de cada requisição, seguindo boas práticas de APIs REST.

Os principais códigos utilizados foram:

- 200 (OK) — retornado em operações bem-sucedidas, como listagens, buscas e atualizações
- 201 (Created) — utilizado quando um novo recurso é criado com sucesso
- 404 (Not Found) — retornado quando o recurso solicitado não é encontrado
- 400 (Bad Request) — utilizado em casos de dados inválidos ou falhas de validação
- 500 (Internal Server Error) — para erros inesperados no servidor

Esse padrão é aplicado nos controllers e reforçado pelo middleware de tratamento de erros, garantindo consistência nas respostas da API e facilitando o entendimento por parte de quem consome o serviço.

## Uso de IA

A utilização de Inteligência Artificial (IA) durante o desenvolvimento deste projeto teve como objetivo apoiar o aprendizado e aumentar a produtividade, sem substituir o entendimento das soluções implementadas.

Eu já possuía experiência prévia no desenvolvimento de APIs, especialmente utilizando FastAPI, o que contribuiu para a compreensão dos conceitos de arquitetura, rotas, validações e organização em camadas. No entanto, este projeto marcou meu primeiro contato prático com TypeScript.

Nesse contexto, utilizei a IA como ferramenta de apoio para:

- compreender a sintaxe do TypeScript e suas diferenças em relação ao JavaScript
- visualizar exemplos práticos de tipagem, interfaces e organização de código
- esclarecer dúvidas pontuais durante a implementação

Além disso, a IA também foi utilizada como suporte na elaboração e refinamento da documentação, ajudando a estruturar melhor as explicações e torná-las mais claras e objetivas.

Todas as decisões de implementação, organização da arquitetura e regras de negócio foram compreendidas e validadas por mim, garantindo domínio sobre o funcionamento da aplicação.

## Observações

- A implementação mantém o padrão de camadas mesmo para um CRUD simples.
- Isso facilita a manutenção futura e a adição de novos recursos.
