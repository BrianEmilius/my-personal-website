import React, { Component } from "react";
import { graphql } from "gatsby";
import Styled from "styled-components";
import Helmet from "react-helmet";
import moment from "moment";
import Gitalk from "gitalk";

// eslint-disable-next-line
import { fluidImage } from "../components/queryFragments";
import Layout from "../components/Layout";
import Main from "../components/main";
import CoverImage from "../components/CoverImage";
import Tags from "../components/Tags";

const Article = Styled.article`
padding: 1em;
@media screen and (min-width: 40em) {
  width: 70%;
  max-width: 40em;
  margin: 0 auto;
}
@media screen and (min-width: 64em) {
  width: 100%;
  max-width: 30em;
}
@media screen and (min-width: 70em) {
  width: 100%;
  max-width: 35em;
}
`;

export default class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { markdownRemark } = props.data;
    const { frontmatter, html, excerpt, fields } = markdownRemark;
    const { siteMetadata } = props.data.site;
    this.frontmatter = frontmatter;
    this.html = html;
    this.excerpt = excerpt;
    this.siteMetadata = siteMetadata;
    this.fields = fields;
  }

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    const title = this.frontmatter.title;
    const path = this.fields.slug;
    const url = this.siteMetadata.siteUrl;
    const gitalk = new Gitalk({
      clientID: "78d9230d901226dec1af",
      clientSecret: "dfc52df7f16841b01881cd5297371a7860021a90",
      repo: "www.brianemilius.com",
      owner: "be-comments",
      admin: ["BrianEmilius"],
      id: path,
      title: `Comments on '${title}'`,
      body: `This issue exists to host comments for ${url}${path}`,
      distractionFreeMode: false
    });
    gitalk.render("gitalk");
  }

  getOGImage(site, frontmatter) {
    if (frontmatter.image)
      return (
        <meta
          property="og:image"
          content={`${site.siteUrl}${
            frontmatter.image.childImageSharp.fluid.src
          }`}
        />
      );
  }

  render() {
    return (
      <Layout title={this.frontmatter.title}>
        <Helmet>
          <link
            rel="canonical"
            href={`${this.siteMetadata.siteUrl}${this.fields.slug}`}
          />
          <meta
            property="og:url"
            content={`${this.siteMetadata.siteUrl}${this.fields.slug}`}
          />
          <meta property="og:title" content={this.frontmatter.title} />
          <meta property="og:description" content={this.excerpt} />
          <meta property="og:type" content="website" />
          {this.getOGImage(this.siteMetadata, this.frontmatter)}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:author" content="@BrianEmilius" />
          <meta name="twitter:site" content={this.siteMetadata.siteUrl} />
          <meta name="twitter:title" content={this.frontmatter.title} />
          <meta name="twitter:description" content={this.excerpt} />
        </Helmet>
        <Main>
          <Article
            itemProp="https://schema.org/mainEntityOfPage"
            itemScope={true}
            itemType="https://schema.org/BlogPosting"
          >
            <CoverImage frontmatter={this.frontmatter} />
            <h1 itemProp="https://schema.org/headline">
              {this.frontmatter.title}
            </h1>
            <p>
              <span itemProp="https://schema.org/author">
                {this.siteMetadata.author}
              </span>
              ,{" "}
              <time
                dateTime={this.frontmatter.date}
                itemProp="https://schema.org/datePublished"
              >
                {moment(this.frontmatter.date).format("MMM Do YYYY")}
              </time>{" "}
              <a
                href="https://twitter.com/share"
                className="twitter-share-button"
                data-text={this.frontmatter.title}
                data-hashtags="devcommunity"
                data-show-count="true"
                data-via="BrianEmilius"
              >
                Tweet
              </a>
            </p>
            <Tags frontmatter={this.frontmatter} />
            <div dangerouslySetInnerHTML={{ __html: this.html }} />
            <section>
              <h1>Comments</h1>
              <div id="gitalk" />
            </section>
          </Article>
        </Main>
      </Layout>
    );
  }
}

export const logQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        tags
        date
        title
        image {
          ...fluidImage
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
