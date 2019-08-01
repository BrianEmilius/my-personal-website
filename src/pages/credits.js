import React from "react";
import Styled from "styled-components";

import Layout from "../components/Layout";
import Main from "../components/main";

const Section = Styled.section`
min-height: 100vh;
padding: 1em;
@media screen and (min-width: 40em) {
  width: 70%;
  max-width: 40em;
  margin: 0 auto;
}
@media screen and (min-width: 64em) {
  width: 100%;
  max-width: 30em;
}
@media screen and (min-width: 70em) {
  width: 100%;
  max-width: 35em;
}
`;

export default function Credits() {
  return (
    <Layout title="Credits">
      <Main>
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
      </Main>
    </Layout>
  );
}
