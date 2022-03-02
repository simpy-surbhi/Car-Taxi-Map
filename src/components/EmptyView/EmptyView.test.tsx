import { render } from "@testing-library/react";
import { EmptyView } from "./EmptyView";

test("renders EmptyView", () => {
  const component = render(<EmptyView />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});

test("renders EmptyView 2", () => {
  const component = render(<EmptyView hidden />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});

test("renders EmptyView 3", () => {
  const component = render(<EmptyView hideImage />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
