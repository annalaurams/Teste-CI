/// <reference types="cypress" />

interface User {
  email: string;
  password: string;
  [key: string]: any;
}

interface UsersFixture {
  basic: User;
  [key: string]: User;
}

interface Questionnaire {
  name: string;
  namePatient: string;
  [key: string]: any;
}

interface QuestionnaireFixture {
  basic: Questionnaire;
  [key: string]: Questionnaire;
}

declare namespace Cypress {
  interface Chainable {
    login(user: { email: string; password: string }): Chainable<void>;
    logout(): Chainable<void>;
  }
}



