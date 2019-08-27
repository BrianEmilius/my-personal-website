import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import styles from "./PrimaryNavigation.module.css";

export default function PrimaryNavigation() {
  return (
    <nav>
      <ul className={styles.primaryNavigation}>
        {/* <li>
          <Link to="/work" className={styles.primaryNavigation__link}>
            Work
          </Link>
        </li>
        <li>
          <Link to="/contact" className={styles.primaryNavigation__link}>
            Contact
          </Link>
        </li> */}
        <li key="/about">
          <AniLink fade to="/about" className={styles.primaryNavigation__link}>
            About
          </AniLink>
        </li>
        <li key="/blog">
          <AniLink fade to="/blog" className={styles.primaryNavigation__link}>
            Blog
          </AniLink>
        </li>
      </ul>
    </nav>
  );
}
