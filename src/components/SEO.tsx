import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = "AI Utsav | The Ultimate Multi-AI Chat Aggregator",
  description = "Access ChatGPT-5, Claude 3.5, and Gemini 2.5 in one unified, free interface. Built for the Indian AI community with Hindi support.",
  keywords = "AI, ChatGPT, Claude, Gemini, India, AI Chat, Free AI, Multi-AI, Hindi AI, AI Utsav",
  image = "https://picsum.photos/seed/aiutsav/1200/630",
  url = "https://ai-utsav.com",
  type = "website"
}: SEOProps) {
  const siteTitle = title.includes("AI Utsav") ? title : `${title} | AI Utsav`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
