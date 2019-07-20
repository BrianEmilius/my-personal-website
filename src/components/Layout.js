import React from "react";

import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import SEO from "./SEO";

export default function Layout({ title, children }) {
  return (
    <div itemScope={true} itemType="//schema.org/WebPage">
      <SEO title={title} lang="en" />
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
