// src/utils/trackEvent.js
/* global fbq gtag */
export const trackEvent = ({ metaEventName, ga4EventName, payload = {} }) => {
    // Track with Meta Pixel (fbq)
    if (typeof fbq !== "undefined" && metaEventName) {
      fbq('trackCustom', metaEventName, payload);
    }
  
    // Track with GA4 (gtag)
    if (typeof gtag !== "undefined" && ga4EventName) {
      gtag('event', ga4EventName, {
        ...payload,
      });
    }
  };
  