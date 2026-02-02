"use strict";

const express = require("express");
const path = require("path");
const session = require("express-session");
const PDFDocument = require("pdfkit");
const { Amigo, Jogo, Emprestimo } = require("./models");
const { Op } = require("sequelize");

const app = express();
const PORT = 3005;

/* =======================
   CONFIGURAÇÕES BÁSICAS
======================= */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

/* =======================
   SESSÃO / LOGIN
======================= */
app.use(
    session({
        secret: "cuidado-com-bandidos",
        resave: false,
        saveUninitialized: false,
    }),
);

// middleware de autenticação
const autenticacao = (req, res, next) => {
    if (req.session.usuarioLogado) return next();
    return res.redirect("/login");
};

/* =======================
   ROTAS DE LOGIN
======================= */
app.get("/login", (req, res) => {
    res.render("login", { erro: null });
});

app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (email === "adm" && senha === "123") {
        req.session.usuarioLogado = true;
        return res.redirect("/amigos");
    }

    res.render("login", { erro: "Usuário ou senha incorretos" });
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => res.redirect("/login"));
});

/* =======================
   ROTAS PROTEGIDAS
======================= */
app.use(autenticacao);

app.get("/", (req, res) => res.redirect("/amigos"));

/* =======================
   AMIGOS
======================= */
app.get("/amigos", async (req, res) => {
    const amigos = await Amigo.findAll({ order: [["id", "ASC"]] });
    res.render("amigos/index", { amigos, erro: null });
});

// REST amigos
app.get("/api/amigos", async (req, res) => {
    const amigos = await Amigo.findAll({ order: [["id", "ASC"]] });
    res.json(amigos);
});

app.get("/amigos/novo", (req, res) => {
    res.render("amigos/novo", { erro: null, nome: "" });
});

app.post("/amigos/novo", async (req, res) => {
    const { nome, email } = req.body;

    const [user, created] = await Amigo.findOrCreate({
        where: { email },
        defaults: { nome },
    });

    if (!created) {
        return res.render("amigos/novo", {
            nome,
            erro: "O email digitado já está em uso!",
        });
    }

    res.redirect("/amigos");
});

app.get("/amigos/editar/:id", async (req, res) => {
    const amigo = await Amigo.findByPk(req.params.id);
    if (!amigo) return res.status(404).send("Amigo não encontrado");
    res.render("amigos/editar", { amigo, erro: null });
});

app.post("/amigos/editar/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    const invalidEmail = await Amigo.findOne({
        where: {
            email,
            id: { [Op.ne]: id },
        },
    });

    if (invalidEmail) {
        const amigo = await Amigo.findByPk(id);
        return res.render("amigos/editar", {
            amigo,
            erro: "O email digitado já está em uso!",
        });
    }

    await Amigo.update({ nome, email }, { where: { id } });
    res.redirect("/amigos");
});

app.post("/amigos/excluir/:id", async (req, res) => {
    try {
        await Amigo.destroy({ where: { id: req.params.id } });
        res.redirect("/amigos");
    } catch (error) {
        const amigos = await Amigo.findAll({ order: [["id", "ASC"]] });
        res.render("amigos/index", {
            amigos,
            erro: "Não é possível apagar este amigo porque existem jogos vinculados a ele.",
        });
    }
});

