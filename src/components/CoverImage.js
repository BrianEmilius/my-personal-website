import React from "react";
import Img from "gatsby-image";
import Styled from "styled-components";

const ImageContainer = Styled.div`
  overflow: hidden;
  height: 150px;
  @media screen and (min-width: 40em) {
    height: 300px;
  }
  @media screen and (min-width: 64em) {
    height: 350px;
  }
`;

export default function CoverImage({ frontmatter }) {
  if (frontmatter.image) {
    return (
      <ImageContainer>
        <Img
          itemProp="https://schema.org/image"
          fluid={frontmatter.image.childImageSharp.fluid}
          alt=""
        />
      </ImageContainer>
    );
  }
  return null;
}
