'use strict';

const express = require('express');
const path = require('path');
const session = require('express-session');
const { Amigo, Jogo, Emprestimo } = require('./models');

const app = express();
const PORT = 3005;

/* =======================
   CONFIGURAÇÕES BÁSICAS
======================= */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

/* =======================
   SESSÃO / LOGIN
======================= */
app.use(
  session({
    secret: 'cuidado-com-bandidos',
    resave: false,
    saveUninitialized: false
  })
);

// middleware de autenticação
const autenticacao = (req, res, next) => {
  if (req.session.usuarioLogado) return next();
  return res.redirect('/login');
};

/* =======================
   ROTAS DE LOGIN
======================= */
app.get('/login', (req, res) => {
  res.render('login', { erro: null });
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === 'adm' && senha === '123') {
    req.session.usuarioLogado = true;
    return res.redirect('/amigos');
  }

  res.render('login', { erro: 'Usuário ou senha incorretos' });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

/* =======================
   ROTAS PROTEGIDAS
======================= */
app.use(autenticacao);

app.get('/', (req, res) => res.redirect('/amigos'));

/* =======================
   AMIGOS
======================= */
app.get('/amigos', async (req, res) => {
  const amigos = await Amigo.findAll({ order: [['id', 'ASC']] });
  res.render('amigos/index', { amigos, erro: null });
});

app.get('/amigos/novo', (req, res) => {
  res.render('amigos/novo');
});

app.post('/amigos/novo', async (req, res) => {
  const { nome, email } = req.body;
  await Amigo.create({ nome, email });
  res.redirect('/amigos');
});

app.get('/amigos/editar/:id', async (req, res) => {
  const amigo = await Amigo.findByPk(req.params.id);
  if (!amigo) return res.status(404).send('Amigo não encontrado');
  res.render('amigos/editar', { amigo });
});

app.post('/amigos/editar/:id', async (req, res) => {
  const { nome, email } = req.body;
  await Amigo.update({ nome, email }, { where: { id: req.params.id } });
  res.redirect('/amigos');
});

/* 🔥 DELETE COM TRATAMENTO (SEM CRASH) */
app.post('/amigos/excluir/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Amigo.destroy({ where: { id } });
    return res.redirect('/amigos');
  } catch (error) {
    console.error(error);

    const amigos = await Amigo.findAll({ order: [['id', 'ASC']] });

    return res.render('amigos/index', {
      amigos,
      erro: 'Não é possível apagar este amigo porque existem jogos vinculados a ele.'
    });
  }
});

/* =======================
   JOGOS
======================= */
app.get('/jogos', async (req, res) => {
  const jogos = await Jogo.findAll({
    include: [{ model: Amigo, as: 'dono' }],
    order: [['id', 'ASC']]
  });

  // ✅ ADIÇÃO: erro sempre definido
  res.render('jogos/index', { jogos, erro: null });
});

app.get('/jogos/novo', async (req, res) => {
  const amigos = await Amigo.findAll({ order: [['nome', 'ASC']] });
  res.render('jogos/novo', { amigos });
});

app.post('/jogos/novo', async (req, res) => {
  const { titulo, plataforma, amigoId } = req.body;
  await Jogo.create({ titulo, plataforma, amigoId: Number(amigoId) });
  res.redirect('/jogos');
});

app.get('/jogos/visualizar/:id', async (req, res) => {
  const jogo = await Jogo.findByPk(req.params.id, {
    include: [
      { model: Amigo, as: 'dono' },
      {
        model: Emprestimo,
        as: 'emprestimos',
        include: [{ model: Amigo, as: 'amigo' }]
      }
    ]
  });

  if (!jogo) return res.status(404).send('Jogo não encontrado');
  res.render('jogos/detalhes', { jogo });
});

app.get('/jogos/editar/:id', async (req, res) => {
  const jogo = await Jogo.findByPk(req.params.id);
  if (!jogo) return res.status(404).send('Jogo não encontrado');

  const amigos = await Amigo.findAll({ order: [['nome', 'ASC']] });
  res.render('jogos/editar', { jogo, amigos });
});

app.post('/jogos/editar/:id', async (req, res) => {
  const { titulo, plataforma, amigoId } = req.body;
  await Jogo.update(
    { titulo, plataforma, amigoId: Number(amigoId) },
    { where: { id: req.params.id } }
  );
  res.redirect('/jogos');
});

/* 🔥 DELETE JOGO COM TRATAMENTO (PADRÃO PROFISSIONAL) */
app.post('/jogos/excluir/:id', async (req, res) => {
  try {
    await Jogo.destroy({ where: { id: req.params.id } });
    return res.redirect('/jogos');
  } catch (error) {
    console.error(error);

    const jogos = await Jogo.findAll({
      include: [{ model: Amigo, as: 'dono' }],
      order: [['id', 'ASC']]
    });

    return res.render('jogos/index', {
      jogos,
      erro: 'Não é possível apagar este jogo porque ele possui empréstimos vinculados.'
    });
  }
});

/* =======================
   EMPRÉSTIMOS
======================= */
app.get('/emprestimos', async (req, res) => {
  const emprestimos = await Emprestimo.findAll({
    include: [
      { model: Jogo, as: 'jogo' },
      { model: Amigo, as: 'amigo' }
    ],
    order: [['id', 'ASC']]
  });
  res.render('emprestimos/index', { emprestimos });
});

app.get('/emprestimos/novo', async (req, res) => {
  const jogos = await Jogo.findAll({ order: [['titulo', 'ASC']] });
  const amigos = await Amigo.findAll({ order: [['nome', 'ASC']] });
  res.render('emprestimos/novo', { jogos, amigos });
});

app.post('/emprestimos/novo', async (req, res) => {
  const { jogoId, amigoId, dataInicio, dataFim } = req.body;

  await Emprestimo.create({
    jogoId: Number(jogoId),
    amigoId: Number(amigoId),
    dataInicio,
    dataFim: dataFim || null
  });

  res.redirect('/emprestimos');
});

app.post('/emprestimos/excluir/:id', async (req, res) => {
  await Emprestimo.destroy({ where: { id: req.params.id } });
  res.redirect('/emprestimos');
});

/* =======================
   SERVER
======================= */
app.listen(PORT, () =>
  console.log(`Funfando em http://localhost:${PORT}`)
);
