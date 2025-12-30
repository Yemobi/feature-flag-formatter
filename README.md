# 🚀 Feature Flag ID Formatter

A modern web-based tool designed to streamline feature flagging workflows by intelligently formatting and categorizing account IDs for repository integration.

![Feature Flag ID Formatter](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🎯 Purpose

This tool solves the common challenge of formatting account IDs for feature flag configurations across different flag types (Sustainability, Viewability, Third-party) with varying format requirements (quotes, delimiters, case sensitivity).

## ✨ Features

### Smart Categorization
- **Tag-based Organization**: Add tags to IDs as you paste them:
  - `-S` or `-Sustainability` for Sustainability flags
  - `-V` or `-Viewability` for Viewability flags
  - `-B` or `-Both` for IDs that apply to both categories
  - `-TP` or `-ThirdParty` for third-party advertiser flags
- **Automatic Categorization**: IDs are automatically sorted into their respective categories
- **Multi-category Output**: View all categories together or individually

### Flexible Formatting Options

#### Quote Styles
- Double quotes: `"account_id"`
- Single quotes: `'account_id'`
- No quotes: `account_id`

#### Delimiters
- Comma + Space: `"id1", "id2", "id3"`
- Comma only: `"id1","id2","id3"`
- Newline: Each ID on a new line with comma
- Space only: `"id1" "id2" "id3"`

#### Case Conversion
- Keep original case
- Convert to UPPERCASE
- Convert to lowercase

#### Additional Options
- ✅ Remove duplicate IDs
- ✅ Sort alphabetically
- ✅ Add trailing comma

### User-Friendly Interface
- **Live Preview**: Formats update as you type
- **Tab Navigation**: Switch between different feature flag categories
- **Statistics Display**: See count of IDs per category
- **One-Click Copy**: Copy formatted output directly to clipboard
- **Example Templates**: Pre-loaded examples to get started quickly

## 🚀 Getting Started

### Quick Start
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/feature-flag-formatter.git
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

1. **Input Your IDs**
   - Paste account IDs into the input area (one per line or comma-separated)
   - Optionally tag each ID with its category

   Example input:
   ```
   xx_xxxxid1 -S
   xx_xxxxid2 -V
   xx_xxxxid3 -B
   tp_XXX1 -TP
   ```

2. **Configure Formatting**
   - Select your feature flag type
   - Choose quote style (double, single, or none)
   - Pick your delimiter preference
   - Set case conversion if needed
   - Toggle additional options (remove duplicates, sort, trailing comma)

3. **Review & Copy**
   - Check the formatted output
   - Switch between category tabs if needed
   - Click "Copy to Clipboard" to copy the result
   - Paste directly into your feature flag repository

### Example Use Cases

#### Sustainability Feature Flag
**Input:**
```
account_001 -S
account_002 -S
account_003 -B
```

**Output (with previous IDs):**
```
"previousid_1", "previousid_2", "previousid_3", "previousid_4",
"account_001", "account_002", "account_003",
```

#### Third-Party Advertiser
**Input:**
```
tp_XXX1
tp_XXX2
tp_XXX3
```

**Output (uppercase, single quotes):**
```
'TP_PREVIOUS1',
'TP_PREVIOUS2',
'TP_XXX1',
'TP_XXX2',
'TP_XXX3',
```

## 🎨 Features in Detail

### Smart ID Detection
The tool automatically detects and parses:
- Newline-separated IDs
- Comma-separated IDs
- Mixed formats
- IDs with category tags

### Multi-Category Support
When an ID is tagged as "Both" (`-B`), it automatically appears in both Sustainability and Viewability categories, eliminating manual duplication.

### Repository-Ready Format
Outputs are formatted to match existing repository patterns, making it easy to:
- Append new IDs to existing lists
- Maintain consistent formatting across your codebase
- Reduce manual formatting errors

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks, pure ES6+

### Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

### Performance
- Lightweight: < 50KB total
- Instant formatting: No server calls
- Privacy-friendly: All processing happens locally in your browser

## 📂 Project Structure

```
feature-flag-formatter/
├── index.html          # Main HTML structure
├── styles.css          # All styling and layout
├── script.js           # Core functionality and logic
├── README.md           # This file
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

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- Inspired by [delim.co](https://delim.co) for data formatting
- Built to streamline team feature flagging workflows
- Designed with developer experience in mind

## 📮 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Contribute improvements via pull requests

---

**Made with ❤️ for efficient feature flag management**
