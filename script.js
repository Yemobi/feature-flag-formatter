// State management
const state = {
    flagType: 'sustainability',
    quoteStyle: 'double',
    delimiter: 'comma-space',
    caseConversion: 'none',
    removeDuplicates: true,
    sortAlphabetically: false,
    addTrailingComma: false,
    categorizedIds: {
        sustainability: [],
        viewability: [],
        both: [],
        'third-party': [],
        uncategorized: []
    },
    currentTab: 'all',
    outputMode: 'formatted' // 'formatted' or 'duplicates'
};

// DOM elements
const elements = {
    inputArea: document.getElementById('inputArea'),
    outputArea: document.getElementById('outputArea'),
    duplicatesArea: document.getElementById('duplicatesArea'),
    formatBtn: document.getElementById('formatBtn'),
    clearBtn: document.getElementById('clearBtn'),
    copyBtn: document.getElementById('copyBtn'),
    copyDuplicatesBtn: document.getElementById('copyDuplicatesBtn'),
    statsText: document.getElementById('statsText'),
    duplicatesStatsText: document.getElementById('duplicatesStatsText'),
    removeDuplicates: document.getElementById('removeDuplicates'),
    sortAlphabetically: document.getElementById('sortAlphabetically'),
    addTrailingComma: document.getElementById('addTrailingComma'),
    formattedView: document.getElementById('formattedView'),
    duplicatesView: document.getElementById('duplicatesView')
};

// Initialize event listeners
function init() {
    // Output mode tabs (Formatted vs Duplicates)
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveButton(btn, '.mode-tab-btn');
            state.outputMode = btn.dataset.mode;
            toggleOutputView();
        });
    });

    // Button groups
    document.querySelectorAll('.btn-flag').forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveButton(btn, '.btn-flag');
            state.flagType = btn.dataset.flag;
            formatAndDisplay();
        });
    });

    document.querySelectorAll('.btn-quote').forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveButton(btn, '.btn-quote');
            state.quoteStyle = btn.dataset.quote;
            formatAndDisplay();
        });
    });

    document.querySelectorAll('.btn-delim').forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveButton(btn, '.btn-delim');
            state.delimiter = btn.dataset.delim;
            formatAndDisplay();
        });
    });

    document.querySelectorAll('.btn-case').forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveButton(btn, '.btn-case');
            state.caseConversion = btn.dataset.case;
            formatAndDisplay();
        });
    });

    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveButton(btn, '.tab-btn');
            state.currentTab = btn.dataset.tab;
            formatAndDisplay();
        });
    });

    // Checkboxes
    elements.removeDuplicates.addEventListener('change', (e) => {
        state.removeDuplicates = e.target.checked;
        formatAndDisplay();
    });

    elements.sortAlphabetically.addEventListener('change', (e) => {
        state.sortAlphabetically = e.target.checked;
        formatAndDisplay();
    });

    elements.addTrailingComma.addEventListener('change', (e) => {
        state.addTrailingComma = e.target.checked;
        formatAndDisplay();
    });

    // Action buttons
    elements.formatBtn.addEventListener('click', formatAndDisplay);
    elements.clearBtn.addEventListener('click', clearAll);
    elements.copyBtn.addEventListener('click', copyToClipboard);
    elements.copyDuplicatesBtn.addEventListener('click', copyDuplicatesToClipboard);

    // Input area auto-format
    elements.inputArea.addEventListener('input', debounce(formatAndDisplay, 500));

    // Load examples
    document.querySelectorAll('.load-example').forEach(btn => {
        btn.addEventListener('click', () => loadExample(btn.dataset.example));
    });
}

