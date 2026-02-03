// Initialize on page load
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => switchSection(tab.dataset.type));
    });

    // Layout selector buttons
    document.querySelectorAll('.layout-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const layout = btn.dataset.layout;
            changeLayout(layout);
            // Update active state
            document.querySelectorAll('.layout-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Load saved layout preference
    const savedLayout = localStorage.getItem('preferredLayout') || 'top';
    changeLayout(savedLayout);
    // Set active button
    const activeBtn = document.querySelector(`.layout-btn[data-layout="${savedLayout}"]`);
    if (activeBtn) {
        document.querySelectorAll('.layout-btn').forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    // Input mode toggles
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => toggleInputMode(btn));
    });

    // Delete row buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-row')) {
            e.target.closest('tr').remove();
        }
    });

    // Auto-check duplicates on input
    const duplicatesNewIds = document.getElementById('duplicates-new-ids');
    const duplicatesExistingIds = document.getElementById('duplicates-existing-ids');
    
    if (duplicatesNewIds && duplicatesExistingIds) {
        duplicatesNewIds.addEventListener('input', () => checkDuplicates());
        duplicatesExistingIds.addEventListener('input', () => checkDuplicates());
    }

    // Add event listeners for format option changes to update placeholders dynamically
    const sections = ['doubleverify', 'third-party', 'ias', 'rmax', 'cardview', 'disclaimer'];
    sections.forEach(section => {
        const quoteSelect = document.getElementById(`${section}-quote`);
        const delimiterSelect = document.getElementById(`${section}-delimiter`);
        const caseSelect = document.getElementById(`${section}-case`);
        const trailingCommaCheckbox = document.getElementById(`${section}-trailing-comma`);
        const includeCommentsCheckbox = document.getElementById(`${section}-include-comments`);
        
        if (quoteSelect) quoteSelect.addEventListener('change', () => updatePlaceholderExample(section));
        if (delimiterSelect) delimiterSelect.addEventListener('change', () => updatePlaceholderExample(section));
        if (caseSelect) caseSelect.addEventListener('change', () => updatePlaceholderExample(section));
        if (trailingCommaCheckbox) trailingCommaCheckbox.addEventListener('change', () => updatePlaceholderExample(section));
        if (includeCommentsCheckbox) includeCommentsCheckbox.addEventListener('change', () => updatePlaceholderExample(section));
    });
    
    // Initialize placeholder examples on load
    sections.forEach(section => updatePlaceholderExample(section));
}

// Change layout mode
function changeLayout(layout) {
    // Save preference
    localStorage.setItem('preferredLayout', layout);
    
    // Update all workflow grids (top, middle, or bottom)
    document.querySelectorAll('.workflow-grid').forEach(grid => {
        grid.classList.remove('layout-top', 'layout-middle', 'layout-bottom');
        grid.classList.add(`layout-${layout}`);
    });
}

// Switch between feature flag sections
function switchSection(type) {
    // Update active tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.type === type) {
            tab.classList.add('active');
        }
    });

    // Update active section
    document.querySelectorAll('.ff-section').forEach(section => {
        section.classList.remove('active');
        if (section.id === `${type}-section`) {
            section.classList.add('active');
        }
    });
}

// Toggle between table and text input modes
function toggleInputMode(btn) {
    const section = btn.dataset.section;
    const mode = btn.dataset.mode;
    
    // Update active button
    btn.parentElement.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Toggle visibility
    const tableInput = document.getElementById(`${section}-table-input`);
    const textInput = document.getElementById(`${section}-text-input`);
    
    if (mode === 'table') {
        tableInput?.classList.remove('hidden');
        textInput?.classList.add('hidden');
    } else {
        tableInput?.classList.add('hidden');
        textInput?.classList.remove('hidden');
    }
}

