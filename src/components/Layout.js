import React, { Component } from "react";
import { graphql, StaticQuery } from "gatsby";

import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import SEO from "./SEO";
import MenuButton from "./MenuButton";
import styles from "./layout.module.css";

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "hide"
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const scripts = document.querySelectorAll("[data-external-script]");
    scripts.forEach(function RunScript(element) {
      fetch(element.src)
        .then(response => response.text())
        // eslint-disable-next-line
        .then(data => window.eval(data));
    });

    document.addEventListener("keyup", event => {
      if (event.key === "Escape" && this.state.menu === "show") this.toggle();
      if (event.key.toLowerCase() === "m") this.toggle();
    });
  }

  toggle() {
    if (this.state.menu === "hide") this.setState({ menu: "show" });
    else this.setState({ menu: "hide" });
  }

  render() {
    const { children, title } = this.props;

    return (
      <StaticQuery
        query={graphql`
          query {
            timeme: file(base: { eq: "timeme.min.js" }) {
              publicURL
            }
            analytics: file(base: { eq: "analytics.js" }) {
              publicURL
            }
          }
        `}
        render={data => {
          return (
            <div
              itemScope={true}
              itemType="https://schema.org/WebPage"
              className={styles.layoutContainer}
            >
              <SEO title={title} lang="en" />
              <MenuButton menu={this.state.menu} toggle={this.toggle} />
              <SiteHeader menu={this.state.menu} />
              {children}
              <SiteFooter />
              <script data-external-script src={data.timeme.publicURL} />
              <script data-external-script src={data.analytics.publicURL} />
              <script
                data-external-script
                async
                src="https://platform.twitter.com/widgets.js"
                charSet="utf-8"
              />
            </div>
          );
        }}
      />
    );
  }
}
