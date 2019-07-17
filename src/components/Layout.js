import React from "react";

import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function Layout({ children }) {
  return (
    <div itemScope={true} itemType="//schema.org/WebPage">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
