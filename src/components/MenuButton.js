import React, { Component } from "react";
import styles from "./MenuButton.module.css";
import { graphql, StaticQuery } from "gatsby";

export default class MenuButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "hide"
    };
  }

  render() {
    const style = {
      position: this.props.menu === "show" ? "fixed" : "absolute"
    };
    return (
      <StaticQuery
        query={graphql`
          query {
            burger: file(base: { eq: "burger-icon.svg" }) {
              publicURL
            }
          }
        `}
        render={data => (
          <button
            onClick={this.props.toggle}
            className={styles.menuToggle}
            style={style}
          >
            Menu <img src={data.burger.publicURL} alt="menu icon" />
          </button>
        )}
      />
    );
  }
}
