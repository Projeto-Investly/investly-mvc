const express = require("express");
const { body } = require("express-validator");
const controller = require("../controllers/controller");

const router = express.Router();

// PAGINAS PUBLICAS
router.get("/", controller.home);
router.get("/como-funciona", controller.comoFunciona);
router.get("/aprenda", controller.aprenda);
router.get("/aprenda/artigo", controller.artigo);
router.get("/faq", controller.faq);
router.get("/sobre", controller.sobre);
router.get("/contato", controller.contato);

router.post("/contato",
    body("name").trim().notEmpty().withMessage("Informe seu nome."),
    body("email").isEmail().withMessage("Informe um e-mail válido."),
    body("message").trim().isLength({ min: 10 }).withMessage("A mensagem precisa ter pelo menos 10 caracteres."),
    controller.processarContato
);

// AUTENTICACAO
router.get("/login", controller.login);
router.post("/login",
    body("email").isEmail().withMessage("Informe um e-mail válido."),
    body("password").notEmpty().withMessage("Informe sua senha."),
    controller.processarLogin
);

router.get("/cadastro", controller.cadastro);
router.post("/cadastro",
    body("name").trim().isLength({ min: 2 }).withMessage("Informe seu nome completo."),
    body("email").isEmail().withMessage("Informe um e-mail válido."),
    body("password").isLength({ min: 6 }).withMessage("A senha precisa ter pelo menos 6 caracteres."),
    body("confirm").custom((valor, { req }) => {
        if (valor !== req.body.password) {
            throw new Error("As senhas precisam ser iguais.");
        }
        return true;
    }),
    controller.processarCadastro
);

router.get("/recuperar-senha", controller.recuperarSenha);
router.post("/recuperar-senha",
    body("email").isEmail().withMessage("Informe um e-mail válido."),
    controller.processarRecuperacao
);

router.get("/redefinir-senha", controller.redefinirSenha);
router.post("/redefinir-senha",
    body("password").isLength({ min: 6 }).withMessage("A senha precisa ter pelo menos 6 caracteres."),
    body("confirm").custom((valor, { req }) => {
        if (valor !== req.body.password) {
            throw new Error("As senhas precisam ser iguais.");
        }
        return true;
    }),
    controller.processarRedefinicao
);

// AREA DO USUARIO
router.get("/dashboard", controller.dashboard);
router.get("/financas", controller.financas);

router.get("/financas/receitas/nova", controller.novaReceita);
router.post("/financas/receitas/nova",
    body("description").trim().notEmpty().withMessage("Informe a descrição."),
    body("value").isFloat({ gt: 0 }).withMessage("Informe um valor maior que zero."),
    body("date").isISO8601().withMessage("Informe uma data válida."),
    body("category").trim().notEmpty().withMessage("Informe a categoria."),
    controller.processarReceita
);

router.get("/financas/despesas/nova", controller.novaDespesa);
router.post("/financas/despesas/nova",
    body("description").trim().notEmpty().withMessage("Informe a descrição."),
    body("value").isFloat({ gt: 0 }).withMessage("Informe um valor maior que zero."),
    body("date").isISO8601().withMessage("Informe uma data válida."),
    body("category").trim().notEmpty().withMessage("Informe a categoria."),
    controller.processarDespesa
);

router.get("/financas/historico", controller.historico);

router.get("/metas", controller.metas);
router.get("/metas/nova", controller.novaMeta);
router.post("/metas/nova",
    body("title").trim().notEmpty().withMessage("Informe o nome da meta."),
    body("target").isFloat({ gt: 0 }).withMessage("Informe um valor objetivo maior que zero."),
    body("current").optional({ values: "falsy" }).isFloat({ min: 0 }).withMessage("O valor atual não pode ser negativo."),
    body("deadline").isISO8601().withMessage("Informe um prazo válido."),
    controller.processarMeta
);
router.get("/metas/:id", controller.metaDetalhe);

router.get("/perfil", controller.perfil);
router.post("/perfil",
    body("name").trim().isLength({ min: 2 }).withMessage("Informe seu nome."),
    body("email").isEmail().withMessage("Informe um e-mail válido."),
    controller.processarPerfil
);
router.get("/configuracoes", controller.configuracoes);

// ADMIN
router.get("/admin", controller.adminDashboard);
router.get("/admin/usuarios", controller.adminUsuarios);
router.get("/admin/conteudos", controller.adminConteudos);
router.get("/admin/categorias", controller.adminCategorias);
router.get("/admin/configuracoes", controller.adminConfiguracoes);

// ERROS
router.get("/403", controller.erro403);
router.get("/500", controller.erro500);
router.use(controller.erro404);

module.exports = router;