// Add a new row to table
function addTableRow(section) {
    const tbody = document.getElementById(`${section}-table-body`);
    const firstRow = tbody.querySelector('tr');
    const cellCount = firstRow.querySelectorAll('td').length;
    
    const newRow = document.createElement('tr');
    
    // Create cells based on section type
    const columns = getColumnsForSection(section);
    columns.forEach(col => {
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = col.placeholder;
        input.className = 'table-input';
        td.appendChild(input);
        newRow.appendChild(td);
    });
    
    // Add delete button
    const actionTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon delete-row';
    deleteBtn.title = 'Delete row';
    deleteBtn.textContent = '🗑️';
    actionTd.appendChild(deleteBtn);
    newRow.appendChild(actionTd);
    
    tbody.appendChild(newRow);
}

// Get column configuration for each section
function getColumnsForSection(section) {
    const configs = {
        'doubleverify': [
            { placeholder: 't2_xxxxx' },
            { placeholder: 'Company Name' },
            { placeholder: 'AH-12345' }
        ],
        'third-party': [
            { placeholder: 't2_xxxxx' },
            { placeholder: 'Company Name' },
            { placeholder: 'AH-12345' }
        ],
        'ias': [
            { placeholder: 't2_xxxxx' },
            { placeholder: 'Company Name' },
            { placeholder: 'IAS_KEY_abc123' },
            { placeholder: 'AH-12345' }
        ],
        'rmax': [
            { placeholder: 't2_xxxxx' },
            { placeholder: 'AH-12345' }
        ],
        'cardview': [
            { placeholder: 't2_xxxxx' },
            { placeholder: 'Company Name' },
            { placeholder: 'AH-12345' }
        ],
        'disclaimer': [
            { placeholder: 't2_xxxxx' },
            { placeholder: 'Novo Nordisk - Ozempic' },
            { placeholder: 'AH-12345' }
        ]
    };
    
    return configs[section] || [];
}

// Paste from Excel/Sheets
function pasteFromExcel(section) {
    navigator.clipboard.readText().then(text => {
        const tbody = document.getElementById(`${section}-table-body`);
        tbody.innerHTML = ''; // Clear existing rows
        
        const lines = text.trim().split('\n');
        lines.forEach(line => {
            const cells = line.split('\t'); // Tab-separated from Excel
            
            const row = document.createElement('tr');
            const columns = getColumnsForSection(section);
            
            columns.forEach((col, index) => {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';
                input.value = cells[index] || '';
                input.placeholder = col.placeholder;
                input.className = 'table-input';
                td.appendChild(input);
                row.appendChild(td);
            });
            
            // Add delete button
            const actionTd = document.createElement('td');
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-icon delete-row';
            deleteBtn.title = 'Delete row';
            deleteBtn.textContent = '🗑️';
            actionTd.appendChild(deleteBtn);
            row.appendChild(actionTd);
            
            tbody.appendChild(row);
        });
        
        showNotification('✓ Pasted from clipboard!');
    }).catch(err => {
        showNotification('⚠️ Please allow clipboard access', 'warning');
    });
}

// Format output for a specific section
function formatOutput(section) {
    if (section === 'duplicates') {
        checkDuplicates();
        return;
    }
    
    const data = getInputData(section);
    const options = getFormatOptions(section);
    
    if (data.length === 0) {
        showNotification('⚠️ Please add some IDs first', 'warning');
        return;
    }
    
    const formatted = formatData(data, options, section);
    
    // Update IDs output
    const outputArea = document.getElementById(`${section}-output`);
    outputArea.value = formatted;
    
    // Update stats
    const statsEl = document.getElementById(`${section}-stats`);
    statsEl.textContent = `${data.length} ID${data.length !== 1 ? 's' : ''} formatted`;
    
    // Generate IAS-specific ID:APIKey output
    if (section === 'ias') {
        generateIASApiKeyOutput(data, options);
    }
    
    // Generate Jira tickets output
    generateJiraOutput(section, data);
    
    showNotification('✓ Formatted successfully!');
}

