// Background service worker to capture network requests
let capturedRequests = [];
const MAX_REQUESTS = 500; // Limit stored requests to prevent memory issues

// Listen for network requests
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const request = {
      id: details.requestId,
      url: details.url,
      method: details.method,
      type: details.type,
      timestamp: new Date(details.timeStamp).toISOString(),
      tabId: details.tabId,
      requestBody: details.requestBody
    };
    
    capturedRequests.unshift(request);
    
    // Keep only the most recent requests
    if (capturedRequests.length > MAX_REQUESTS) {
      capturedRequests = capturedRequests.slice(0, MAX_REQUESTS);
    }
    
    // Update badge to show request count
    updateBadge();
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);

// Listen for response headers
chrome.webRequest.onCompleted.addListener(
  function(details) {
    const request = capturedRequests.find(r => r.id === details.requestId);
    if (request) {
      request.statusCode = details.statusCode;
      request.responseHeaders = details.responseHeaders;
      request.ip = details.ip;
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

// Listen for errors
chrome.webRequest.onErrorOccurred.addListener(
  function(details) {
    const request = capturedRequests.find(r => r.id === details.requestId);
    if (request) {
      request.error = details.error;
      request.statusCode = 'ERROR';
    }
  },
  { urls: ["<all_urls>"] }
);

function updateBadge() {
  chrome.action.setBadgeText({ text: capturedRequests.length.toString() });
  chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
}

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getRequests') {
    sendResponse({ requests: capturedRequests });
  } else if (request.action === 'clearRequests') {
    capturedRequests = [];
    updateBadge();
    sendResponse({ success: true });
  } else if (request.action === 'filterRequests') {
    const filtered = filterRequests(request.filters);
    sendResponse({ requests: filtered });
  }
  return true;
});

function filterRequests(filters) {
  let filtered = [...capturedRequests];
  
  if (filters.url) {
    filtered = filtered.filter(req => 
      req.url.toLowerCase().includes(filters.url.toLowerCase())
    );
  }
  
  if (filters.method && filters.method !== 'ALL') {
    filtered = filtered.filter(req => req.method === filters.method);
  }
  
  if (filters.type && filters.type !== 'ALL') {
    filtered = filtered.filter(req => req.type === filters.type);
  }
  
  if (filters.statusCode) {
    filtered = filtered.filter(req => 
      req.statusCode && req.statusCode.toString().includes(filters.statusCode)
    );
  }
  
  return filtered;
}

// Initialize badge
updateBadge();


