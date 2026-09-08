const { validationResult } = require("express-validator");
const model = require("../models/model");

function dadosBase(extra = {}) {
    return {
        usuario: model.usuario,
        errors: [],
        dados: {},
        ...extra
    };
}

function render(nome, titulo, extra = {}) {
    return (req, res) => {
        res.render(`pages/${nome}`, dadosBase({ title: titulo, ...extra }));
    };
}

function renderComValidacao(nome, titulo, sucesso) {
    return (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render(`pages/${nome}`, dadosBase({
                title: titulo,
                errors: errors.array(),
                dados: req.body
            }));
        }

        if (sucesso) {
            return res.redirect(sucesso);
        }

        res.render(`pages/${nome}`, dadosBase({
            title: titulo,
            errors: [],
            dados: req.body
        }));
    };
}

const controller = {
    home: render("home", "Início"),
    comoFunciona: render("como-funciona", "Como funciona"),
    aprenda: render("aprenda", "Aprenda", { conteudos: model.conteudos }),
    artigo: render("artigo", "Conteúdo"),
    faq: render("faq", "FAQ"),
    sobre: render("sobre", "Sobre"),
    contato: render("contato", "Contato"),

    login: render("login", "Entrar"),
    cadastro: render("cadastro", "Criar conta"),
    recuperarSenha: render("recuperar-senha", "Recuperar senha"),
    redefinirSenha: render("redefinir-senha", "Redefinir senha"),

    dashboard: render("dashboard", "Dashboard", {
        resumo: model.resumo,
        transacoes: model.transacoes,
        metas: model.metas
    }),

    financas: render("financas", "Finanças", {
        resumo: model.resumo,
        transacoes: model.transacoes
    }),

    novaReceita: render("receita-nova", "Adicionar receita"),
    novaDespesa: render("despesa-nova", "Adicionar despesa"),
    historico: render("historico", "Histórico", { transacoes: model.transacoes }),

    metas: render("metas", "Metas", { metas: model.metas }),
    novaMeta: render("meta-nova", "Criar meta"),
    metaDetalhe(req, res) {
        const id = Number(req.params.id);
        const meta = model.metas.find(item => item.id === id);

        if (!meta) {
            return res.status(404).render("pages/404", dadosBase({ title: "Página não encontrada" }));
        }

        res.render("pages/meta-detalhe", dadosBase({
            title: "Detalhe da meta",
            meta
        }));
    },

    perfil: render("perfil", "Perfil"),
    configuracoes: render("configuracoes", "Configurações"),

    adminDashboard: render("admin-dashboard", "Admin", {
        totalUsuarios: 12480,
        totalConteudos: model.conteudos.length,
        totalCategorias: 3
    }),
    adminUsuarios: render("admin-usuarios", "Usuários", { usuarios: model.usuariosAdmin }),
    adminConteudos: render("admin-conteudos", "Conteúdos", { conteudos: model.conteudos }),
    adminCategorias: render("admin-categorias", "Categorias"),
    adminConfiguracoes: render("admin-configuracoes", "Configurações do admin"),

    processarLogin: renderComValidacao("login", "Entrar", "/dashboard"),
    processarCadastro: renderComValidacao("cadastro", "Criar conta", "/dashboard"),
    processarContato: renderComValidacao("contato", "Contato", "/contato"),
    processarRecuperacao: renderComValidacao("recuperar-senha", "Recuperar senha", "/login"),
    processarRedefinicao: renderComValidacao("redefinir-senha", "Redefinir senha", "/login"),
    processarReceita: renderComValidacao("receita-nova", "Adicionar receita", "/financas"),
    processarDespesa: renderComValidacao("despesa-nova", "Adicionar despesa", "/financas"),
    processarMeta: renderComValidacao("meta-nova", "Criar meta", "/metas"),
    processarPerfil: renderComValidacao("perfil", "Perfil", "/perfil"),

    erro403(req, res) {
        res.status(403).render("pages/403", dadosBase({ title: "Acesso não permitido" }));
    },
    erro500(req, res) {
        res.status(500).render("pages/500", dadosBase({ title: "Erro interno" }));
    },
    erro404(req, res) {
        res.status(404).render("pages/404", dadosBase({ title: "Página não encontrada" }));
    }
};

module.exports = controller;
