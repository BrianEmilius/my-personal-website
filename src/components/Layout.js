import React from "react";

import SiteHeader from "./SiteHeader";

export default function Layout({ children }) {
  return (
    <div itemScope={true} itemType="//schema.org/WebPage">
      <SiteHeader />
      {children}
    </div>
  );
}
