import React from "react";
import renderer from "react-test-renderer";

import PrimaryNavigation from "../PrimaryNavigation";

describe("PrimaryNavigation", function() {
  it("renders correctly", function() {
    const tree = renderer.create(<PrimaryNavigation />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
