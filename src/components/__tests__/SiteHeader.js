import React from "react";
import renderer from "react-test-renderer";
import { StaticQuery } from "gatsby";
import FileMock from "../../../__mocks__/file-mock";

import SiteHeader from "../SiteHeader";

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      home: {
        publicURL: FileMock
      }
    })
  );
});

describe("SiteHeader", function() {
  it("renders correctly", function() {
    const tree = renderer.create(<SiteHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
