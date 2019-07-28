import React from "react";
import Styled from "styled-components";

import Layout from "../components/Layout";

const Section = Styled.section`
  background-color: hsl(0, 0%, 97%);
  padding: 1em;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  min-height: 95vh;
  @media screen and (min-width: 30em) {
    margin: 0 var(--pageMargin);
  }
`;

export default function Credits() {
  return (
    <Layout title="Credits">
      <Section>
        <h1>Credits</h1>
        <p>
          Home, External, and GitHub icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/dave-gandy"
            title="Dave Gandy"
          >
            Dave Gandy
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>{" "}
          is licensed by{" "}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC 3.0 BY
          </a>
        </p>
        <p>
          Twitter icon made by{" "}
          <a
            href="https://www.flaticon.com/authors/bogdan-rosu"
            title="Bogdan Rosu"
          >
            Bogdan Rosu
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>{" "}
          is licensed by{" "}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC 3.0 BY
          </a>
        </p>
        <p>
          RSS icon made by{" "}
          <a href="https://www.freepik.com/" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>{" "}
          is licensed by{" "}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC 3.0 BY
          </a>
        </p>
        <p>
          Background image on frontpage Hero box created by{" "}
          <a href="https://www.freepik.com/free-photos-vectors/background">
            creativeart - www.freepik.com
          </a>
        </p>
      </Section>
    </Layout>
  );
}
