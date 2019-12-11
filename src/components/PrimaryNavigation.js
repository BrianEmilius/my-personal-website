import React from "react";
import { Link } from "gatsby";
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
          <Link to="/about" className={styles.primaryNavigation__link}>
            About
          </Link>
        </li>
        <li key="/blog">
          <Link to="/blog" className={styles.primaryNavigation__link}>
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
}
