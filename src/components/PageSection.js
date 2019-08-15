import React from "react";
import styles from "./PageSection.module.css";

export default function PageSection({ children }) {
  return <section className={styles.pageSection}>{children}</section>;
}
