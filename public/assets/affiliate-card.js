document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("article").forEach((card) => {
    const affiliateLink = card.querySelector("a[data-offer][href]");
    if (!affiliateLink) return;

    card.classList.add("affiliate-click-card");
    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button, input, select, textarea, label")) return;
      if (window.getSelection()?.toString()) return;
      affiliateLink.dispatchEvent(new Event("click"));
      window.location.assign(affiliateLink.href);
    });
  });
});
