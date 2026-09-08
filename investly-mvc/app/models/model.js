const usuario = {
    nome: "Guilherme",
    inicial: "G",
    email: "voce@exemplo.com",
    renda: 2500,
    nivel: "Iniciante"
};

const resumo = {
    receitas: 2500,
    despesas: 1850,
    saldo: 650,
    orcamento: 74,
    transacoes: 24
};

const transacoes = [
    { descricao: "Supermercado", categoria: "Alimentação", data: "24/08/2026", tipo: "Despesa", valor: -150 },
    { descricao: "Salário", categoria: "Trabalho", data: "01/08/2026", tipo: "Receita", valor: 2500 },
    { descricao: "Uber", categoria: "Transporte", data: "23/08/2026", tipo: "Despesa", valor: -25 }
];

const metas = [
    { id: 1, nome: "Comprar um notebook", atual: 3000, objetivo: 4000, progresso: 75, prazo: "30/11/2026", mensal: 250 },
    { id: 2, nome: "Viagem", atual: 4000, objetivo: 10000, progresso: 40, prazo: "15/01/2027", mensal: 600 },
    { id: 3, nome: "Reserva de emergência", atual: 6000, objetivo: 10000, progresso: 60, prazo: "30/06/2027", mensal: 500 }
];

const conteudos = [
    { id: 1, categoria: "Finanças pessoais", titulo: "Como montar um orçamento", resumo: "Aprenda a organizar receitas, despesas e prioridades." },
    { id: 2, categoria: "Economia", titulo: "O que é inflação?", resumo: "Entenda como a inflação afeta o poder de compra." },
    { id: 3, categoria: "Investimentos", titulo: "Renda fixa e renda variável", resumo: "Conheça as diferenças entre os principais tipos de investimento." }
];

const usuariosAdmin = [
    { nome: "Guilherme", email: "voce@exemplo.com", cadastro: "08/09/2026", status: "Ativo" },
    { nome: "Ana Silva", email: "ana@exemplo.com", cadastro: "07/09/2026", status: "Ativo" }
];

module.exports = {
    usuario,
    resumo,
    transacoes,
    metas,
    conteudos,
    usuariosAdmin
};
