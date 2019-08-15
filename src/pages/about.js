import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import styles from "./about.module.css";

import Layout from "../components/Layout";
import Main from "../components/main";
import PageSection from "../components/PageSection";

const query = graphql`
  query {
    cmd64: file(base: { eq: "commodore64.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 2048) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

export default function About() {
  return (
    <StaticQuery
      query={query}
      render={data => (
        <Layout title="About">
          <Main>
            <PageSection>
              <h1>All About Me</h1>
              <p>Here's what I know:</p>
              <section className={styles.skillSection}>
                <article>
                  <h1 className={styles.skillHeading}>Core</h1>
                  <ul className={styles.skillList}>
                    <li>JavaScript</li>
                    <li>CSS3</li>
                    <li>HTML5</li>
                    <li>Responsive Design</li>
                    <li>Node.js</li>
                    <li>PHP</li>
                    <li>MySQL</li>
                    <li>MongoDB</li>
                  </ul>
                </article>
                <article>
                  <h1 className={styles.skillHeading}>Libraries</h1>
                  <ul className={styles.skillList}>
                    <li>Express</li>
                    <li>React</li>
                    <li>Gulp</li>
                    <li>Bootstrap</li>
                  </ul>
                </article>
                <article>
                  <h1 className={styles.skillHeading}>Servers</h1>
                  <ul className={styles.skillList}>
                    <li>Linux (CentOS, Debian)</li>
                    <li>Apache 2</li>
                    <li>nginx</li>
                  </ul>
                </article>
              </section>

              <section>
                <p>
                  <strong>The short version:</strong> I teach web developer
                  classes at college in Denmark and I have been messing around
                  on the WWW since it became a thing.
                </p>
                <p>
                  <strong>A bit more:</strong> Once upon a time, when I was a
                  little boy, I messed around with my Commodore64 and a casette
                  bay full of games. Assembly was the language and I just wanted
                  to have infinite lives in my games. That was my introduction
                  to programming.
                </p>
                <Img
                  fluid={data.cmd64.childImageSharp.fluid}
                  alt="An old Commodore 64 with a casette bay"
                />
                <p>
                  Later, I discovered Commodore Basic on my Amiga 500. And then
                  came along the 90ies.
                </p>
                <p>
                  The World Wide Web was suddenly a thing, and the minister of
                  state in Denmark had decreed that all citizens should have
                  access to it. My family got a spanking new 56k dial-up modem
                  and I was sold! Not literally sold, don't worry. My parents
                  were good parents. They'd never do anything like that. I
                  promise.
                </p>
                <p>
                  The very first website I made was a small information site
                  about an aquarium club my friend and I had started. It had
                  animated GIFs, marquee text, and a "This homepage is best
                  viewed with Internet Explorer" logo. And it was built using
                  tables, of course.
                </p>
                <p>
                  9 years later I graduated college with a Bachelors degree in
                  Pedagogy and Didactics. And now I teach budding web developers
                  all about the fantastic world of programming - a true passion
                  of mine.
                </p>
              </section>
            </PageSection>
          </Main>
        </Layout>
      )}
    />
  );
}
