# 🎮 Sistema de Gerenciamento de Jogos e Empréstimos

> **Projeto desenvolvido para a disciplina de Programação para Internet II**
> **Professor:** Manuel Gonçalves da Silva Neto  
> **Instituição:** IFPI - Campus Pedro II

Este projeto é uma aplicação web completa para gestão de coleções de jogos, cadastro de amigos e controle de empréstimos, desenvolvida em Node.js com Sequelize e SQLite, seguindo o padrão arquitetural MVC.

---

## 🚀 Desafios Implementados (Superando o Enunciado)

O sistema atende a todos os requisitos da atividade avaliativa, implementando múltiplos desafios para garantir a robustez da aplicação:

### **a) Requisitos Obrigatórios**
* **Autenticação (Login):** Acesso restrito via sessão (`Express-Session`) com proteção de rotas por middleware.
* **Relatório em PDF:** Geração dinâmica de listagem profissional de Amigos e Jogos utilizando a biblioteca `PDFKit`.

### **b) Melhorias Adicionais (Tripla Implementação)**
Diferente do solicitado (apenas um item), o grupo entregou três melhorias da categoria B:
* **Serviço REST:** API que disponibiliza dados em tempo real das tabelas em formato JSON.
* **Página de Detalhes:** Interface de "Dados Completos" que consome a API interna para exibir informações cruzadas de proprietários e status de disponibilidade.
* **Verificação de Duplicidade:** Lógica no Backend para impedir cadastros redundantes (ex: validação de e-mails já existentes).

---

## 🛠️ Tecnologias Utilizadas

* **Node.js:** Ambiente de execução.
* **Express:** Framework web para gerenciamento de rotas.
* **Sequelize (ORM):** Gerenciamento e modelagem do banco de dados.
* **SQLite:** Banco de dados relacional para persistência local.
* **EJS:** View Engine para renderização das páginas.
* **Bootstrap 5:** Estilização moderna com interface responsiva e efeitos *Glassmorphism*.

---

## 🔧 Instalação e Uso

Siga os passos abaixo para configurar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/sh1ftx/scriptManel](https://github.com/sh1ftx/scriptManel)
    cd scriptManel
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:** Execute as migrações para criar as tabelas (Amigos, Jogos, Emprestimos):
    ```bash
    npx sequelize-cli db:migrate
    ```

4.  **Inicie o Servidor:**
    ```bash
    npm start
    ```

5.  **Acesse no Navegador:** Abra [http://localhost:3005](http://localhost:3005)

---

## 🔐 Acesso ao Sistema

Utilize as credenciais de administrador configuradas no sistema:
* **Usuário:** `adm`
* **Senha:** `123`

---

## 👥 Equipe e Atribuições

* **Kayky Rodrigues Silva:** Líder da equipe, organização das tarefas e formatação da apresentação.
* **Kayky Ivan:** Criação do repositório, base do projeto e orientação técnica/estilização.
* **Vinycius Huellyson:** Implementação da lógica de verificação de duplicidade.
* **Gleison de Oliveira:** Desenvolvimento do serviço REST (JSON).
* **Lincoln César:** Implementação da página de detalhes de registros.
* **Fernando da Silva:** Auxílio na criação do relatório em PDF.
* **Ananias Carlos:** Desenvolvimento do sistema de login simples.

---
