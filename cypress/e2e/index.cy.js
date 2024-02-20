import { ui } from "../../src/i18n/ui";

it("titles are correct", () => {
  const page = cy.visit("/login");

  page.get("title").should("have.text", ui.en["login.title"]);
});
