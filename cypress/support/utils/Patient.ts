export function AddPatientCommon(user: User) {
  cy.contains('Adicionar Paciente')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });

  cy.get('input[placeholder="Digite o nome do paciente"]:visible', { timeout: 10000 })
    .should('be.visible')
    .click()
    .type(user.namePatient, { delay: 0 });

  cy.get('input[placeholder="Celular com WhatsApp"]:visible')
    .should('be.visible')
    .click()
    .clear()
    .type(user.whatsapp, { delay: 0 });

    cy.wait(1000); 

  cy.get('.chakra-modal__content:visible').within(() => {
    cy.contains('button', 'Adicionar')
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: true });
  });

  cy.get('button[aria-label="Close"].chakra-modal__close-btn')
    .filter(':visible')
    .first()
    .should('be.visible')
    .click({ force: true });

  cy.wait(500);
}

export function searchAndClickPatient(user: User) {
  
  cy.get('input[placeholder="Pesquisar paciente"]')
    .should('be.visible')
    .clear()
    .type(user.namePatient + '{enter}', { force: true });

  cy.wait(2000);
  cy.get('p.chakra-text.css-1lmd9lu')
    .contains(user.namePatient)
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });
}

export function accessPatientScreen(user: User) {
  cy.login(user);
  cy.contains('Olá', { timeout: 10000 }).should('exist');

  cy.get('button.chakra-button').filter((index, el) => {
    return el.querySelector('path[d*="M15 6.75a3 3 0 11-6 0"]') !== null;
  })
  .first()
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

  cy.contains('Pacientes', { timeout: 10000 }).should('be.visible');

  cy.wait(1000);
}

export function editPatient(user: User) {
  cy.get('input[placeholder="Digite o nome do paciente"]', { timeout: 10000 })
    .should('exist')
    .and('be.visible')
    .clear()
    .type(user.name);

  cy.get('input[placeholder="Celular com WhatsApp"]')
    .first()
    .clear()
    .type(user.whatsapp, { delay: 0 });

  cy.contains('Informações adicionais').click({ force: true });

  cy.get('input[placeholder="Celular com WhatsApp"]')
    .eq(1)
    .clear()
    .type(user.secondary_phone);

  const [day, month, year] = user.date_of_birth.split('/');
  const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

  cy.get('input[name="patient.birthDate"]')
    .clear()
    .type(isoDate, { force: true });

  cy.get('input[placeholder="Digite convênio do paciente"]')
    .clear()
    .type(user.health_insurance);

  cy.get('select[name="patient.gender"]').select('Feminino');

  cy.get('input[placeholder="Digite o email"]')
    .clear()
    .type(user.email);

  cy.get('input[placeholder^="Digite a profissão"]')
    .clear()
    .type(user.occupation);

  cy.get('input[placeholder="Digite o nome do contato próximo"]')
    .clear()
    .type(user.emergency_contact);

  cy.get('input[placeholder="Celular com WhatsApp"]')
    .eq(2)
    .clear()
    .type(user.emergency_phone);

  cy.get('input[placeholder="Digite o CEP do paciente"]')
    .clear()
    .type(user.zip_code);

  cy.wait(2000);

  cy.get('input[placeholder="Número"]')
    .clear()
    .type(user.number);

  cy.get('input[placeholder="Complemento"]')
    .clear()
    .type(user.complement);

  cy.get('button.chakra-button')
    .contains('Adicionar')
    .should('be.visible')
    .click({ force: true });

  cy.wait(2000);

  cy.get('button[aria-label="Close"].chakra-modal__close-btn')
    .filter(':visible')
    .first()
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });
}
