/// <reference types="cypress" />

describe("Chatbot Flow Test", () => {
  it("checks if Chatbot interaction flow is correct until first description displayed and answer clicked", () => {
    cy.visit("https://theaimdb.netlify.app/").wait(10000);

    cy.get(".sc-kAzzGY")
      .click()
      .type("John{enter}")
      .wait(4000);

    cy.get(".sc-htpNat .sc-bxivhb:first")
      .should("be.visible")
      .click()
      .wait(5000);

    cy.get(".sc-htpNat .sc-bxivhb:first")
      .should("be.visible")
      .click()
      .wait(6000);

    cy.get(".sc-bZQynM.UlqqE.rsc-ts-bubble")
      .should("be.visible")
      .invoke("text")
      .should("have.length.greaterThan", 10);

    cy.get(".sc-htpNat .sc-bxivhb:first")
      .should("be.visible")
      .click();
  });
});
