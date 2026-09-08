# Investly — MVC simplificado

Estrutura baseada no `app-vazio.zip` enviado como exemplo.

## Estrutura
investly-mvc/
├── app.js
├── package.json
├── config/
└── app/
    ├── controllers/
    │   └── controller.js
    ├── models/
    │   └── model.js
    ├── routes/
    │   └── router.js
    ├── public/
    │   ├── css/
    │   │   └── style.css
    │   ├── js/
    │   │   └── main.js
    │   └── imagem/
    └── views/
        ├── pages/
        └── partials/

## MVC simplificado

- `model.js`: dados temporários usados pelas páginas.
- `controller.js`: funções que renderizam páginas e recebem formulários.
- `router.js`: todas as rotas GET/POST e validações com express-validator.
- `views/pages`: páginas EJS.
- `views/partials`: elementos reaproveitados como header, footer, sidebar e navegação mobile.

## Dependências

Somente:
- express
- ejs
- express-validator

Não há Bootstrap, banco de dados, sessão, Chart.js ou outra biblioteca.

## Executar

1. `npm install`
2. `npm start`
3. Acessar `http://localhost:3000`

Os dados são demonstrativos. Os formulários possuem validação, mas não persistem dados em banco porque nenhuma tecnologia de banco foi adicionada.
