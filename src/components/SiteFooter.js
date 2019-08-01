import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import styles from "./site-footer.module.css";

const query = graphql`
  query {
    github: file(base: { eq: "github-logo.svg" }) {
      publicURL
    }
    twitter: file(base: { eq: "twitter-logo-button.svg" }) {
      publicURL
    }
    dev: file(base: { eq: "dev-badge.svg" }) {
      publicURL
    }
  }
`;

function Component({ github, twitter, dev }) {
  return (
    <footer className={styles.siteFooter}>
      <section>
        <h1>About this site</h1>
        <p>
          <Link to="/credits">List of credits</Link>
        </p>
        <p>
          Made with <a href="//www.gatsbyjs.org/">Gatsby</a>
        </p>
        <p>
          Hosted by <a href="//www.netlify.com/">Netlify</a>
        </p>
      </section>
      <section>
        <p>Copyright &copy; 2015-{new Date().getFullYear()}</p>
      </section>
      <section>
        <h1>Reach out!</h1>
        <p>
          <a href="//twitter.com/BrianEmilius/" title="Twitter">
            <img
              className={styles.someIcon}
              src={twitter.publicURL}
              alt="Twitter icon"
            />
            <span className="sr-only"> Twitter</span>
          </a>{" "}
          <a href="//github.com/BrianEmilius/" title="GitHub">
            <img
              className={styles.someIcon}
              src={github.publicURL}
              alt="GitHub octocat icon"
            />
            <span className="sr-only"> GitHub</span>
          </a>{" "}
          <a href="https://dev.to/brianemilius" title="DEV Community">
            <img
              className={styles.someIcon}
              src={dev.publicURL}
              alt="Brian Emilius's DEV Profile"
            />
            <span className="sr-only"> DEV Community</span>
          </a>
        </p>
      </section>
    </footer>
  );
}

export default function SiteFooter() {
  return <StaticQuery query={query} render={data => <Component {...data} />} />;
}
