
# Ludoteca: Sistema de Gestão de Acervo Lúdico

## Documentação técnica acadêmica orientada por normas de engenharia de software  

Projeto desenvolvido para fins **didáticos e avaliativos** na disciplina *Programação para Internet II*  
Instituição: IFPI – Campus Pedro II  
Professor responsável: Manuel Gonçalves da Silva Neto  

---

## 1. Contexto acadêmico e propósito  

Este projeto foi concebido como **instrumento pedagógico**, cujo objetivo central é avaliar e consolidar o aprendizado prático dos estudantes no desenvolvimento de aplicações web.

Na literatura de Engenharia de Software, projetos educacionais são reconhecidos como ambientes válidos para a aplicação **adaptada e proporcional** de normas formais, desde que o escopo, as limitações e o propósito sejam explicitamente definidos (ISO/IEC/IEEE 12207).

Dessa forma, este sistema **não se propõe a ser um produto industrial**, mas um **artefato de aprendizagem**, utilizado para:

- aplicar conceitos teóricos em um contexto prático controlado;
- exercitar decisões arquiteturais fundamentais;
- demonstrar compreensão do ciclo de vida de software;
- produzir documentação técnica alinhada a padrões reconhecidos.

A explicitação desse propósito atende à recomendação do **IEEE 830**, segundo a qual o entendimento do contexto de uso é pré-requisito para uma especificação correta de requisitos.

---

## 2. Escopo do sistema  

O escopo foi definido de forma **intencionalmente limitada**, conforme boas práticas para projetos acadêmicos.

O sistema contempla funcionalidades suficientes para:

- exercitar operações CRUD;
- trabalhar relacionamentos entre entidades;
- aplicar controle de acesso básico;
- gerar relatórios;
- introduzir o conceito de serviços REST.

Não foram considerados requisitos de escalabilidade, alta disponibilidade ou implantação em produção, pois tais aspectos extrapolam os objetivos didáticos da disciplina.

Segundo o **IEEE 830**, um requisito é adequado quando é **necessário e suficiente** para o objetivo declarado, evitando complexidade artificial que comprometa a avaliação do aprendizado.

---

## 3. Fundamentação normativa adotada  

Embora o projeto tenha caráter educacional, sua documentação foi estruturada com base em **normas consolidadas**, utilizadas como **referência metodológica**, não como exigência regulatória.

### 3.1 IEEE 830 – Especificação de Requisitos de Software  

O IEEE 830 recomenda que requisitos sejam:

- claros;
- verificáveis;
- consistentes;
- rastreáveis.

A adoção desse padrão justifica:

- a enumeração explícita dos requisitos;
- a separação entre requisitos funcionais e não funcionais;
- a escrita objetiva e livre de ambiguidades.

---

### 3.2 IEEE 1016 – Descrição de Design de Software  

O IEEE 1016 orienta a descrição da arquitetura por meio de **visões complementares**, facilitando a comunicação técnica.

Sua adoção justifica:

- a descrição explícita da arquitetura adotada;
- a separação clara de responsabilidades entre componentes;
- a explicação do papel de cada módulo do sistema.

---

### 3.3 ISO/IEC 25010 – Qualidade de Produto de Software  

A ISO/IEC 25010 define um modelo de qualidade baseado em características como adequação funcional, confiabilidade, usabilidade e segurança.

Mesmo em sistemas simples, a norma recomenda que atributos de qualidade sejam considerados desde o projeto, ainda que em **nível introdutório**, razão pela qual requisitos não funcionais foram definidos de forma proporcional ao contexto acadêmico.

---

### 3.4 ISO/IEC/IEEE 12207 – Ciclo de Vida de Software  

A ISO/IEC/IEEE 12207 define processos para o ciclo de vida do software e reconhece que **nem todos os processos são aplicáveis a todos os projetos**, permitindo adaptações conforme o contexto.

Neste projeto, foi adotado um **subconjunto simplificado**, adequado a atividades educacionais, com foco em desenvolvimento, verificação e documentação.

---

## 4. Arquitetura do sistema  

### 4.1 Justificativa da escolha arquitetural  

O padrão **MVC (Model–View–Controller)** foi adotado por ser amplamente recomendado na literatura acadêmica e no ensino de desenvolvimento web.

Sua adoção é justificada por:

- separação clara de responsabilidades;
- redução de acoplamento;
- maior facilidade de compreensão;
- apoio à manutenibilidade.

Essas características são apontadas pelo **IEEE 1016** como desejáveis em arquiteturas bem documentadas.

---

### 4.2 Componentes principais  

O sistema é composto por:

