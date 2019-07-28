import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Styled from "styled-components";
import BackgroundImage from "gatsby-background-image";

const imageQuery = graphql`
  query {
    file(relativePath: { eq: "code-on-desktop.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 5616) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

const Component = function({ file }) {
  const Hero = Styled(BackgroundImage)`
    height: 95vh;
    background-color: hsl(240, 30%, 20%);
		background-size: cover;
    background-attachment: fixed;
    display: flex;
    padding: 0 var(--pageMargin);
    align-items: center;
    justify-content: center;
		@media screen and (max-width: 30em) {
			background-position: center top;
		}
  `;

  const Paragraph = Styled.p`
    background: hsla(0, 0%, 3%, 0.75);
    color: hsl(0, 0%, 87%);
    padding: 2em;
    margin: 0;
    width: 100%;
    font-size: 120%;
    @media screen and (min-width: 30em) {
      font-size: 180%;
    }
  `;
  return (
    <Hero Tag="section" fluid={file.childImageSharp.fluid}>
      <Paragraph>
        Hello, World! My name is{" "}
        <strong itemProp="https://schema.org/Author">Brian Emilius</strong>.
        <br />I teach web development.
      </Paragraph>
    </Hero>
  );
};

export default function Hero() {
  return (
    <StaticQuery query={imageQuery} render={data => <Component {...data} />} />
  );
}
