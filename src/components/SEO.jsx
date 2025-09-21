import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "LA Marketing - Digital Marketing Agency UAE",
  description = "Leading digital marketing agency in Dubai, UAE. Specializing in influencer marketing, social media management, brand development, and digital transformation for businesses across the Middle East.",
  keywords = "digital marketing Dubai, influencer marketing UAE, social media management, brand development, marketing agency UAE, Dubai marketing",
  image = "https://www.lamarketingae.com/og-image.jpg",
  url = "https://www.lamarketingae.com",
  type = "website",
  structuredData = null
}) => {
  const fullTitle = title.includes("LA Marketing") ? title : `${title} | LA Marketing`;
  const fullUrl = url.startsWith('http') ? url : `https://www.lamarketingae.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://www.lamarketingae.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="LA Marketing" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="LA Marketing" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@lamarekting" />
      <meta name="twitter:creator" content="@lamarekting" />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="LA Marketing" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
