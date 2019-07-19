import React from "react";
import { graphql } from "gatsby";
import Styled from "styled-components";
import Helmet from "react-helmet";
import Layout from "../components/Layout";
import Gitment from "gitment";

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

  const comments = React.createRef();

  const gitment = new Gitment({
    id: frontmatter.title,
    owner: "brianemilius",
    repo: "www.brianemilius.com",
    oauth: {
      client_id: "78d9230d901226dec1af",
      client_secret: "dfc52df7f16841b01881cd5297371a7860021a90"
    }
  });

  gitment.render(comments);

  return (
    <Layout>
      <Helmet>
        <link
          rel="cannonical"
          href={`${siteMetadata.siteUrl}${frontmatter.path}`}
        />
      </Helmet>
      <Article
        itemProp="//schema.org/mainEntityOfPage"
        itemScope={true}
        itemType="//schema.org/BlogPosting"
      >
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
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <section ref={comments}>
          <h1>Comments</h1>
        </section>
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
