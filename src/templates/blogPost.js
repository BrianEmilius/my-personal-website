import React from "react";
import { graphql } from "gatsby";
import Styled from "styled-components";
import Helmet from "react-helmet";
import Layout from "../components/Layout";

const Article = Styled.article`
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  background-color: hsl(0, 0%, 97%);
  padding: 1em;
  @media screen and (min-width: 30em) {
    margin: 0 var(--pageMargin);
  }
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
        <h1 itemProp="//schema.org/headline">{frontmatter.title}</h1>
        <p>
          <span itemProp="//schema.org/author">{siteMetadata.author}</span>,{" "}
          <time
            dateTime={frontmatter.date}
            itemProp="//schema.org/datePublished"
          >
            {frontmatter.date}
          </time>
        </p>
        <span itemProp="//schema.org/dateModified" />
        <span itemProp="//schema.org/image" />
        <span itemProp="//schema.org/publisher" />
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          itemProp="//schema.org/mainEntityOfPage"
        />
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
        featured_image {
          publicURL
        }
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