// Parse a text line into structured data
function parseTextLine(line, section) {
    // Check if line contains pipe separator
    if (line.includes('|')) {
        const parts = line.split('|').map(p => p.trim());
        
        // Different parsing based on section column structure
        if (section === 'doubleverify' || section === 'third-party' || section === 'cardview' || section === 'disclaimer') {
            // 3 columns: ID | Account Name | Jira Ticket
            return {
                id: parts[0] || '',
                name: parts[1] || '',
                apiKey: '',
                notes: parts[2] || ''
            };
        } else if (section === 'rmax') {
            // 2 columns: ID | Jira Ticket
            return {
                id: parts[0] || '',
                name: '',
                apiKey: '',
                notes: parts[1] || ''
            };
        } else {
            // 4 columns (IAS or default): ID | Account Name | API Key | Jira Ticket
            return {
                id: parts[0] || '',
                name: parts[1] || '',
                apiKey: parts[2] || '',
                notes: parts[3] || ''
            };
        }
    }
    
    // Check if line contains tab separator (from Excel)
    if (line.includes('\t')) {
        const parts = line.split('\t').map(p => p.trim());
        
        // Same column logic for tabs
        if (section === 'doubleverify' || section === 'third-party' || section === 'cardview' || section === 'disclaimer') {
            return {
                id: parts[0] || '',
                name: parts[1] || '',
                apiKey: '',
                notes: parts[2] || ''
            };
        } else if (section === 'rmax') {
            return {
                id: parts[0] || '',
                name: '',
                apiKey: '',
                notes: parts[1] || ''
            };
        } else {
            return {
                id: parts[0] || '',
                name: parts[1] || '',
                apiKey: parts[2] || '',
                notes: parts[3] || ''
            };
        }
    }
    
    // Simple format - just ID
    return {
        id: line,
        name: '',
        apiKey: '',
        notes: ''
    };
}

// Get input data from table or text
function getInputData(section) {
    const data = [];
    
    // Check if table mode is active
    const tableInput = document.getElementById(`${section}-table-input`);
    const textInput = document.getElementById(`${section}-text-input`);
    
    if (tableInput && !tableInput.classList.contains('hidden')) {
        // Get data from table
        const tbody = document.getElementById(`${section}-table-body`);
        const rows = tbody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const inputs = row.querySelectorAll('.table-input');
            let rowData;
            
            // Different column mappings per section
            if (section === 'doubleverify' || section === 'third-party' || section === 'cardview' || section === 'disclaimer') {
                rowData = {
                    id: inputs[0]?.value.trim() || '',
                    name: inputs[1]?.value.trim() || '',
                    apiKey: '',
                    notes: inputs[2]?.value.trim() || '' // Jira Ticket ID
                };
            } else if (section === 'rmax') {
                rowData = {
                    id: inputs[0]?.value.trim() || '',
                    name: '',
                    apiKey: '',
                    notes: inputs[1]?.value.trim() || '' // Jira Ticket ID
                };
            } else if (section === 'ias') {
                rowData = {
                    id: inputs[0]?.value.trim() || '',
                    name: inputs[1]?.value.trim() || '',
                    apiKey: inputs[2]?.value.trim() || '',
                    notes: inputs[3]?.value.trim() || '' // Jira Ticket ID
                };
            } else {
                // Default mapping
                rowData = {
                    id: inputs[0]?.value.trim() || '',
                    name: inputs[1]?.value.trim() || '',
                    apiKey: inputs[2]?.value.trim() || '',
                    notes: inputs[3]?.value.trim() || ''
                };
            }
            
            if (rowData.id) {
                data.push(rowData);
            }
        });
    } else if (textInput && !textInput.classList.contains('hidden')) {
        // Get data from text area - supports multiple formats
        const textarea = textInput.querySelector('.text-input');
        const lines = textarea.value.split('\n').filter(line => line.trim());
        
        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed) {
                data.push(parseTextLine(trimmed, section));
            }
        });
    } else {
        // For custom section (always text)
        const textarea = document.getElementById(`${section}-text-input`);
        if (textarea) {
            const lines = textarea.value.split('\n').filter(line => line.trim());
            lines.forEach(line => {
                const trimmed = line.trim();
                if (trimmed) {
                    data.push(parseTextLine(trimmed, section));
                }
            });
        }
    }
    
    return data;
}

