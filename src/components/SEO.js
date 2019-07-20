import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";

export const Component = function({ lang, meta = [], title, data }) {
  const { site } = data;
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: "description",
          content: site.siteMetadata.description
        },
        {
          name: "author",
          content: site.siteMetadata.author
        }
      ].concat(meta)}
    />
  );
};

export default function SEO(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
              author
            }
          }
        }
      `}
      render={data => <Component data={data} {...props} />}
    />
  );
}
