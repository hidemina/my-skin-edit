window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

gtag("js", new Date());
gtag("config", "G-6E0471XS37", { anonymize_ip: true });

document.addEventListener("click", (event) => {
  const experimentCta = event.target.closest("a[data-experiment-cta]");
  if (experimentCta) {
    gtag("event", "benefit_bridge_click", {
      experiment_variant: experimentCta.dataset.experimentCta,
      page_path: window.location.pathname
    });
  }

  const link = event.target.closest("a[data-offer][data-product]");
  if (!link) return;

  gtag("event", "affiliate_click", {
    affiliate_network: link.dataset.offer || "unknown",
    product_id: link.dataset.product || "unknown",
    link_url: link.href,
    page_path: window.location.pathname
  });
});
