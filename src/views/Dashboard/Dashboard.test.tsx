import { render, screen } from "@testing-library/react";
import { Dashboard } from "./Dashboard";

test("renders dashboard", () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/Get where you want/);
  expect(linkElement).toBeInTheDocument();
});
