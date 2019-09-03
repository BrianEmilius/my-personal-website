import React from "react";

import Layout from "../components/Layout";
import Main from "../components/main";
import PageSection from "../components/PageSection";

export default function About() {
  return (
    <Layout title="About">
      <Main>
        <PageSection>
          <h1>404: Not Found</h1>
          <p>It looks like the page you are looking for doesn't exist.</p>
        </PageSection>
      </Main>
    </Layout>
  );
}
