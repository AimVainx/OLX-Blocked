function cleanOLXPage() {
  chrome.storage.sync.get({ showFeatured: true, showDelivery: false }, (settings) => {
    // Broadened selectors for OLX Pakistan listings
    const cards = document.querySelectorAll('li, div[data-aut-id*="item"], article, [class*="listing"]');

    cards.forEach(card => {
      const text = (card.innerText || "").toLowerCase();
      
      const isFeatured = text.includes('featured');
      const isDelivery = text.includes('delivery') || text.includes('olx delivery');

      let shouldHide = false;
      if (isFeatured && !settings.showFeatured) shouldHide = true;
      if (isDelivery && !settings.showDelivery) shouldHide = true;

      if (shouldHide) {
        card.style.display = 'none';
      } else {
        card.style.display = '';
      }
    });
  });
}

cleanOLXPage();

const observer = new MutationObserver(() => {
  cleanOLXPage();
});

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
}

chrome.storage.onChanged.addListener(() => {
  cleanOLXPage();
});
