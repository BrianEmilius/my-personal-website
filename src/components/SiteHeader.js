import React, { Component } from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import Styled from "styled-components";

import PrimaryNavigation from "./PrimaryNavigation";

const Header = Styled.header`
position: fixed;
height: 100vh;
z-index: 100;
right: -80%;
width: 80%;
text-align: center;
background-color: hsl(5, 100%, 75%);
transition: right 400ms ease;
@media screen and (min-width: 30em) {
  right: -60%;
  width: 60%;
}
@media screen and (min-width: 40em) {
  right: -45%;
  width: 45%;
}
@media screen and (min-width: 56em) {
  right: -40%;
  width: 40%;
}
@media screen and (min-width: 64em) {
  right: 0;
  width: 30%;
}
@media screen and (min-width: 100em) {
  right: 0;
  width: 20%;
}
&.show {
  right: 0;
}
`;

const Brand = Styled(Link)`
display: block;
font-size: 200%;
color: hsl(0, 0%, 6%);
text-decoration: none;
margin-top: 2em;
text-transform: uppercase;
`;

const Logo = Styled.img`
width: 50%;
height: auto;
`;

export default class SiteHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "hide"
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ menu: nextProps.menu });
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            logo: file(base: { eq: "icon.png" }) {
              publicURL
            }
          }
        `}
        render={data => {
          return (
            <Header id="siteHeader" className={this.state.menu}>
              <Brand to="/">
                <Logo src={data.logo.publicURL} alt="Cartoon Brian" />
                <br />
                Brian Emilius
              </Brand>
              <PrimaryNavigation />
              <a
                href="https://twitter.com/brianemilius?ref_src=twsrc%5Etfw"
                className="twitter-follow-button"
                data-show-count="true"
              >
                Follow @brianemilius
              </a>
            </Header>
          );
        }}
      />
    );
  }
}
