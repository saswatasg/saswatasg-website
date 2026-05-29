export function trackEvent(category, action, label = null, value = null) {
  if (typeof window === 'undefined' || !window.dataLayer) return;
  window.dataLayer.push({
    event: 'customEvent',
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    eventValue: value,
  });
}
