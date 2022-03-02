import { render } from "@testing-library/react";
import { DelayedLinearProgress } from "./DelayedLinearProgress";

test("renders DelayedLinearProgress", () => {
  const component = render(<DelayedLinearProgress />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
