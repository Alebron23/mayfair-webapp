import React from "react";
import { Helmet } from "react-helmet";
import logo from "../../imgs/logoTransparent.png";

const HelmutWrapper = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logo} />
      <meta
        property="og:url"
        content={
          "https://mayfairmotorco.com" +
          window.location.pathname +
          window.location.search
        }
      />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={logo} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default HelmutWrapper;
