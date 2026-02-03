# 🚀 Feature Flag ID Formatter

A modern web-based tool designed to streamline feature flagging workflows by intelligently formatting and categorizing account IDs for repository integration.

![Feature Flag ID Formatter](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

🌐 **Live Demo**: [https://yemobi.github.io/feature-flag-formatter/](https://yemobi.github.io/feature-flag-formatter/)

## 🎯 Purpose

This tool solves the common challenge of formatting account IDs for feature flag configurations across different flag types with varying format requirements (quotes, delimiters, case sensitivity, special formats like YAML).

## ✨ Features

### 🏷️ Dedicated Feature Flag Tabs

Each feature flag type has its own dedicated workspace with customized inputs and outputs:

#### 1. **✓✓ DoubleVerify**
- Format account IDs for DoubleVerify feature flags
- Support for Sustainability and Viewability categorization
- Default: lowercase, comma delimiter

#### 2. **🔗 Third Party Advertiser**
- Format third-party advertiser IDs
- Default: lowercase, double quotes, comma + newline, trailing comma
- Includes account name comments by default

#### 3. **🔐 IAS (Integral Ad Science)**
- Special support for IAS API keys
- Generates both ID lists and ID:APIKey pairs
- 4-column input: ID, Account Name, IAS API Key, Jira Ticket ID

#### 4. **📺 RMAX**
- Simplified 2-column input: ID and Jira Ticket ID
- Default: double quotes, comma + space, trailing comma

#### 5. **🎴 Card View**
- Format IDs for card view feature flags
- Default: double quotes, comma + newline, trailing comma

#### 6. **📋 Disclaimer Text**
- **NEW!** Special YAML list format with comments
- Output format: `  - t2_xxxxx   # Account Name`
- Perfect for YAML configuration files
- Default: no quotes, newline delimiter, includes comments

### 🆕 New Features

#### **Resource Link Placeholders**
Each tab now includes editable placeholders for quick reference:
- **Github repo:** Click to add your repository URL
- **Confluence docs:** Click to add your documentation URL

These links are editable directly in the interface - just click and type!

#### **Example Output Previews**
Each output area now shows example formatting so you know exactly what to expect:
- See format examples before you input data
- Understand quote styles, delimiters, and special formatting
- Learn the YAML format for Disclaimer Text tab

### 📊 Input Modes

**Dual Input Support** for most tabs:
- **📊 Table Mode**: Spreadsheet-like interface
  - Add/remove rows dynamically
  - Direct Excel paste support
  - Columns vary by feature flag type
- **📝 Text Mode**: Flexible text input
  - Simple ID lists (one per line)
  - Pipe-separated format: `ID | Account Name | Jira Ticket`
  - Tab-separated (from Excel/Sheets)

### 🎛️ Flexible Formatting Options

#### Quote Styles
- **Double quotes**: `"account_id"`
- **Single quotes**: `'account_id'`
- **No quotes**: `account_id`

#### Delimiters
- **Comma + Space**: `"id1", "id2", "id3"`
- **Comma only**: `"id1","id2","id3"`
- **Comma + Newline**: Each ID on new line with comma
- **Newline**: Each ID on new line
- **Space only**: `"id1" "id2" "id3"`

#### Case Conversion
- Keep original case
- Convert to UPPERCASE
- Convert to lowercase

#### Additional Options
- ✅ **Trailing Comma**: Add comma after last item
- ✅ **Include Account Name Comments**: Add `# Account Name` after each ID
- ✅ **Custom Comment Character**: Choose your comment symbol (default: #)

### 🔍 Duplicate Checker

Dedicated tab to compare new IDs against existing repository IDs:
- Paste new IDs to add
- Paste existing repository IDs
- Instantly see which IDs are duplicates
- Identify which IDs are safe to add

### 🎨 Layout Customization

**Three Layout Options** to match your workflow:
- **Top Layout**: Format options at top, inputs and outputs side-by-side
- **Middle Layout** (Default): Three-column layout with format options in center
- **Bottom Layout**: Inputs and outputs at top, format options at bottom

Layout preference is saved automatically in your browser.

### 📋 Jira Integration

Automatic Jira ticket markdown generation:
- Extract ticket IDs from input (format: AH-12345)
- Generate markdown links for PR descriptions
- Format: `[AH-12345](https://jira.your-domain.com/browse/AH-12345)`
- One-click copy for easy PR creation

## 🚀 Getting Started

### Online (Recommended)
Simply visit: [https://yemobi.github.io/feature-flag-formatter/](https://yemobi.github.io/feature-flag-formatter/)

### Local Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Yemobi/feature-flag-formatter.git
   cd feature-flag-formatter
   ```

2. Open `index.html` in your web browser:
   ```bash
   open index.html
   # or on Windows: start index.html
   # or on Linux: xdg-open index.html
   ```

3. Start formatting your IDs!

### No Installation Required
This is a pure HTML/CSS/JavaScript application - no build tools, no dependencies, no server required. Just open and use!

## 📖 Usage Guide

### Basic Workflow

1. **Select Feature Flag Type**
   - Click the appropriate tab (DoubleVerify, Third Party, IAS, etc.)

2. **Add Resource Links** (Optional but Recommended)
   - Click on `<Add URL here>` under the tab title
   - Type or paste your Github repo URL
   - Add your Confluence documentation URL

3. **Input Your IDs**
   - **Table Mode**: 
     - Enter data directly in table cells
     - Use "Paste from Excel" for bulk import
     - Click "+ Add Row" for more entries
   - **Text Mode**:
     - Paste IDs one per line, or
     - Use pipe format: `t2_xxxxx | Company Name | AH-12345`

4. **Configure Formatting**
   - Choose quote style
   - Pick delimiter preference
   - Set case conversion if needed
   - Toggle trailing comma
   - Enable/disable account name comments

5. **Format Output**
   - Click "Format Output" button
   - Review the formatted IDs in the output area
   - Check Jira tickets for PR (if applicable)

6. **Copy & Use**
   - Click "📋 Copy IDs" to copy formatted output
   - Click "📋 Copy Jira Links" for PR description
   - Optionally "🔍 Check in Duplicates" before committing

### Example Use Cases

#### Example 1: DoubleVerify IDs

**Input (Table):**
| ID | Account Name | Jira Ticket |
|----|--------------|-------------|
| t2_abc123 | Nike Inc | AH-10001 |
| t2_def456 | Adidas | AH-10002 |

**Format Options:**
- Quote: None
- Delimiter: New Line
- Case: lowercase
- Comments: Unchecked

**Output:**
```
t2_abc123
t2_def456
t2_ghi789
```

#### Example 2: Third Party with Comments

**Input (Text):**
```
tp_xxx1 | Coca Cola | AH-20001
tp_xxx2 | PepsiCo | AH-20002
```

**Format Options:**
- Quote: Single
- Delimiter: Comma + New Line
- Case: lowercase
- Trailing Comma: Checked
- Comments: Checked

**Output:**
```
'tp_xxx1',   # Coca Cola
'tp_xxx2',   # PepsiCo
```

**Jira Output:**
```
[AH-20001](https://jira.your-domain.com/browse/AH-20001)
[AH-20002](https://jira.your-domain.com/browse/AH-20002)
```

#### Example 3: Disclaimer Text (YAML Format)

**Input:**
```
t2_abc123 | Novo Nordisk - Ozempic | AH-30001
t2_def456 | AbbVie - SKYRIZI | AH-30002
```

**Output:**
```
  - t2_abc123   # Novo Nordisk - Ozempic
  - t2_def456   # AbbVie - SKYRIZI
```

#### Example 4: IAS with API Keys

**Input (Table):**
| ID | Account Name | IAS API Key | Jira Ticket |
|----|--------------|-------------|-------------|
| t2_xyz789 | Amazon | IAS_KEY_abc123 | AH-40001 |

**ID Output:**
```
t2_xyz789
```

**ID:APIKey Pairs Output:**
```
t2_xyz789:IAS_KEY_abc123
```

## 🎨 Interface Features

### Visual Layout Selector
Switch between three layout modes with intuitive icons:
- **Top** (▭▭): Format options on top
- **Middle** (|||): Three-column layout
- **Bottom** (▭▭): Format options on bottom

### Statistics Display
Real-time count of:
- Total IDs formatted
- Number of Jira tickets found
- Duplicate IDs detected

### Responsive Design
- Works on desktop, tablet, and mobile
- Adapts layout for smaller screens
- Touch-friendly controls

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **Local Storage**: Save layout preferences

### Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

### Performance
- Lightweight: ~100KB total
- Instant formatting: No server calls
- Privacy-friendly: All processing happens locally in your browser
- No tracking or analytics

## 📂 Project Structure

```
feature-flag-formatter/
├── index.html          # Main HTML structure
├── styles.css          # All styling and layout
├── script.js           # Core functionality and logic
├── README.md           # This file
├── CODE_DOCUMENTATION.md  # Technical code documentation
└── .gitignore         # Git ignore rules
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by [delim.co](https://delim.co) for data formatting
- Built to streamline Reddit's feature flagging workflows
- Designed with developer experience in mind
- Reddit Orange branding (#FF4500)

## 📮 Support

If you encounter any issues or have questions:
- Open an issue on GitHub: [https://github.com/Yemobi/feature-flag-formatter/issues](https://github.com/Yemobi/feature-flag-formatter/issues)
- Check existing issues for solutions
- Contribute improvements via pull requests

## 🗺️ Roadmap

Future enhancements being considered:
- [ ] Import/Export configuration presets
- [ ] Bulk ID validation
- [ ] Integration with Git APIs
- [ ] Dark mode theme
- [ ] Custom tab creation

---

**Made with ❤️ for efficient feature flag management**

Reddit Orange 🧡 • Clean Code 💎 • Zero Dependencies 🚀