// Get format options for a section
function getFormatOptions(section) {
    return {
        quote: document.getElementById(`${section}-quote`)?.value || 'double',
        delimiter: document.getElementById(`${section}-delimiter`)?.value || 'comma-space',
        case: document.getElementById(`${section}-case`)?.value || 'none',
        trailingComma: document.getElementById(`${section}-trailing-comma`)?.checked || false,
        includeComments: document.getElementById(`${section}-include-comments`)?.checked || false,
        commentChar: document.getElementById(`${section}-comment-char`)?.value || '#',
        sort: false, // Sorting removed - always false
        removeDuplicates: document.getElementById(`${section}-remove-duplicates`)?.checked || false
    };
}

// Format data according to options
function formatData(data, options, section = '') {
    let items = [...data];
    
    // Remove duplicates
    if (options.removeDuplicates) {
        const seen = new Set();
        items = items.filter(item => {
            const id = item.id.toLowerCase();
            if (seen.has(id)) return false;
            seen.add(id);
            return true;
        });
    }
    
    // Sort
    if (options.sort) {
        items.sort((a, b) => a.id.localeCompare(b.id));
    }
    
    // Apply case conversion to IDs only
    items = items.map(item => ({
        ...item,
        id: applyCaseConversion(item.id, options.case)
    }));
    
    // Determine if delimiter contains comma
    const delimiterHasComma = options.delimiter.includes('comma');
    
    // Check if this is the disclaimer section (needs YAML prefix)
    const needsYAMLPrefix = section === 'disclaimer';
    
    // Format each item
    const formattedItems = items.map((item, index) => {
        let formattedId = item.id;
        
        // Apply quotes
        if (options.quote === 'double') {
            formattedId = `"${formattedId}"`;
        } else if (options.quote === 'single') {
            formattedId = `'${formattedId}'`;
        }
        
        // If delimiter has comma, add comma NOW (before comment)
        // BUT only if not the last item, or if trailing comma is enabled
        const isLastItem = index === items.length - 1;
        if (delimiterHasComma && (!isLastItem || options.trailingComma)) {
            formattedId += ',';
        }
        
        // Add account name as comment AFTER comma
        if (options.includeComments && item.name && item.name.trim()) {
            const commentChar = (options.commentChar || '#').trim();
            formattedId += `   ${commentChar} ${item.name}`;
        }
        
        // Add YAML prefix if needed (for disclaimer section)
        if (needsYAMLPrefix) {
            formattedId = `  - ${formattedId}`;
        }
        
        return formattedId;
    });
    
    // Join with delimiter (but strip comma from delimiter since we already added it)
    let result;
    switch (options.delimiter) {
        case 'comma-space':
            // Comma already added, just join with space
            result = delimiterHasComma ? formattedItems.join(' ') : formattedItems.join(', ');
            break;
        case 'comma-newline':
            // Comma already added, just join with newline
            result = delimiterHasComma ? formattedItems.join('\n') : formattedItems.join(',\n');
            break;
        case 'comma':
            // Comma already added, just concatenate
            result = delimiterHasComma ? formattedItems.join('') : formattedItems.join(',');
            break;
        case 'newline':
            result = formattedItems.join('\n');
            break;
        case 'space':
            result = formattedItems.join(' ');
            break;
        default:
            result = formattedItems.join(', ');
    }
    
    // Add trailing comma (only if delimiter doesn't have comma - since we already handled it above)
    if (options.trailingComma && formattedItems.length > 0 && !delimiterHasComma) {
        result += ',';
    }
    
    return result;
}

