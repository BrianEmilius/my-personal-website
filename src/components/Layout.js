import React from "react";
import { graphql, StaticQuery } from "gatsby";

import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import SEO from "./SEO";

const query = graphql`
  query {
    timeme: file(base: { eq: "timeme.min.js" }) {
      publicURL
    }
    analytics: file(base: { eq: "analytics.js" }) {
      publicURL
    }
  }
`;

const Component = function({ children, data, title }) {
  return (
    <div itemScope={true} itemType="https://schema.org/WebPage">
      <SEO title={title} lang="en" />
      <SiteHeader />
      {children}
      <SiteFooter />
      <script src={data.timeme.publicURL} />
      <script src={data.analytics.publicURL} />
    </div>
  );
};

export default function Layout({ children, title }) {
  return (
    <StaticQuery
      query={query}
      render={data => (
        <Component children={children} data={data} title={title} />
      )}
    />
  );
}
