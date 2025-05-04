import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="neuzeit-grotesk"
      rel="preload"
      href="/fonts/neuzeit-grotesk-400.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="sofia-pro-regular"
      rel="preload"
      href="/fonts/sofia-pro-400.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="sofia-pro-bold"
      rel="preload"
      href="/fonts/sofia-pro-700.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="sofia-pro-condensed-regular"
      rel="preload"
      href="/fonts/sofia-pro-condensed-400.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="sofia-pro-condensed-bold"
      rel="preload"
      href="/fonts/sofia-pro-condensed-700.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />

  ]);
};