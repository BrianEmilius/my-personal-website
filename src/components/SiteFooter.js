import React from "react";
import { Link } from "gatsby";
import Styled from "styled-components";

const Footer = Styled.footer`
	background-color: hsl(0, 0%, 4%);
	color: hsl(0, 0%, 97%);
	padding: 1em;
	display: flex;
	justify-content: space-between;
`;

export default function SiteFooter() {
  return (
    <Footer>
      <section>
        <h1>About this site</h1>
        <p>
          <Link to="/credits">List of credits</Link>
        </p>
        <p>Made with Gatsby</p>
        <p>Hosted by Netlify</p>
      </section>
      <section>
        <p>Copyright &copy; 2019</p>
      </section>
      <section>
        <h1>Reach out!</h1>
        some stuff
      </section>
    </Footer>
  );
}
