import React from "react";
import { TwitterShareButton } from "react-share";

export default function Share({ url, title, twitterHandle }) {
  return (
    <TwitterShareButton title={title} via={twitterHandle} url={url}>
      <span>Tweet</span>
    </TwitterShareButton>
  );
}
