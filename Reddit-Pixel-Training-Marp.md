---
marp: true
theme: default
paginate: true
backgroundColor: #fff
color: #000
header: 'Reddit Pixel Implementation Training'
footer: 'Sales Team Guide | 2026'
---

<!-- _class: lead -->

# Reddit Pixel Implementation

## A Sales Team's Guide to Understanding, QA'ing, and Discussing Pixel Setup

Presented by: [Your Name]
Date: [Date]

---

# Session Objectives

By the end of this session, you will be able to:

✅ Explain how Reddit Pixel tracking works
✅ Understand what code needs to be on which pages
✅ Confidently QA a client's pixel implementation
✅ Identify common setup issues before they impact campaigns
✅ Know when to involve Technical Solutions
✅ Have productive conversations with clients about pixel responsibility

---

# Why Does This Matter?

## For Your Clients:
- 📊 Track campaign ROI accurately
- 🎯 Build high-value retargeting audiences
- 💰 Optimize for conversions, not just clicks
- 📈 Scale campaigns with confidence

## For You (Sales):
- 💪 Build trust through technical competency
- ⚡ Faster campaign launches (fewer delays)
- 🔄 Reduced back-and-forth with Tech Solutions
- 📞 Better client conversations

**Bottom Line:** Properly implemented pixels = better results = retained clients = renewals

---

# The Responsibility Framework

## Who Does What?

| Task | Advertiser | Account Team (You!) | Tech Solutions |
|------|-----------|---------------------|----------------|
| **Code Implementation** | ✅ Primary Owner | 📋 Share docs | 📖 Create docs |
| **Placing Code** | ✅ Their dev team | 🤝 Coordinate | 🛠️ Complex guidance |
| **Testing** | ✅ Initial testing | ✅ Basic QA | ✔️ Deep validation |
| **Fixing Issues** | ✅ Update code | 🔍 ID simple issues | 🔍 Diagnose complex |
| **Maintenance** | ✅ Monitor events | 👀 Spot-check | 🚨 Alert critical |
| **Communication** | N/A | ✅ Primary contact | 📞 Escalations |

**Your Role:** Bridge between advertiser and Tech Solutions. Handle basics, escalate complex.

---

# What is the Reddit Pixel?

**Definition:** A small piece of JavaScript code that tracks user actions on a website and sends that data to Reddit.

## Analogy: Security Camera in a Store
- **Camera (Pixel):** Watches what happens
- **Recording (Events):** Saves important moments
- **Playback (Reporting):** Shows you what happened later

## Two Components:
1. **Base Pixel Code** - Goes on every page (tracks page visits)
2. **Event Tracking Code** - Goes on specific pages (tracks actions)

---

# Base Pixel Code - The Foundation

This code **MUST be on EVERY page:**

```javascript
<script>
!function(w,d){if(!w.rdt){var p=w.rdt=function(){
p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};
p.callQueue=[];var t=d.createElement("script");
t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;
var s=d.getElementsByTagName("script")[0];
s.parentNode.insertBefore(t,s)}}(window,document);
rdt('init','t2_PIXELID', {"optOut":false,"useDecimalCurrencyValues":true});
rdt('track', 'PageVisit');
</script>
```

**Key Points:**
- ❗ Must be in `<head>` section
- ❗ Loads Reddit's pixel library
- ❗ Initializes with advertiser's unique Pixel ID
- ❗ Automatically tracks PageVisit event

---

# Event Tracking - Actions That Matter

| Event | When | Page Example | Why |
|-------|------|--------------|-----|
| **PageVisit** | Every page load | All pages | Audience building |
| **ViewContent** | Product view | Product detail | Interest signals |
| **AddToCart** | Add to cart click | Product page | High intent |
| **Purchase** | Order complete | Thank you page | Conversion tracking |
| **SignUp** | Account creation | Registration | Lead gen |
| **Lead** | Form submission | Contact form | B2B tracking |

**Remember:** More data = Better optimization + Better audiences

---

# Event Anatomy

## Example: AddToCart Event

```javascript
rdt('track', 'AddToCart', {
    itemId: 'WIDGET-001',           // Product SKU/ID
    itemName: 'Premium Widget',      // Product name
    itemPrice: 29.99,                // Price (decimal)
    currency: 'USD',                 // Currency code
    quantity: 1                      // Quantity added
});
```

