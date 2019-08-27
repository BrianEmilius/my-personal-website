import React from "react";
import renderer from "react-test-renderer";
import { StaticQuery } from "gatsby";

import TagCloud from "../tag-cloud";

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      allMarkdownRemark: {
        edges: [
          {
            node: {
              frontmatter: {
                tags: ["ost", "feta"]
              }
            }
          },
          {
            node: {
              frontmatter: {
                tags: ["gouda"]
              }
            }
          }
        ]
      }
    })
  );
});

describe("TagCloud", function() {
  it("renders correctly", function() {
    const tree = renderer.create(<TagCloud />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
