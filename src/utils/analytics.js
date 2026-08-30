export function getUTM() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((k) => {
    if (params.get(k)) {
      utm[k] = params.get(k);
      try { sessionStorage.setItem(k, params.get(k)); } catch (_) {}
    } else {
      try { const v = sessionStorage.getItem(k); if (v) utm[k] = v; } catch (_) {}
    }
  });
  try {
    utm.referrer = document.referrer || sessionStorage.getItem('referrer') || '';
    if (document.referrer) sessionStorage.setItem('referrer', document.referrer);
    const path = window.location.pathname;
    if (path) utm.landing_page = path;
  } catch (_) {}
  return utm;
}

export function trackEvent(category, action, label = null, value = null) {
  const utm = getUTM();
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'customEvent',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: value,
      ...utm,
    });
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...utm,
    });
  }
  // Dedicated GA4 conversion events
  if (category === 'contact_form' && action === 'success' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', { method: 'contact_form', value: 1 });
  }
  if (category === 'pay' && action === 'success' && typeof window !== 'undefined' && window.gtag) {
    const numValue = typeof value === 'number' ? value : Number(String(label).replace(/[^0-9]/g, '')) || 0;
    window.gtag('event', 'purchase', { currency: 'INR', value: numValue, items: [{ item_name: 'Payment', quantity: 1 }] });
  }
}
