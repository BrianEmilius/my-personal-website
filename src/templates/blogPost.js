import React from "react";
import { graphql } from "gatsby";
import Styled from "styled-components";
import Helmet from "react-helmet";
import Layout from "../components/Layout";

const Article = Styled.article`
  padding: 0 var(--pageMargin);
`;

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
      <Article itemScope={true} itemType="//schema.org/BlogPosting">
        <h1>{frontmatter.title}</h1>
        <p>
          <span itemProp="//schema.org/author">{siteMetadata.author}</span>,{" "}
          <time dateTime={frontmatter.date}>{frontmatter.date}</time>
        </p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Article>
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
