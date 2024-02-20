import { render, screen } from "@testing-library/react";
import { Modal } from "./Modal";
import { toggleMenu } from "../layouts/store";
import { ui } from "../i18n/ui";

beforeAll(() => {
  toggleMenu();
});

test("loads and displays modal", async () => {
  render(<Modal lang="en" />);

  expect(screen.getByText(ui.en["modal.paragraph1"])).toBeInTheDocument();
});
