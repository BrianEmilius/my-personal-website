import React from "react";
import { Link } from "gatsby";

export default function Layout({ children }) {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/blog">Blog</Link>
      {children}
    </>
  );
}
