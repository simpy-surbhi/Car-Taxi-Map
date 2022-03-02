import { render } from "@testing-library/react";
import { Vehicle } from "./Vehicle";
test("renders Vehicle", () => {
  const props = {
    free: {
      id: 12345,
      coordinate: {
        latitude: 41,
        longitude: 52,
      },
      state: "test",
      type: "test",
    },
    setSelectedPosition: jest.fn(),
  };
  const component = render(<Vehicle {...props} />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
