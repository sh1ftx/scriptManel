
# Telium: Sistema de Gestão de Tarefas (Task Manager)

## Documentação técnica acadêmica orientada por normas de engenharia de software  

Projeto desenvolvido para fins **didáticos e avaliativos** na disciplina *Tópicos Especiais em Programação*  
Instituição: IFPI – Campus Pedro II  
Docente responsável: Anderson dos Reis Barros  

---

## 👥 Equipe e Atribuições

- Kayky Rodrigues Silva: Organização arquitetural e estruturação do backend.
- Kayki Ivan de Sousa Pereira: Modelagem do banco de dados e integração Full Stack.
- Fernando da Silva Sena: Implementação de validações e testes funcionais.
- Gleison de Oliveira Sousa: Desenvolvimento dos endpoints REST.
- Vinycius Huellyson de Sousa Alves: Implementação da interface React e integração com Axios.

---

## Informações do Projeto

![status](https://img.shields.io/badge/status-concluído-9AD0C2?style=for-the-badge)
![tipo](https://img.shields.io/badge/tipo-projeto%20acadêmico-CDB4DB?style=for-the-badge)
![arquitetura](https://img.shields.io/badge/arquitetura-Client--Server%20Full%20Stack-B8C0FF?style=for-the-badge)
![normas](https://img.shields.io/badge/normas-IEEE%20%7C%20ISO/IEC-A0C4FF?style=for-the-badge)

---

## Tecnologias e Ferramentas

![Node.js](https://img.shields.io/badge/Node.js-18.x-A7C957?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-DAD7CD?style=for-the-badge&logo=express&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8.x-BBD0FF?style=for-the-badge&logo=mysql&logoColor=black)
![React](https://img.shields.io/badge/React-18.x-CAF0F8?style=for-the-badge&logo=react&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-HTTP-EAE4E9?style=for-the-badge)

---

## Recursos Implementados

![CRUD](https://img.shields.io/badge/operações-CRUD-BEE1E6?style=for-the-badge)
![REST](https://img.shields.io/badge/API-REST-FFD6A5?style=for-the-badge)
![Validação](https://img.shields.io/badge/validação-frontend%20%7C%20backend-DEC9E9?style=for-the-badge)
![Integridade](https://img.shields.io/badge/integridade-referencial-E5989B?style=for-the-badge)

---

## 1. Contexto acadêmico e propósito  

O Telium foi concebido como instrumento pedagógico para consolidação prática da arquitetura Cliente–Servidor e do modelo Full Stack.

O projeto segue diretrizes da ISO/IEC/IEEE 12207, aplicando de forma proporcional processos do ciclo de vida de software.

Não se trata de produto industrial, mas de artefato educacional destinado a:

- aplicar conceitos teóricos em ambiente controlado;
- exercitar separação entre frontend e backend;
- implementar persistência real em SGBD (Sistema Gerenciador de Banco de Dados);
- produzir documentação alinhada a normas técnicas.

---

## 2. Escopo do sistema  

O sistema contempla gestão de Usuários e Tarefas, permitindo:

- operações CRUD (Create, Read, Update, Delete);
- associação de tarefas a usuários via FK (Foreign Key – Chave Estrangeira);
- validação de dados em frontend e backend;
- comunicação estruturada por API REST.

---

## 3. Fundamentação normativa adotada  

### IEEE 830 – Especificação de Requisitos  

Orienta que requisitos sejam claros, verificáveis e consistentes.

### IEEE 1016 – Descrição de Design  

Justifica a documentação explícita da arquitetura Client–Server.

### ISO/IEC 25010 – Modelo de Qualidade  

Considera atributos como adequação funcional, usabilidade e manutenibilidade.

### ISO/IEC/IEEE 12207 – Ciclo de Vida  

Aplicado de forma simplificada: análise, definição, projeto, implementação, verificação e documentação.

---

## 4. Arquitetura do sistema  

Modelo Client–Server Full Stack composto por:

- Backend em Node.js + Express;
- Frontend SPA (Single Page Application) em React;
- Banco relacional MySQL.

Comunicação via HTTP com troca de dados em JSON.

---

## 5. Organização do projeto  

```
.
├── api/
│   ├── controller/
│   ├── routes/
│   ├── db.js
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── Modules/
│   │   ├── services/
│   │   └── styles/
├── README.md
└── package.json
```