## Why This Data Matters:
1. **itemId** → Track which products drive conversions
2. **itemPrice** → Calculate revenue and ROAS
3. **currency** → Support international advertisers
4. **Product details** → Build product-specific audiences

---

# Manual Implementation

## Pros:
✅ Simple for static sites
✅ No additional tools needed
✅ Direct control
✅ Works on platforms like Neocities

## Cons:
❌ Must edit HTML files directly
❌ Harder to update
❌ Developer required for changes

**Best For:** Small sites, Neocities, static HTML

---

# GTM Implementation

## Pros:
✅ No code changes after GTM installed
✅ Marketers can update tags
✅ Multiple pixels in one place
✅ Easy A/B testing

## Cons:
❌ GTM must be installed first
❌ More complex setup
❌ Another tool to learn

**Best For:** Large sites, frequent changes, multiple pixels

---

# Data Layer & Macros

## What is a Data Layer?
Structured JavaScript object holding page information:

```javascript
dataLayer = {
    page: 'product',
    productId: 'WIDGET-001',
    productName: 'Premium Widget',
    price: 29.99
}
```

## What are Macros?
Placeholders that pull data dynamically:

```javascript
itemId: '{{Product ID}}'        // Replaced at runtime
itemPrice: {{Product Price}}
```

---

# Why Structured Data is Critical

## ❌ Poor Structure:
```javascript
rdt('track', 'Purchase', {
    value: 'seventy-nine dollars'    // String!
});
```
**Result:** Can't calculate ROAS, optimization breaks

## ✅ Good Structure:
```javascript
rdt('track', 'Purchase', {
    value: 79.99,                    // Decimal
    currency: 'USD',
    transactionId: 'T-12345'
});
```
**Result:** Accurate tracking, optimization works

---

# Common Misconfigurations (1/2)

## Issue #1: Pixel Only on Homepage
- **Symptom:** Events drop after first page
- **Fix:** Ensure base code on ALL pages

## Issue #2: Wrong Pixel ID
- **Symptom:** No events in Ads Manager
- **Fix:** Verify Pixel ID matches Settings → Pixels

## Issue #3: Events Fire Multiple Times
- **Symptom:** Double/triple event counts
- **Fix:** Search for `rdt('init'` - should appear once

---

# Common Misconfigurations (2/2)

## Issue #4: Event on Wrong Page
- **Symptom:** Purchase fires on product page
- **Fix:** Move Purchase to thank-you page only

## Issue #5: Missing Product Data
- **Symptom:** Events fire but no product details
- **Fix:** Verify data layer has values

## Issue #6: Test Pixel ID in Production
- **Symptom:** Events going to wrong account
- **Fix:** Replace with production Pixel ID

---

# Tools for Advertisers

## What We Provide:

1. 📖 **Implementation Documentation** - Step-by-step guides
2. 🧪 **Reddit Pixel Helper** - Browser extension
3. 📊 **Event Manager** - See events in Ads Manager
4. 🎓 **Help Center Articles** - Video tutorials
5. 🤝 **Technical Solutions Support** - Escalation path

---

# Your QA Toolkit

## 1. Browser Developer Tools (F12)
- **Network Tab:** See pixel requests
- **Console Tab:** Check for errors

## 2. Reddit Pixel Helper Extension
- Icon lights up when pixel detected
- Shows events as they fire
- Real-time validation

## 3. Event Manager
- Settings → Pixels → Event Manager
- See last 24 hours
- Check data quality

---

# Sales Team QA Checklist

## ✅ Setup Phase
- Pixel ID created
- Documentation shared
- Implementation approach agreed

## ✅ Implementation Phase
- Base pixel on ALL pages
- Correct Pixel ID
- PageVisit events showing

## ✅ Event Tracking Phase
- ViewContent fires
- AddToCart fires
- Purchase fires (thank-you page only)
- Product data included

---

# When to Involve Technical Solutions

## You Can Handle:
✅ Sharing documentation
✅ Verifying pixel installed
✅ Checking Event Manager
✅ Identifying obvious issues

## Escalate When:
🚨 Complex GTM setup
🚨 Data layer architecture questions
🚨 Server-side tracking
🚨 Custom event specifications
🚨 Cross-domain tracking

**You're first line of support, Tech Solutions is the specialist**

---

# Client Conversation - Setting Expectations

## First Call Script:

