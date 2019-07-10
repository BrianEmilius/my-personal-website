import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Layout from "../components/Layout";

export default function BlogPost(props) {
  const { markdownRemark } = props.data;
  const { frontmatter, html } = markdownRemark;
  const { siteMetadata } = props.data.site;

  return (
    <Layout>
      <Helmet>
        <link
          rel="cannonical"
          href={`${siteMetadata.siteUrl}${frontmatter.path}`}
        />
      </Helmet>
      <article>
        <h1>{frontmatter.title}</h1>
        <p>
          {siteMetadata.author},{" "}
          <time dateTime={frontmatter.date}>{frontmatter.date}</time>
        </p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  );
}

export const logQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        path
        title
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
        author
      }
    }
  }
`;
