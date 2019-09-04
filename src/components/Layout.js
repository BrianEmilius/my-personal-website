import React, { Component } from "react";

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

    let log = JSON.parse(window.sessionStorage.getItem("log"));

    if (!log) {
      window.sessionStorage.setItem(
        "log",
        JSON.stringify({
          startedAt: Date.now(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          agent: navigator.userAgent,
          language: navigator.language,
          ref: document.referrer,
          latency:
            window.performance.timing.responseEnd -
            window.performance.timing.fetchStart,
          pageLoad:
            window.performance.timing.loadEventEnd -
            window.performance.timing.responseEnd,
          events: []
        })
      );
    }

    log = JSON.parse(window.sessionStorage.getItem("log"));

    log.events.push({
      timestamp: Date.now(),
      label: "PAGE",
      event: window.location.pathname
    });
    window.sessionStorage.setItem("log", JSON.stringify(log));

    window.addEventListener("pagehide", endSession);
    window.addEventListener("beforeunload", endSession);
    window.addEventListener("unload", endSession);

    let skip;

    function endSession() {
      if (skip) return;
      if (!window.sessionStorage.getItem("log")) return;
      skip = true;

      const { vendor } = window.navigator;
      const log = window.sessionStorage.getItem("log");
      window.sessionStorage.clear();

      const lastEvent = {
        timestamp: Date.now(),
        label: "EXIT",
        event: "end session"
      };

      if (window.navigator.sendBeacon && !~vendor.indexOf("Apple")) {
        const beacon = window.navigator.sendBeacon(
          "/.netlify/functions/analytics",
          JSON.stringify({ log, lastEvent })
        );
        if (beacon) return;
      }

      const request = new XMLHttpRequest();
      request.open("POST", "/.netlify/functions/analytics", false);
      request.setRequestHeader("content-type", "application/json");
      request.send(JSON.stringify({ log, lastEvent }));
    }
  }

  toggle() {
    if (this.state.menu === "hide") this.setState({ menu: "show" });
    else this.setState({ menu: "hide" });
  }

  render() {
    const { children, title } = this.props;
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
        <script
          data-external-script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        />
      </div>
    );
  }
}
