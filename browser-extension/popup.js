// Popup script for Network Request Monitor
let allRequests = [];
let autoRefresh = true;
let refreshInterval;

document.addEventListener('DOMContentLoaded', function() {
  loadRequests();
  setupEventListeners();
  
  // Auto-refresh every 2 seconds if enabled
  refreshInterval = setInterval(() => {
    if (autoRefresh) {
      loadRequests(true);
    }
  }, 2000);
});

function setupEventListeners() {
  // Clear button
  document.getElementById('clearBtn').addEventListener('click', clearRequests);
  
  // Export button
  document.getElementById('exportBtn').addEventListener('click', exportRequests);
  
  // Filters
  document.getElementById('urlFilter').addEventListener('input', applyFilters);
  document.getElementById('methodFilter').addEventListener('change', applyFilters);
  document.getElementById('typeFilter').addEventListener('change', applyFilters);
  document.getElementById('statusFilter').addEventListener('input', applyFilters);
  
  // Auto-refresh toggle
  document.getElementById('autoRefreshCheck').addEventListener('change', function(e) {
    autoRefresh = e.target.checked;
  });
  
  // Modal close
  document.querySelector('.close').addEventListener('click', closeModal);
  window.addEventListener('click', function(e) {
    const modal = document.getElementById('detailsModal');
    if (e.target === modal) {
      closeModal();
    }
  });
}

function loadRequests(silent = false) {
  chrome.runtime.sendMessage({ action: 'getRequests' }, function(response) {
    if (response && response.requests) {
      allRequests = response.requests;
      applyFilters();
    }
  });
}

function applyFilters() {
  const urlFilter = document.getElementById('urlFilter').value;
  const methodFilter = document.getElementById('methodFilter').value;
  const typeFilter = document.getElementById('typeFilter').value;
  const statusFilter = document.getElementById('statusFilter').value;
  
  const filters = {
    url: urlFilter,
    method: methodFilter,
    type: typeFilter,
    statusCode: statusFilter
  };
  
  chrome.runtime.sendMessage(
    { action: 'filterRequests', filters: filters },
    function(response) {
      if (response && response.requests) {
        displayRequests(response.requests);
      }
    }
  );
}

function displayRequests(requests) {
  const requestList = document.getElementById('requestList');
  const requestCount = document.getElementById('requestCount');
  
  requestCount.textContent = `${requests.length} request${requests.length !== 1 ? 's' : ''}`;
  
  if (requests.length === 0) {
    requestList.innerHTML = '<div class="empty-state">No network requests captured yet.</div>';
    return;
  }
  
  requestList.innerHTML = requests.map((req, index) => `
    <div class="request-item" data-index="${index}" onclick="showDetails(${index})">
      <div class="request-header">
        <span class="method method-${req.method}">${req.method}</span>
        <span class="status status-${getStatusClass(req.statusCode)}">${req.statusCode || 'Pending'}</span>
        <span class="type">${req.type}</span>
      </div>
      <div class="request-url" title="${escapeHtml(req.url)}">${truncateUrl(req.url)}</div>
      <div class="request-time">${formatTime(req.timestamp)}</div>
    </div>
  `).join('');
}

function showDetails(index) {
  const request = allRequests[index];
  if (!request) return;
  
  const detailsContent = document.getElementById('detailsContent');
  const modal = document.getElementById('detailsModal');
  
  let headersHtml = '';
  if (request.responseHeaders) {
    headersHtml = request.responseHeaders.map(h => 
      `<div class="detail-row"><strong>${escapeHtml(h.name)}:</strong> ${escapeHtml(h.value)}</div>`
    ).join('');
  }
  
  let requestBodyHtml = '';
  if (request.requestBody) {
    try {
      requestBodyHtml = `<pre>${JSON.stringify(request.requestBody, null, 2)}</pre>`;
    } catch (e) {
      requestBodyHtml = '<pre>Unable to parse request body</pre>';
    }
  }
  
  detailsContent.innerHTML = `
    <div class="detail-section">
      <h3>General</h3>
      <div class="detail-row"><strong>URL:</strong> ${escapeHtml(request.url)}</div>
      <div class="detail-row"><strong>Method:</strong> ${request.method}</div>
      <div class="detail-row"><strong>Status:</strong> ${request.statusCode || 'Pending'}</div>
      <div class="detail-row"><strong>Type:</strong> ${request.type}</div>
      <div class="detail-row"><strong>Time:</strong> ${request.timestamp}</div>
      ${request.ip ? `<div class="detail-row"><strong>IP:</strong> ${request.ip}</div>` : ''}
      ${request.error ? `<div class="detail-row error"><strong>Error:</strong> ${request.error}</div>` : ''}
    </div>
    
    ${headersHtml ? `
      <div class="detail-section">
        <h3>Response Headers</h3>
        ${headersHtml}
      </div>
    ` : ''}
    
    ${requestBodyHtml ? `
      <div class="detail-section">
        <h3>Request Body</h3>
        ${requestBodyHtml}
      </div>
    ` : ''}
    
    <div class="detail-actions">
      <button class="btn" onclick="copyToClipboard('${escapeHtml(request.url)}')">Copy URL</button>
      <button class="btn" onclick="copyRequestAsJson(${index})">Copy as JSON</button>
    </div>
  `;
  
  modal.style.display = 'block';
}

function closeModal() {
  document.getElementById('detailsModal').style.display = 'none';
}

function clearRequests() {
  if (confirm('Clear all captured requests?')) {
    chrome.runtime.sendMessage({ action: 'clearRequests' }, function(response) {
      loadRequests();
    });
  }
}

function exportRequests() {
  const dataStr = JSON.stringify(allRequests, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `network-requests-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!');
  });
}

function copyRequestAsJson(index) {
  const request = allRequests[index];
  const json = JSON.stringify(request, null, 2);
  navigator.clipboard.writeText(json).then(() => {
    showToast('Request copied as JSON!');
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Helper functions
function getStatusClass(status) {
  if (!status) return 'pending';
  if (status === 'ERROR') return 'error';
  const code = parseInt(status);
  if (code >= 200 && code < 300) return 'success';
  if (code >= 300 && code < 400) return 'redirect';
  if (code >= 400 && code < 500) return 'client-error';
  if (code >= 500) return 'server-error';
  return 'unknown';
}

function truncateUrl(url, maxLength = 80) {
  if (url.length <= maxLength) return escapeHtml(url);
  return escapeHtml(url.substring(0, maxLength - 3) + '...');
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}


