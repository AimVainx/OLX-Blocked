document.addEventListener('DOMContentLoaded', () => {
  const toggleFeatured = document.getElementById('toggleFeatured');
  const toggleDelivery = document.getElementById('toggleDelivery');

  // Load initial saved states
  chrome.storage.sync.get(['showFeatured', 'showDelivery'], (data) => {
    toggleFeatured.checked = data.showFeatured !== undefined ? data.showFeatured : true;
    toggleDelivery.checked = data.showDelivery !== undefined ? data.showDelivery : true;
  });

  // Save states independently without restrictions
  toggleFeatured.addEventListener('change', () => {
    chrome.storage.sync.set({ showFeatured: toggleFeatured.checked });
  });

  toggleDelivery.addEventListener('change', () => {
    chrome.storage.sync.set({ showDelivery: toggleDelivery.checked });
  });
});