// Generate IAS-specific ID:APIKey output
function generateIASApiKeyOutput(data, options) {
    const apikeyOutputArea = document.getElementById('ias-apikey-output');
    const apikeyStatsEl = document.getElementById('ias-apikey-stats');
    
    if (!apikeyOutputArea) return;
    
    // Filter items that have API keys
    const itemsWithKeys = data.filter(item => item.apiKey && item.apiKey.trim());
    
    if (itemsWithKeys.length === 0) {
        apikeyOutputArea.value = 'No API keys found. Add API keys to generate ID:APIKey pairs.';
        apikeyStatsEl.textContent = '';
        return;
    }
    
    // Format as ID:APIKey pairs (no spaces)
    const pairs = itemsWithKeys.map(item => {
        let id = applyCaseConversion(item.id, options.case);
        let apiKey = item.apiKey; // API key keeps original case
        
        // Apply quotes if specified
        if (options.quote === 'double') {
            id = `"${id}"`;
        } else if (options.quote === 'single') {
            id = `'${id}'`;
        }
        
        return `${id}:${apiKey}`;
    });
    
    // Join with delimiter (matching the same options as main output)
    let result;
    const delimiterHasComma = options.delimiter.includes('comma');
    
    // Add comma to each item if delimiter contains comma (but not to last item unless trailing comma enabled)
    const formattedPairs = pairs.map((pair, index) => {
        const isLastItem = index === pairs.length - 1;
        if (delimiterHasComma && (!isLastItem || options.trailingComma)) {
            return pair + ',';
        }
        return pair;
    });
    
    switch (options.delimiter) {
        case 'comma-space':
            result = delimiterHasComma ? formattedPairs.join(' ') : pairs.join(', ');
            break;
        case 'comma-newline':
            result = delimiterHasComma ? formattedPairs.join('\n') : pairs.join(',\n');
            break;
        case 'comma':
            result = delimiterHasComma ? formattedPairs.join('') : pairs.join(',');
            break;
        case 'newline':
            result = pairs.join('\n');
            break;
        case 'space':
            result = pairs.join(' ');
            break;
        default:
            result = pairs.join(', ');
    }
    
    // Add trailing comma if specified (and delimiter doesn't have comma - already handled above)
    if (options.trailingComma && !delimiterHasComma) {
        result += ',';
    }
    
    apikeyOutputArea.value = result;
    apikeyStatsEl.textContent = `${itemsWithKeys.length} pair${itemsWithKeys.length !== 1 ? 's' : ''}`;
}

// Generate Jira tickets output
function generateJiraOutput(section, data) {
    const jiraOutputArea = document.getElementById(`${section}-jira-output`);
    const jiraStatsEl = document.getElementById(`${section}-jira-stats`);
    
    if (!jiraOutputArea) return; // Skip if this section doesn't have Jira output
    
    // Extract unique Jira tickets
    const jiraTickets = new Set();
    data.forEach(item => {
        // Jira ticket is in the 'notes' field
        const ticket = item.notes?.trim();
        if (ticket) {
            // Extract Jira ticket pattern (e.g., AH-12345) - more lenient matching
            const match = ticket.match(/[A-Z]+-\d+/);
            if (match) {
                jiraTickets.add(match[0]);
            }
        }
    });
    
    if (jiraTickets.size === 0) {
        jiraOutputArea.value = 'No Jira tickets found. Add ticket IDs in format: AH-12345';
        jiraStatsEl.textContent = '';
        return;
    }
    
    // Format as markdown links
    const ticketLinks = Array.from(jiraTickets).sort().map(ticket => {
        return `#[${ticket}](https://reddit.atlassian.net/browse/${ticket})`;
    });
    
    jiraOutputArea.value = ticketLinks.join('\n');
    jiraStatsEl.textContent = `${jiraTickets.size} ticket${jiraTickets.size !== 1 ? 's' : ''}`;
}

