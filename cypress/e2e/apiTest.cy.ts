/// <reference types="cypress" />

describe("openAI API test", () => {
  it("checks if API is called correctly and if response is received", () => {
    const API_KEY = Cypress.env("VITE_OPENAI_API_KEY");
    const prompt = `This is a test, respond with 'Hello!'`;

    cy.request({
      method: "POST",
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 5,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.choices[0].message.content).to.include("Hello");
    });
  });
});