> "To track results from your Reddit campaigns, we'll need to implement our pixel on your site. This is a small piece of code that tracks when people view products, add to cart, and make purchases. We'll provide you with documentation and code examples, and your dev team will place it on the appropriate pages. Once it's in place, we can verify it together."

## Key Points:
✅ Emphasize "your dev team implements"
✅ Mention documentation provided
✅ Offer to QA after implementation
✅ Set timeline (1-2 weeks)

---

# Client Conversation - Following Up

## After Implementation:

> "I see the pixel is firing on your site - great work! Let me run through a quick test purchase to verify everything is tracking correctly. [Do test] Perfect! I'm seeing the ViewContent, AddToCart, and Purchase events all coming through with the right product data. You're all set for launch."

**What You're Doing:**
- Builds confidence
- Validates their work
- Confirms launch readiness

---

# Real Example - Simple Store

## Site Structure:
- Homepage (product listing)
- Product detail pages (2 products)
- Cart page
- Success page

## Pixel Implementation:
1. Base pixel on all 5 pages
2. ViewContent on homepage
3. ViewContent on product pages
4. AddToCart on product pages
5. Purchase on success page

**Now let's see it in action...**

---

<!-- _class: lead -->

# Live Demo

## Part 1: Code Review
## Part 2: User Journey Testing
## Part 3: Event Manager Validation

---

# Quick QA During Client Calls

## Screen Share Protocol:

1. Ask client to screen share
2. Open DevTools (F12)
3. Network tab → Filter "reddit"
4. Refresh page
5. Look for Reddit pixel requests

✅ **Requests present:** "Pixel is installed"
❌ **No requests:** "Let's check the code"

**Takes 2 minutes, builds massive confidence**

---

# Common Client Questions

**Q: "How long does implementation take?"**
A: Typically 1-2 weeks depending on dev team bandwidth

**Q: "Can you just do it for us?"**
A: We provide code and guidance, but your team implements

**Q: "Will it slow down our site?"**
A: No. Loads asynchronously, designed for performance

**Q: "What if we use Shopify/WordPress?"**
A: Great! We have platform-specific instructions

---

# Red Flags to Watch For

🚩 "We'll implement after launch"
→ "Pixel needed before launch for audiences"

🚩 "Our site is proprietary"
→ "If you can add JavaScript, it'll work"

🚩 "Should we remove other pixels?"
→ "No, Reddit works alongside them"

🚩 "We'll copy Facebook Pixel code"
→ "Reddit has its own structure, use our docs"

---

# Success Metrics

## Event Volume:
- PageVisit > 100/day
- ViewContent showing
- AddToCart 2-5% of ViewContent
- Purchase matches orders

## Data Quality:
- 90%+ events have product data
- Prices formatted correctly
- Unique transaction IDs
- No duplicates

## Timeline:
- Completed before launch
- QA 1 week before ads run

---

# Your Action Items

## Week 1:
☐ Bookmark pixel documentation
☐ Install Pixel Helper extension
☐ Identify 2-3 deals needing pixel

## Week 2:
☐ Practice QA on demo site
☐ Shadow Tech Solutions call
☐ Add pixel to discovery template

## Ongoing:
☐ Use QA checklist
☐ Share with new team members
☐ Flag common issues

---

# Resources & Support

## Documentation:
- 📖 Reddit Pixel Installation Guide
- 🎥 Video Tutorials
- 📋 Event Specifications

## Tools:
- 🔧 Reddit Pixel Helper
- 💻 Simple Store Demo Site
- ✅ QA Checklist Template

## Internal Support:
- 👥 Tech Solutions (Slack: #tech-solutions)
- 📧 pixel-support@reddit.com
- 📞 Office Hours: Fridays 2-3pm

---

# Key Takeaways

1. **🎯 Pixel = Better Results**
   Proper tracking → better optimization, audiences, ROI

2. **🤝 Advertiser Implements, We Guide**
   Clear roles prevent bottlenecks

3. **✅ Basic QA is Your Superpower**
   2-minute checks build trust

4. **🚨 Know When to Escalate**
   You handle basics, Tech Solutions handles complex

5. **📊 Good Data = Happy Clients**
   Structured data unlocks platform capabilities

6. **💬 Confident Conversations Close Deals**
   Technical competence differentiates you

---

<!-- _class: lead -->

# Questions?

---

<!-- _class: lead -->

# Thank You!

**Let's make pixel implementation seamless for our clients**

Reach out: Technical Solutions Team
Slack: #tech-solutions