// Copy Jira output
async function copyJiraOutput(section) {
    const jiraOutputArea = document.getElementById(`${section}-jira-output`);
    const text = jiraOutputArea.value;
    
    if (!text || text.includes('No Jira tickets')) {
        showNotification('⚠️ No Jira tickets to copy', 'warning');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        showNotification('✓ Jira links copied to clipboard!');
    } catch (err) {
        jiraOutputArea.select();
        document.execCommand('copy');
        showNotification('✓ Jira links copied to clipboard!');
    }
}

// Apply case conversion
function applyCaseConversion(text, caseType) {
    switch (caseType) {
        case 'upper':
            return text.toUpperCase();
        case 'lower':
            return text.toLowerCase();
        default:
            return text;
    }
}

// Check for duplicates
function checkDuplicates() {
    const newIdsTextarea = document.getElementById('duplicates-new-ids');
    const existingIdsTextarea = document.getElementById('duplicates-existing-ids');
    const outputArea = document.getElementById('duplicates-output');
    const statsEl = document.getElementById('duplicates-stats');
    
    const newIdsText = newIdsTextarea.value.trim();
    const existingIdsText = existingIdsTextarea.value.trim();
    
    if (!newIdsText) {
        outputArea.value = 'Enter new IDs in the "New IDs (To Add)" field.';
        statsEl.textContent = '';
        return;
    }
    
    if (!existingIdsText) {
        outputArea.value = 'Paste existing repository IDs in the "Existing IDs (From Repo)" field.';
        statsEl.textContent = '';
        return;
    }
    
    // Parse IDs
    const newIds = parseIds(newIdsText);
    const existingIds = new Set(parseIds(existingIdsText).map(id => id.toLowerCase()));
    
    // Check for matches
    const duplicates = [];
    const unique = [];
    
    newIds.forEach(id => {
        if (existingIds.has(id.toLowerCase())) {
            duplicates.push(id);
        } else {
            unique.push(id);
        }
    });
    
    // Format output
    let result = '';
    
    if (duplicates.length > 0) {
        result += '⚠️ ALREADY IN REPOSITORY (DO NOT ADD):\n';
        result += '━'.repeat(50) + '\n\n';
        duplicates.forEach(id => {
            result += `❌ ${id}\n`;
        });
        result += '\n\n';
    }
    
    if (unique.length > 0) {
        result += '✓ NEW IDs (SAFE TO ADD):\n';
        result += '━'.repeat(50) + '\n\n';
        unique.forEach(id => {
            result += `✓ ${id}\n`;
        });
    }
    
    outputArea.value = result;
    
    // Update stats
    if (duplicates.length > 0) {
        statsEl.textContent = `⚠️ ${duplicates.length} duplicate${duplicates.length !== 1 ? 's' : ''} | ${unique.length} new`;
        statsEl.style.color = 'var(--danger-color)';
    } else {
        statsEl.textContent = `✓ All ${unique.length} ID${unique.length !== 1 ? 's are' : ' is'} new`;
        statsEl.style.color = 'var(--success-color)';
    }
}