- **Node.js**, como ambiente de execução;
- **Express**, para controle de rotas e fluxo da aplicação;
- **Sequelize**, como mapeador objeto-relacional;
- **SQLite**, como banco de dados relacional local;
- **EJS**, para renderização da camada de apresentação;
- **API REST**, para exposição estruturada de dados;
- **PDFKit**, para geração de relatórios.

A escolha dessas tecnologias foi orientada por simplicidade, ampla documentação, adequação ao ensino e baixo custo de configuração, fatores frequentemente recomendados em projetos acadêmicos.

---

## 5. Ciclo de vida aplicado (ISO/IEC/IEEE 12207)  

Foi adotado um ciclo de vida sequencial simplificado, comum em projetos educacionais.

As fases aplicadas foram:

1. **Análise do enunciado da atividade**  
   Interpretação dos requisitos definidos pelo docente.

2. **Definição dos requisitos**  
   Organização funcional e não funcional do sistema.

3. **Projeto da solução**  
   Definição da arquitetura MVC e da estrutura do código.

4. **Implementação**  
   Desenvolvimento incremental das funcionalidades.

5. **Verificação funcional**  
   Validação manual dos principais fluxos do sistema.

6. **Documentação**  
   Produção deste documento como artefato de engenharia.

Essa estrutura segue a recomendação da ISO/IEC/IEEE 12207 de que cada fase produza **artefatos verificáveis**, mesmo em projetos de pequeno porte.

---

## 6. Requisitos funcionais (IEEE 830)  

Os requisitos abaixo representam **critérios de avaliação didática**.

### RF-01 — Autenticação  

O sistema deve permitir acesso por meio de login utilizando sessões.

**Observação didática:**  
O mecanismo de autenticação possui **usuário e senha previamente definidos**, sendo utilizado apenas para **exemplificação de controle de acesso**, não para fins de segurança real.

- Usuário: `adm`  
- Senha: `123`

**Justificativa:**  
A ISO/IEC 25010 define segurança como característica essencial, mesmo quando tratada de forma introdutória em sistemas educacionais.

---

### RF-02 — Cadastro de jogos e amigos  

O sistema deve permitir criar, editar, listar e remover registros.

**Justificativa:**  
O exercício de operações CRUD é prática consolidada no ensino de bancos de dados e aplicações web.

---

### RF-03 — Registro de empréstimos  

O sistema deve registrar empréstimos associando jogos e amigos.

**Justificativa:**  
Permite exercitar relacionamentos entre entidades e integridade referencial.

---

### RF-04 — Relatórios em PDF  

O sistema deve gerar relatórios em formato PDF.

**Justificativa:**  
A geração de documentos é frequentemente utilizada como critério de avaliação prática em cursos de programação.

---

### RF-05 — Serviço REST  

O sistema deve disponibilizar dados por meio de uma API REST.

**Justificativa:**  
Introduz conceitos de desacoplamento entre backend e apresentação, conforme práticas modernas documentadas na literatura.

---

### RF-06 — Verificação de duplicidade  

O sistema deve impedir registros duplicados.

**Justificativa:**  
A integridade dos dados é requisito básico de confiabilidade segundo a ISO/IEC 25010.

---

## 7. Requisitos não funcionais (ISO/IEC 25010)  

Os requisitos não funcionais foram tratados de forma proporcional ao escopo acadêmico:

- **Usabilidade**: interfaces simples e diretas;  
- **Segurança**: controle básico de acesso;  
- **Manutenibilidade**: organização modular do código.

Esses critérios seguem a recomendação da ISO/IEC 25010 de que a qualidade deve ser considerada desde o projeto.

---

## 8. Organização do projeto  

A estrutura do código foi definida para facilitar leitura, avaliação e manutenção, seguindo práticas consolidadas e alinhadas ao **IEEE 1016**.

```
.
├── config/
├── migrations/
├── models/
├── public/
│   └── css/
├── seeders/
├── views/
├── server.js
├── database-dev.sqlite
├── package.json
├── package-lock.json
├── README.md
├── LICENSE
└── .gitignore
```

---

## 9. Instalação e execução  

```
git clone https://github.com/sh1ftx/scriptManel
cd scriptManel
npm install
npx sequelize-cli db:migrate
npm start
```

Acesso:

```
http://localhost:3005
```

---

## 10. Considerações finais  

Este projeto deve ser interpretado como **exercício de engenharia de software**, não como produto final.

Cada escolha técnica foi realizada:

- em conformidade com normas reconhecidas;
- ajustada ao contexto educacional;
- justificada por consenso acadêmico ou prática consolidada.

A documentação cumpre o papel de **explicitar decisões técnicas e metodológicas**, contribuindo para o processo de aprendizagem e avaliação.
