let isAutoRefreshing = false;
let intervalId = null;

// Toggle auto-refresh on button click
document.getElementById('toggleButton').addEventListener('click', function() {
  if (isAutoRefreshing) {
    // Turn off auto-refresh
    clearInterval(intervalId);
    isAutoRefreshing = false;
    document.getElementById('toggleButton').textContent = 'Turn On Auto Refresh';
  } else {
    // Turn on auto-refresh (every 5 seconds)
    intervalId = setInterval(function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, { code: 'location.reload();' });
      });
    }, 5000);
    isAutoRefreshing = true;
    document.getElementById('toggleButton').textContent = 'Turn Off Auto Refresh';
  }
});

// Optional: Initialize the button text based on current state (if needed)
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.executeScript(tabs[0].id, { code: 'clearInterval(' + intervalId + ');' });
});
