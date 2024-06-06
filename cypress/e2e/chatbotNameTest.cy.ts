/// <reference types="cypress" />

describe("Chatbot Flow Test", () => {
  it("checks if Chatbot correctly displays entered name", () => {
    cy.visit("https://theaimdb.netlify.app/").wait(10000);

    cy.get(".sc-kAzzGY")
      .click()
      .type("John{enter}")
      .wait(4000);

    cy.get(".sc-bZQynM.cAqQwz")
      .contains("John")
      .should("be.visible");
  });
});