// Parse IDs from text (handles various formats)
function parseIds(text) {
    const ids = [];
    const lines = text.split(/[\n,]+/);
    
    lines.forEach(line => {
        const trimmed = line.trim().replace(/^["']|["']$/g, ''); // Remove quotes
        if (trimmed) {
            ids.push(trimmed);
        }
    });
    
    return ids;
}

// Copy output to clipboard
async function copyOutput(section, outputType = 'main') {
    let outputArea;
    
    if (outputType === 'apikey') {
        outputArea = document.getElementById(`${section}-apikey-output`);
    } else {
        outputArea = document.getElementById(`${section}-output`);
    }
    
    const text = outputArea.value;
    
    if (!text || text.includes('No API keys found') || text.includes('will appear here')) {
        showNotification('⚠️ Nothing to copy', 'warning');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        showNotification('✓ Copied to clipboard!');
    } catch (err) {
        // Fallback
        outputArea.select();
        document.execCommand('copy');
        showNotification('✓ Copied to clipboard!');
    }
}

// Send output to duplicate checker
function sendToDuplicateChecker(section) {
    const outputArea = document.getElementById(`${section}-output`);
    const text = outputArea.value;
    
    if (!text) {
        showNotification('⚠️ No IDs to check', 'warning');
        return;
    }
    
    // Switch to duplicates tab
    switchSection('duplicates');
    
    // Paste into "New IDs" field
    const duplicatesNewIds = document.getElementById('duplicates-new-ids');
    if (duplicatesNewIds) {
        duplicatesNewIds.value = text;
        // Trigger check
        checkDuplicates();
        showNotification('✓ IDs sent to duplicate checker!');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Update placeholder example based on format options
function updatePlaceholderExample(section) {
    const outputArea = document.getElementById(`${section}-output`);
    if (!outputArea) return;
    
    // Get format options
    const quoteStyle = document.getElementById(`${section}-quote`)?.value || 'none';
    const delimiter = document.getElementById(`${section}-delimiter`)?.value || 'comma';
    const caseStyle = document.getElementById(`${section}-case`)?.value || 'none';
    const trailingComma = document.getElementById(`${section}-trailing-comma`)?.checked || false;
    const includeComments = document.getElementById(`${section}-include-comments`)?.checked || false;
    
    // Sample IDs for examples
    let sampleIds = ['t2_abc123', 't2_def456', 't2_ghi789'];
    const sampleNames = ['Company A', 'Company B', 'Company C'];
    
    // Apply case conversion
    if (caseStyle === 'upper') {
        sampleIds = sampleIds.map(id => id.toUpperCase());
    } else if (caseStyle === 'lower') {
        sampleIds = sampleIds.map(id => id.toLowerCase());
    }
    
    // Apply quotes
    let formattedIds = sampleIds.map((id, index) => {
        let formattedId = id;
        
        // Apply quotes
        if (quoteStyle === 'double') {
            formattedId = `"${formattedId}"`;
        } else if (quoteStyle === 'single') {
            formattedId = `'${formattedId}'`;
        }
        
        // Add comma BEFORE comment (if delimiter has comma)
        const isLastItem = index === sampleIds.length - 1;
        const delimiterHasComma = delimiter.includes('comma');
        if (delimiterHasComma && (!isLastItem || trailingComma)) {
            formattedId += ',';
        }
        
        // Add comment AFTER comma
        if (includeComments) {
            formattedId += `   # ${sampleNames[index]}`;
        }
        
        return formattedId;
    });
    
    // Check if YAML format (for disclaimer section)
    const isYAML = section === 'disclaimer';
    
    // Add YAML prefix if needed
    if (isYAML) {
        formattedIds = formattedIds.map(id => `  - ${id}`);
    }
    
    // Join with delimiter (strip comma from delimiter since we already added it)
    let result;
    const delimiterHasComma = delimiter.includes('comma');
    
    switch (delimiter) {
        case 'comma-space':
            result = delimiterHasComma ? formattedIds.join(' ') : formattedIds.join(', ');
            break;
        case 'comma-newline':
            result = delimiterHasComma ? formattedIds.join('\n') : formattedIds.join(',\n');
            break;
        case 'comma':
            result = delimiterHasComma ? formattedIds.join('') : formattedIds.join(',');
            break;
        case 'newline':
            result = formattedIds.join('\n');
            break;
        case 'space':
            result = formattedIds.join(' ');
            break;
        default:
            result = formattedIds.join(', ');
    }
    
    // Update placeholder
    const placeholderText = `Formatted IDs will appear here...\n\nExample output:\n${result}`;
    outputArea.placeholder = placeholderText;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    if (type === 'warning') {
        notification.style.background = 'var(--warning-color)';
    } else if (type === 'error') {
        notification.style.background = 'var(--danger-color)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}