/* =======================
   RELATÓRIO PDF — AMIGOS + JOGOS
======================= */
app.get("/pdf/relatorio", async (req, res) => {
    const amigos = await Amigo.findAll({
        order: [["nome", "ASC"]],
    });

    const jogos = await Jogo.findAll({
        include: [{ model: Amigo, as: "dono" }],
        order: [["titulo", "ASC"]],
    });

    const doc = new PDFDocument({ size: "A4", margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        "inline; filename=relatorio-amigos-jogos.pdf",
    );

    doc.pipe(res);

    /* ===== CABEÇALHO ===== */
    doc
        .fontSize(18)
        .text("Instituto Federal do Piauí - IFPI", { align: "center" })
        .moveDown(0.5);

    doc
        .fontSize(14)
        .text("Relatório Geral do Sistema", { align: "center" })
        .moveDown(2);

    /* ===== AMIGOS ===== */
    doc.fontSize(13).text("1. Amigos Cadastrados").moveDown(0.5);

    doc
        .fontSize(11)
        .text(`Total de amigos: ${amigos.length}`)
        .moveDown();

    amigos.forEach((a, i) => {
        doc
            .fontSize(10)
            .text(`${i + 1}. Nome: ${a.nome}`)
            .text(`   Email: ${a.email}`)
            .moveDown(0.3);
    });

    /* ===== NOVA PÁGINA ===== */
    doc.addPage();

    /* ===== JOGOS ===== */
    doc.fontSize(13).text("2. Jogos Cadastrados").moveDown(0.5);

    doc
        .fontSize(11)
        .text(`Total de jogos: ${jogos.length}`)
        .moveDown();

    jogos.forEach((j, i) => {
        doc
            .fontSize(10)
            .text(`${i + 1}. Título: ${j.titulo}`)
            .text(`   Plataforma: ${j.plataforma}`)
            .text(`   Dono: ${j.dono ? j.dono.nome : "Sem dono"}`)
            .moveDown(0.3);
    });

    /* ===== RODAPÉ ===== */
    doc
        .moveDown(2)
        .fontSize(9)
        .text(
            `Relatório gerado em: ${new Date().toLocaleDateString("pt-BR")}`,
            { align: "right" },
        );

    doc.end();
});

/* =======================
   JOGOS
======================= */
app.get("/jogos", async (req, res) => {
    const jogos = await Jogo.findAll({
        include: [{ model: Amigo, as: "dono" }],
        order: [["id", "ASC"]],
    });
    res.render("jogos/index", { jogos, erro: null });
});

// REST jogos
app.get("/api/jogos", async (req, res) => {
    const jogos = await Jogo.findAll({
        include: [{ model: Amigo, as: "dono" }],
        order: [["id", "ASC"]],
    });
    res.json(jogos);
});

app.get("/jogos/novo", async (req, res) => {
    const amigos = await Amigo.findAll({ order: [["nome", "ASC"]] });
    res.render("jogos/novo", { amigos });
});

app.post("/jogos/novo", async (req, res) => {
    const { titulo, plataforma, amigoId } = req.body;
    await Jogo.create({ titulo, plataforma, amigoId: Number(amigoId) });
    res.redirect("/jogos");
});

/* DELETE JOGO COM TRATAMENTO */
app.post("/jogos/excluir/:id", async (req, res) => {
    try {
        await Jogo.destroy({
            where: { id: req.params.id },
        });

        return res.redirect("/jogos");
    } catch (error) {
        console.error(error);

        const jogos = await Jogo.findAll({
            include: [{ model: Amigo, as: "dono" }],
            order: [["id", "ASC"]],
        });

        return res.render("jogos/index", {
            jogos,
            erro: "Não é possível apagar este jogo porque ele possui empréstimos vinculados.",
        });
    }
});

/* =======================
   EDITAR JOGO
======================= */
app.get("/jogos/editar/:id", async (req, res) => {
    const jogo = await Jogo.findByPk(req.params.id);

    if (!jogo) {
        return res.status(404).send("Jogo não encontrado");
    }

    const amigos = await Amigo.findAll({ order: [["nome", "ASC"]] });

    res.render("jogos/editar", { jogo, amigos });
});

app.post("/jogos/editar/:id", async (req, res) => {
    const { titulo, plataforma, amigoId } = req.body;

    await Jogo.update(
        {
            titulo,
            plataforma,
            amigoId: Number(amigoId),
        },
        {
            where: { id: req.params.id },
        }
    );

    res.redirect("/jogos");
});


/* =======================
   EMPRÉSTIMOS
======================= */
app.get("/emprestimos", async (req, res) => {
    const emprestimos = await Emprestimo.findAll({
        include: [
            { model: Jogo, as: "jogo" },
            { model: Amigo, as: "amigo" },
        ],
        order: [["id", "ASC"]],
    });
    res.render("emprestimos/index", { emprestimos });
});

app.get("/emprestimos/novo", async (req, res) => {
    const jogos = await Jogo.findAll({ order: [["titulo", "ASC"]] });
    const amigos = await Amigo.findAll({ order: [["nome", "ASC"]] });
    res.render("emprestimos/novo", { jogos, amigos });
});

app.post("/emprestimos/novo", async (req, res) => {
    const { jogoId, amigoId, dataInicio, dataFim } = req.body;

    await Emprestimo.create({
        jogoId: Number(jogoId),
        amigoId: Number(amigoId),
        dataInicio,
        dataFim: dataFim || null,
    });

    res.redirect("/emprestimos");
});

app.post("/emprestimos/excluir/:id", async (req, res) => {
    await Emprestimo.destroy({ where: { id: req.params.id } });
    res.redirect("/emprestimos");
});

/* =======================
   SERVER
======================= */
app.listen(PORT, () =>
    console.log(`Funfando em http://localhost:${PORT}`),
);