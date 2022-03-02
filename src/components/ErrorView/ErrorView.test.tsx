import { render } from "@testing-library/react";
import { ErrorView } from "./ErrorView";

test("renders ErrorView 1", () => {
  const component = render(<ErrorView error={new Error("error")} />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});

test("renders ErrorView 2", () => {
  const component = render(
    <ErrorView error={new Error("error")} helpMsg={"test"} />
  );
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
