import React, { Component } from "react";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import LatestPosts from "../components/LatestPosts";

export default class Index extends Component {
  render() {
    return (
      <Layout title="Home">
        <div style={{ "grid-area": "main" }}>
          <Hero />
          <LatestPosts />
        </div>
      </Layout>
    );
  }
}
