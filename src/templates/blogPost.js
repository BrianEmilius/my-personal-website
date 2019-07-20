import React, { Component } from "react";
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

export default class BlogPost extends Component {
  constructor(props) {
    super(props);
    const { markdownRemark } = props.data;
    const { frontmatter, html } = markdownRemark;
    const { siteMetadata } = props.data.site;
    this.frontmatter = frontmatter;
    this.html = html;
    this.siteMetadata = siteMetadata;
    this.comments = React.createRef();
  }

  componentDidMount() {
    const title = this.frontmatter.title;
    const gitment = new Gitment({
      id: title,
      owner: "brianemilius",
      repo: "www.brianemilius.com",
      oauth: {
        client_id: "78d9230d901226dec1af",
        client_secret: "dfc52df7f16841b01881cd5297371a7860021a90"
      }
    });

    this.comments.current.appendChild(gitment.render());
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <link
            rel="cannonical"
            href={`${this.siteMetadata.siteUrl}${this.frontmatter.path}`}
          />
        </Helmet>
        <Article
          itemProp="//schema.org/mainEntityOfPage"
          itemScope={true}
          itemType="//schema.org/BlogPosting"
        >
          <h1 itemProp="//schema.org/headline">{this.frontmatter.title}</h1>
          <p>
            <span itemProp="//schema.org/author">
              {this.siteMetadata.author}
            </span>
            ,{" "}
            <time
              dateTime={this.frontmatter.date}
              itemProp="//schema.org/datePublished"
            >
              {this.frontmatter.date}
            </time>
          </p>
          <div dangerouslySetInnerHTML={{ __html: this.html }} />
          <section ref={this.comments}>
            <h1>Comments</h1>
          </section>
        </Article>
      </Layout>
    );
  }
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