// Helper function to set active button
function setActiveButton(activeBtn, selector) {
    document.querySelectorAll(selector).forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Parse input and categorize IDs
function parseInput(input) {
    const categorized = {
        sustainability: [],
        viewability: [],
        both: [],
        'third-party': [],
        uncategorized: []
    };

    // Split by newlines and commas, clean up whitespace
    const lines = input.split(/[\n,]+/).map(line => line.trim()).filter(line => line);

    lines.forEach(line => {
        // Check for category tags
        const sustainabilityMatch = line.match(/^(.+?)\s*-\s*(S|Sustainability)$/i);
        const viewabilityMatch = line.match(/^(.+?)\s*-\s*(V|Viewability)$/i);
        const bothMatch = line.match(/^(.+?)\s*-\s*(B|Both)$/i);
        const thirdPartyMatch = line.match(/^(.+?)\s*-\s*(TP|ThirdParty|Third-Party)$/i);

        if (sustainabilityMatch) {
            categorized.sustainability.push(sustainabilityMatch[1].trim());
        } else if (viewabilityMatch) {
            categorized.viewability.push(viewabilityMatch[1].trim());
        } else if (bothMatch) {
            categorized.both.push(bothMatch[1].trim());
            // If marked as "both", add to both sustainability and viewability
            categorized.sustainability.push(bothMatch[1].trim());
            categorized.viewability.push(bothMatch[1].trim());
        } else if (thirdPartyMatch) {
            categorized['third-party'].push(thirdPartyMatch[1].trim());
        } else {
            // No tag found, add to uncategorized
            categorized.uncategorized.push(line);
        }
    });

    return categorized;
}

// Format IDs based on current state
function formatIds(ids) {
    let formatted = [...ids];

    // Remove duplicates
    if (state.removeDuplicates) {
        formatted = [...new Set(formatted)];
    }

    // Sort alphabetically
    if (state.sortAlphabetically) {
        formatted.sort((a, b) => a.localeCompare(b));
    }

    // Apply case conversion
    formatted = formatted.map(id => {
        switch (state.caseConversion) {
            case 'upper':
                return id.toUpperCase();
            case 'lower':
                return id.toLowerCase();
            default:
                return id;
        }
    });

    // Apply quotes
    formatted = formatted.map(id => {
        switch (state.quoteStyle) {
            case 'double':
                return `"${id}"`;
            case 'single':
                return `'${id}'`;
            default:
                return id;
        }
    });

    // Apply delimiter
    let result;
    switch (state.delimiter) {
        case 'comma-space':
            result = formatted.join(', ');
            break;
        case 'comma':
            result = formatted.join(',');
            break;
        case 'newline':
            result = formatted.join(',\n');
            break;
        case 'space':
            result = formatted.join(' ');
            break;
        default:
            result = formatted.join(', ');
    }

    // Add trailing comma if requested
    if (state.addTrailingComma && formatted.length > 0) {
        result += ',';
    }

    return result;
}

// Format and display output
function formatAndDisplay() {
    const input = elements.inputArea.value.trim();
    
    if (!input) {
        elements.outputArea.value = '';
        elements.duplicatesArea.value = '';
        elements.statsText.textContent = '';
        elements.duplicatesStatsText.textContent = '';
        return;
    }

    // Parse and categorize
    state.categorizedIds = parseInput(input);

    // Update both views
    updateFormattedOutput();
    updateDuplicatesOutput();
}

// Toggle between formatted and duplicates view
function toggleOutputView() {
    if (state.outputMode === 'formatted') {
        elements.formattedView.style.display = 'block';
        elements.duplicatesView.style.display = 'none';
    } else {
        elements.formattedView.style.display = 'none';
        elements.duplicatesView.style.display = 'block';
    }
}

// Update formatted output
function updateFormattedOutput() {
    let outputText = '';
    let totalCount = 0;

    // Determine what to display based on current tab
    if (state.currentTab === 'all') {
        // Show all categories with headers
        const categories = [
            { key: 'sustainability', label: 'Sustainability' },
            { key: 'viewability', label: 'Viewability' },
            { key: 'third-party', label: 'Third Party' },
            { key: 'uncategorized', label: 'Uncategorized' }
        ];

        categories.forEach(({ key, label }) => {
            const ids = state.categorizedIds[key];
            if (ids.length > 0) {
                if (outputText) outputText += '\n\n';
                outputText += `// ${label}\n`;
                outputText += formatIds(ids);
                totalCount += ids.length;
            }
        });
    } else {
        // Show specific category
        const ids = state.categorizedIds[state.currentTab] || [];
        outputText = formatIds(ids);
        totalCount = ids.length;
    }

    elements.outputArea.value = outputText;
    
    // Update stats
    const stats = [];
    stats.push(`${totalCount} ID${totalCount !== 1 ? 's' : ''}`);
    if (state.categorizedIds.sustainability.length > 0) {
        stats.push(`${state.categorizedIds.sustainability.length} Sustainability`);
    }
    if (state.categorizedIds.viewability.length > 0) {
        stats.push(`${state.categorizedIds.viewability.length} Viewability`);
    }
    if (state.categorizedIds['third-party'].length > 0) {
        stats.push(`${state.categorizedIds['third-party'].length} Third Party`);
    }
    
    elements.statsText.textContent = stats.join(' • ');
}

// Update duplicates output
function updateDuplicatesOutput() {
    const input = elements.inputArea.value.trim();
    
    if (!input) {
        elements.duplicatesArea.value = '';
        elements.duplicatesStatsText.textContent = '';
        return;
    }

    // Get all IDs without categories
    const allIds = [];
    const lines = input.split(/[\n,]+/).map(line => line.trim()).filter(line => line);

    lines.forEach(line => {
        // Remove category tags to get clean ID
        const cleanId = line.replace(/\s*-\s*(S|V|B|TP|Sustainability|Viewability|Both|ThirdParty|Third-Party)$/i, '').trim();
        if (cleanId) {
            allIds.push(cleanId);
        }
    });

    // Find duplicates
    const idCount = {};
    const duplicates = {};

    allIds.forEach(id => {
        idCount[id] = (idCount[id] || 0) + 1;
    });

    Object.keys(idCount).forEach(id => {
        if (idCount[id] > 1) {
            duplicates[id] = idCount[id];
        }
    });

    // Format output
    const duplicateKeys = Object.keys(duplicates);
    
    if (duplicateKeys.length === 0) {
        elements.duplicatesArea.value = '✓ No duplicates found!\n\nAll IDs are unique.';
        elements.duplicatesStatsText.textContent = '0 duplicates';
        elements.duplicatesStatsText.style.color = 'var(--success-color)';
    } else {
        let duplicatesText = `Found ${duplicateKeys.length} duplicate ID${duplicateKeys.length !== 1 ? 's' : ''}:\n\n`;
        
        duplicateKeys.sort().forEach(id => {
            duplicatesText += `${id} (appears ${duplicates[id]} times)\n`;
        });

        elements.duplicatesArea.value = duplicatesText;
        elements.duplicatesStatsText.textContent = `${duplicateKeys.length} duplicate${duplicateKeys.length !== 1 ? 's' : ''} found`;
        elements.duplicatesStatsText.style.color = 'var(--danger-color)';
    }
}

// Copy to clipboard
async function copyToClipboard() {
    const text = elements.outputArea.value;
    
    if (!text) {
        showNotification('Nothing to copy!', 'warning');
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        showNotification('✓ Copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for older browsers
        elements.outputArea.select();
        document.execCommand('copy');
        showNotification('✓ Copied to clipboard!', 'success');
    }
}

// Copy duplicates to clipboard
async function copyDuplicatesToClipboard() {
    const text = elements.duplicatesArea.value;
    
    if (!text) {
        showNotification('Nothing to copy!', 'warning');
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        showNotification('✓ Duplicates copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for older browsers
        elements.duplicatesArea.select();
        document.execCommand('copy');
        showNotification('✓ Duplicates copied to clipboard!', 'success');
    }
}

// Clear all
function clearAll() {
    elements.inputArea.value = '';
    elements.outputArea.value = '';
    elements.duplicatesArea.value = '';
    elements.statsText.textContent = '';
    elements.duplicatesStatsText.textContent = '';
    state.categorizedIds = {
        sustainability: [],
        viewability: [],
        both: [],
        'third-party': [],
        uncategorized: []
    };
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Load example
function loadExample(exampleNum) {
    const examples = {
        '1': `xx_xxxxid1 -S
xx_xxxxid2 -V
xx_xxxxid3 -B
account_123 -S
account_456 -TP`,
        '2': `tp_XXX1
tp_XXX2
tp_XXX3
tp_XXX4`,
        '3': `account_001, account_002, account_003, account_004, account_005`
    };

    elements.inputArea.value = examples[exampleNum] || '';
    formatAndDisplay();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showNotification('Example loaded!', 'success');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);

