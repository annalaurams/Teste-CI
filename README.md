# Testes Front-end com Cypress

## Sumário

- [1. Visão Geral](#1-visão-geral)
- [2. Execução dos Testes](#2-execução-dos-testes)
  - [2.1 Execução via CI (GitHub Actions)](#21-execução-via-ci-github-actions)
  - [2.2 Execução Manual (Local)](#22-execução-manual-local)
- [3. Configurações Básicas](#3-configurações-básicas)
  - [3.1 URL Base (baseurl)](#31-url-base-baseurl)
  - [3.2 Usuário de Teste (Login)](#32-usuário-de-teste-login)
  - [3.3 Comandos Customizados: Login e Logout](#33-comandos-customizados-login-e-logout)
  - [3.4 Dados de Teste (Fixtures)](#34-dados-de-teste-fixtures)
  - [3.5 Imagens](#35-imagens)
- [4. Funções Utilitárias Reaproveitáveis (Utils)](#4-funções-utilitárias-reaproveitáveis-utils)
- [5. Casos de Teste](#5-casos-de-teste)
  - [51-sign-up](#51-sign-up)
  - [52-questionnaire](#52-questionnaire)
  - [53-medical-record](#53-medical-record)
  - [54-home](#54-home)
  - [55-account](#55-account)

## 1. Visão Geral

Este projeto contém os testes end-to-end da aplicação front-end da plataforma Maia Health Tech para garantir a qualidade e o funcionamento dos fluxos principais de usuário no sistema.

- Fluxos de teste para os planos: **Free Trial, Freemium, Health Freemium e Basic**

### Ferramentas e Tecnologias Utilizadas

- Cypress (Testes E2E)
- TypeScript

---

## 2. Execução dos Testes

### 2.1 Execução via CI (GitHub Actions)

Sempre que houver um **push** ou **pull request** nas branches principais, o **GitHub Actions** executará automaticamente o pipeline configurado no arquivo:

```
.github/workflows/cypress.yaml
```

---

### 2.2 Execução Manual (Local)

Para rodar os testes manualmente na sua máquina local:

1. Acesse a pasta raiz do projeto de testes e execute o Cypress com interface gráfica:

```bash
npx cypress open
```

2. Ou, se preferir rodar direto no terminal (modo headless):

```bash
npx cypress run
```

---

## 3. Configurações Básicas

### 3.1 URL Base (baseUrl)

O arquivo responsável pela URL de execução dos testes é o arquivo de configuração do Cypress.
Se necessário, altere a URL para o ambiente desejado (exemplo: produção, beta).

```js
baseUrl: 'https://app-dev.healthmaia.com',
```

---

### 3.2 Usuário de Teste (Login)

Os dados de login são armazenados em um arquivo JSON de fixtures:

`/fixtures/user.json`

- Garanta que o e-mail e a senha correspondam a um usuário válido no ambiente configurado na URL.
- Outras informações como nome, CPF, telefone, etc., também podem ser ajustadas conforme necessário.

---

### 3.3 Comandos Customizados: Login e Logout

Para facilitar o reuso de código nos testes, há comandos customizados localizados em:

`/support/commands.ts`

```typescript
cy.login(user); // Faz login automático com os dados informados
cy.logout(); // Logout da sessão atual
```

Antes de chamar o `cy.login(user)` nos testes, certifique-se de carregar o usuário com:

```typescript
cy.fixture('user').then((users) => {
  const user = users.basic;
  cy.login(user);
});
```

---

### 3.4 Dados de Teste (Fixtures)

Além do `user.json`, existem outros arquivos de dados auxiliares dentro de:

`/fixtures/`

#### Principais fixtures:

| Arquivo             | Finalidade                                                     |
|---------------------|----------------------------------------------------------------|
| `user.json`         | Dados de login e perfil de usuário                             |
| `clinic.json`       | Dados da clínica/consultório para testes de cadastro e edição  |
| `questionnaire.json`| Dados de questionário para testes de criação, envio e gestão   |
| `financial.json`    | Dados de pagamento para testes de upgrade de plano             |

👉 Todos os arquivos JSON são **alteráveis**, mas é **obrigatório** que os dados contidos neles sejam **válidos e compatíveis com sua conta real no sistema Maia**, para evitar falhas nos testes.

Por exemplo, se você utilizar o nome de um paciente como "User", certifique-se de que esse paciente esteja previamente cadastrado no sistema, evitando assim falhas nos testes. Essa recomendação se aplica a todas as outras implementações.

---

### 3.5 Imagens

`/fixtures/img/`

Contém imagens usadas em testes de upload ou cadastro.

---

## 4. Funções Utilitárias Reaproveitáveis (Utils)

| Função                          | Local          | Descrição                                                              |
|---------------------------------|----------------|------------------------------------------------------------------------|
| `accessAccountScreen(user)`     | `account.ts`   | Acessa a tela de minha conta do usuário após login, clicando no menu lateral. |
| `AddPatientCommon(user)`        | `Patient.ts`   | Fluxo comum de adição de paciente, preenchendo nome e WhatsApp.        |
| `accessPatientScreen(user)`     | `Patient.ts`   | Acessa a tela de pacientes após login.                                  |
| `searchAndClickPatient(user)`   | `Patient.ts`   | Busca um paciente pelo nome e abre seu prontuário.                      |
| `editPatient(user)`             | `Patient.ts`   | Edita um paciente existente, preenchendo todos os campos.               |
| `accessQuestionnaireScreen(user)` | `questionnaire.ts` | Acessa a tela de questionários após login.                           |
| `basicShippingFlow(questionnaire)` | `questionnaire.ts` | Executa o fluxo básico de envio de questionário.                   |
| `QuestToThePatient(questionnaire)` | `questionnaire.ts` | Envia questionário diretamente para pacientes.                     |
| `QuestMedicalRecord(questionnaire)` | `questionnaire.ts` | Envia questionário para ser aberto no prontuário médico.          |
| `specificNumber(questionnaire)` | `questionnaire.ts` | Envia questionário para um número específico.          |

---

## 5. Casos de Teste

### 5.1 Sign Up

| Funcionalidade        | Arquivo               | Descrição                                                                 |
|-----------------------|-----------------------|---------------------------------------------------------------------------|
| Cadastro de Usuário   | **newUser.cy.ts**     | Testa o cadastro de um novo usuário, incluindo nome, e-mail, telefone e senha. |
| Login                 | **login.cy.ts**       | Testa o processo de login com dados válidos.                              |
| Logout                | **logout.cy.ts**      | Valida se o botão de logout funciona e redireciona para a tela de login.  |
| Recuperação de Senha  | **forgotPassword.cy.ts** | Testa o fluxo de recuperação de senha por e-mail e WhatsApp.            |

---

### 5.2 Questionnaire

| Funcionalidade                          | Arquivo                         | Descrição                                                                                   |
|-----------------------------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| Adicionar Pergunta Tipo Link            | **linkQuestion.cy.ts**          | Criação de questionário e adição de pergunta do tipo **Link**.                              |
| Perguntas de Múltipla Escolha           | **multipleChoiceQuestion.cy.ts** | Criação de perguntas de múltipla escolha, incluindo duplicação e exclusão. Além disso testa configurações adicionais na lateral como descrição, obrigatoriedade, pontuação e pergunta adicional. |
| Barra Numérica e Escala 1 a 10          | **numericIndicatorQuestion.cy.ts** | Criação de perguntas do tipo **Barra Numérica** e **Escala de 1 a 10**.                    |
| Perguntas Diversas                      | **otherQuestionTypes.cy.ts**    | Criação de questionário com tipos variados: **Orientação**, **Sim/Não**, **Texto Curto**, **Upload**. Além disso, valida o funcionamento da seta de navegação entre as perguntas.|
| Ações em Questionário                   | **questionnaireActions.cy.ts**  | Testa busca, exportação, envio e exclusão de questionário.                                   |
| Fluxo de Seleção de Tipos de Pergunta   | **questionTypeSelection.cy.ts** | Navegação e seleção de todas os diferentes tipos de pergunta via dropdown.                   |

---

### 5.3 Medical Record

| Funcionalidade                 | Arquivo                    | Descrição                                                                                   |
|--------------------------------|----------------------------|---------------------------------------------------------------------------------------------|
| Visualizar e Gerenciar Eventos | **viewEvents.cy.ts**       | Testa a visualização de eventos no prontuário, acesso às respostas, evolução e exclusão de eventos. |
| Histórico de Transcrições      | **transcriptionHistory.cy.ts** | Acesso ao histórico de transcrições de voz, com funcionalidades de cópia de texto e anexação ao prontuário. |
| Gerenciar Tags de Paciente     | **tags.cy.ts**             | Criação, busca, seleção e associação de tags a um paciente.                                 |
| Enviar Questionários           | **sendQuestionnaire.cy.ts** | Testa o envio de questionários para diferentes fluxos: paciente, prontuário ou número específico. |
| Tela de Pacientes (CRUD)       | **patients.cy.ts**         | Testa busca, abertura de prontuário, exclusão e adição de pacientes.                        |
| Visualizar e Editar Dados      | **patientData.cy.ts**      | Testa a visualização e edição de dados cadastrais do paciente, incluindo atualização de informações. |
| Histórico de Eventos           | **events.cy.ts**           | Testa a visualização, renomeação e exclusão de eventos associados ao paciente.              |
| Anexos de Documentos           | **attachments.cy.ts**      | Testa o anexo de documentos via QR Code e Upload, além da edição de título e exclusão de documentos. |

---

### 5.4 Home

| Funcionalidade                      | Arquivo                  | Descrição                                                                 |
|-------------------------------------|--------------------------|---------------------------------------------------------------------------|
| Enviar Questionário                 | **sendQuestionnaire.cy.ts** | Testa o envio de um questionário para o paciente. |
| Gerenciar Prompts de Transcrição    | **prompts.cy.ts**        | Criação, edição e exclusão de prompts personalizados para o módulo de transcrição. |
| Criar Transcrição (com/sem paciente)| **createTranscript.cy.ts** | Testa a gravação e geração de uma nova transcrição, com e sem paciente vinculado. |
| Cadastro de Paciente com CPF        | **addPatient.cy.ts**     | Testa o cadastro de um novo paciente com CPF, preenchendo dados básicos. |
| Cadastro de Paciente sem CPF        | **addPatient.cy.ts**     | Testa o cadastro de paciente sem CPF, preenchendo todos os campos opcionais e adicionais. |

---

### 5.5 Account

| Funcionalidade                    | Arquivo                  | Descrição                                                                                                 |
|-----------------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------|
| Alterar Foto de Perfil            | **profilePhoto.cy.ts**   | Testa o fluxo de upload de uma nova foto de perfil para o usuário. |
| Visualizar e Anexar Transcrições  | **transcriptions.cy.ts** | Testa o acesso ao histórico de transcrições na conta do usuário, incluindo visualização de resumo, anexação ao prontuário e abertura do prontuário médico correspondente. |
| Upgrade de Plano                  | **upgrade.cy.ts**        | Testa o fluxo de upgrade de plano (exemplo: Free para Basic), preenchendo os dados de pagamento (cartão de crédito) e confirmando a contratação. |
| Editar Informações de Usuário     | **userInformation.cy.ts** | Testa a visualização e edição de informações pessoais do usuário. |
| Editar Informações Médicas        | **userInformation.cy.ts** | Testa o preenchimento dos campos médicos. |
| Editar Informações do Consultório | **userInformation.cy.ts** | Testa a atualização dos dados do consultório. |

---
