# Reddit Pixel Training - Copy-Paste Ready for Google Slides

**Instructions:** Copy each slide's content below and paste into your Google Slides deck. Each slide is clearly marked with its number and title.

---

## SLIDE 1: Title Slide

**Title:**
Reddit Pixel Implementation

**Subtitle:**
A Sales Team's Guide to Understanding, QA'ing, and Discussing Pixel Setup

**Footer:**
Presented by: [Your Name]
Date: [Date]

---

## SLIDE 2: Session Objectives

**Title:** Session Objectives

**Body:**
By the end of this session, you will be able to:

• Explain how Reddit Pixel tracking works
• Understand what code needs to be on which pages
• Confidently QA a client's pixel implementation
• Identify common setup issues before they impact campaigns
• Know when to involve Technical Solutions
• Have productive conversations with clients about pixel responsibility

---

## SLIDE 3: Why Does This Matter?

**Title:** Why Does This Matter?

**Left Column - For Your Clients:**
• 📊 Track campaign ROI accurately
• 🎯 Build high-value retargeting audiences
• 💰 Optimize for conversions, not just clicks
• 📈 Scale campaigns with confidence

**Right Column - For You (Sales):**
• 💪 Build trust through technical competency
• ⚡ Faster campaign launches (fewer delays)
• 🔄 Reduced back-and-forth with Tech Solutions
• 📞 Better client conversations

**Bottom:**
Bottom Line: Properly implemented pixels = better results = retained clients = renewals

---

## SLIDE 4: The Responsibility Framework

**Title:** The Responsibility Framework - Who Does What?

**Table:**
| Task | Advertiser Responsibility | Account Team (You!) | Tech Solutions Role |
|------|--------------------------|---------------------|---------------------|
| Code Implementation | ✅ Primary Owner | 📋 Share documentation | 📖 Create documentation |
| Placing Code on Pages | ✅ Their dev team | 🤝 Coordinate & follow up | 🛠️ Complex guidance |
| Testing & Validation | ✅ Initial testing | ✅ Basic QA (2-min check) | ✔️ Deep validation |
| Fixing Issues | ✅ Update their code | 🔍 Identify simple issues | 🔍 Diagnose complex issues |
| Ongoing Maintenance | ✅ Monitor events | 👀 Spot-check regularly | 🚨 Alert if critical issues |
| Client Communication | N/A | ✅ Primary contact | 📞 Technical escalations |

**Key Message:**
"Advertiser implements → Account Team guides & QAs → Tech Solutions handles complex scenarios"

**Your Role:** You're the bridge between the advertiser and Tech Solutions. Handle the basics, escalate the complex stuff.

---

## SLIDE 4B: Why Clients Should Handle Implementation

**Title:** Why Clients Should Handle Implementation

**Key Point:**
Advertisers running digital campaigns already have developers proficient in this type of work.

**Reality Check:**
• 🏢 They Already Manage Their Website - If they built and maintain a website, they can implement tracking pixels
• 💻 Standard Industry Practice - Pixel implementation is a core requirement for any digital advertising (Google Ads, Facebook, TikTok, etc.)
• 🛠️ Basic Web Development Skill - Adding JavaScript snippets is fundamental web development
• 📋 They've Done This Before - Most clients have already implemented Google Analytics, Facebook Pixel, or other tracking codes

**This is NOT a complex technical request:**
✅ Copy-paste code snippets (no custom coding required)
✅ Industry-standard implementation method
✅ Well-documented with clear examples
✅ Similar to other pixels they've already implemented

**Client Conversation Script:**
"Your development team is already familiar with this type of implementation—it's similar to adding Google Analytics or Facebook Pixel. We provide comprehensive documentation and working examples. Once your team has it in place, we'll validate it's tracking correctly and help troubleshoot if needed."

**Why This Matters:**
• Respects your client's existing technical capabilities
• Maintains appropriate service boundaries
• Ensures they can maintain and update their own tracking
• Focuses your time on strategy and campaign optimization, not basic code placement

---

## SLIDE 5: What is the Reddit Pixel?

**Title:** What is the Reddit Pixel?

**Definition:**
A small piece of JavaScript code that tracks user actions on a website and sends that data to Reddit.

**Analogy:**
Think of it like a security camera in a store:
• Camera (Pixel): Watches what happens
• Recording (Events): Saves important moments
• Playback (Reporting): Shows you what happened later

**Two Components:**
1. Base Pixel Code - Goes on every page (tracks page visits)
2. Event Tracking Code - Goes on specific pages (tracks actions)

---

## SLIDE 6: Base Pixel Code - The Foundation

**Title:** Base Pixel Code - The Foundation

**Subtitle:** This code MUST be on EVERY page:

**Code Block:**
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
• ❗ Must be in the <head> section
• ❗ Loads Reddit's pixel library
• ❗ Initializes with advertiser's unique Pixel ID
• ❗ Automatically tracks PageVisit event

**Why Every Page?**
If it's missing from ANY page, we lose tracking continuity when users navigate there.

---

## SLIDE 7: Event Tracking - The Actions That Matter

**Title:** Event Tracking - The Actions That Matter

**Subtitle:** Standard E-commerce Events:

**Table:**
| Event | When to Track | Page Example | Why It Matters |
|-------|---------------|--------------|----------------|
| PageVisit | Every page load | All pages | Audience building |
| ViewContent | Product view | Product detail page | Interest signals |
| AddToCart | Add to cart click | Product page | High intent |
| Purchase | Order complete | Thank you page | Conversion tracking |
| SignUp | Account creation | Registration page | Lead gen |
| Lead | Form submission | Contact form | B2B tracking |

**Bottom:**
Remember: More data = Better optimization + Better audiences

---

## SLIDE 8: Event Anatomy - What Goes in the Code?

**Title:** Event Anatomy - What Goes in the Code?

**Example: AddToCart Event**

**Code Block:**
```javascript
rdt('track', 'AddToCart', {
    itemId: 'WIDGET-001',           // Product SKU/ID
    itemName: 'Premium Widget',      // Product name
    itemPrice: 29.99,                // Price (decimal)
    currency: 'USD',                 // Currency code
    quantity: 1                      // Quantity added
});
```

**Why This Data Matters:**
1. itemId → Track which products drive conversions
2. itemPrice → Calculate revenue and ROAS
3. currency → Support international advertisers
4. Product details → Build product-specific audiences

**Without this data:** Pixel fires but data is incomplete = Limited optimization

---

## SLIDE 9: Manual vs GTM Implementation - Manual

**Title:** Manual vs GTM Implementation

**Left Side - Manual Implementation (Hardcoded):**

**Pros:**
• ✅ Simple for static sites
• ✅ No additional tools needed
• ✅ Direct control
• ✅ Works on platforms like Neocities

**Cons:**
• ❌ Must edit HTML files directly
• ❌ Harder to update
• ❌ Developer required for changes

**Best For:** Small sites, Neocities, static HTML

---

## SLIDE 10: Manual vs GTM Implementation - GTM

**Title:** GTM Implementation (Tag Manager)

**Pros:**
• ✅ No code changes needed after GTM is installed
• ✅ Marketers can update tags
• ✅ Multiple pixels managed in one place
• ✅ Easy A/B testing

**Cons:**
• ❌ GTM must be installed first
• ❌ More complex setup
• ❌ Another tool to learn

**Best For:** Large sites, frequent changes, multiple marketing pixels

---

## SLIDE 11: Data Layer & Macros Explained

**Title:** Data Layer & Macros Explained

**Left Side - What is a Data Layer?**

A structured JavaScript object that holds page information:

```javascript
dataLayer = {
    page: 'product',
    productId: 'WIDGET-001',
    productName: 'Premium Widget',
    price: 29.99,
    category: 'Widgets'
}
```

Purpose: Separates data from tracking code

**Right Side - What are Macros?**

Placeholders that pull data dynamically:

```javascript
rdt('track', 'ViewContent', {
    itemId: '{{Product ID}}',        // Macro - replaced at runtime
    itemPrice: {{Product Price}}     // Macro - replaced at runtime
});
```

Benefits:
• One piece of code works for all products
• No hardcoding individual values
• Easier maintenance

---

## SLIDE 12: Why Structured Data is Critical

**Title:** Why Structured Data is Critical

**Left Side - Scenario 1: Poor Data Structure ❌**

```javascript
rdt('track', 'Purchase', {
    value: 'seventy-nine dollars'    // String instead of number
});
```

Result:
• ❌ Can't calculate ROAS
• ❌ Can't optimize for value
• ❌ Reporting breaks

**Right Side - Scenario 2: Good Data Structure ✅**

```javascript
rdt('track', 'Purchase', {
    value: 79.99,                    // Decimal number
    currency: 'USD',                 // Explicit currency
    transactionId: 'T-12345'         // Unique ID
});
```

Result:
• ✅ Accurate revenue tracking
• ✅ Value-based optimization works
• ✅ Deduplication possible

---

## SLIDE 13: Common Misconfigurations (Part 1)

**Title:** Common Misconfigurations (Part 1)

**Issue #1: Pixel Only on Homepage**
• Symptom: Events drop dramatically after first page
• Cause: Base pixel code missing from other pages
• Fix: Ensure base code is on ALL pages
• How to Spot: Check Event Manager - PageVisit count much lower than site traffic

**Issue #2: Wrong Pixel ID**
• Symptom: No events showing in Ads Manager
• Cause: Copy-paste error, using example ID
• Fix: Verify Pixel ID matches the one in Settings → Pixels
• How to Spot: Check browser console - look for 404 errors or "invalid pixel ID"

**Issue #3: Events Fire Multiple Times**
• Symptom: Double/triple event counts
• Cause: Pixel code duplicated on page or in GTM
• Fix: Search page source for rdt('init' - should appear once
• How to Spot: Event counts are 2x-3x expected traffic

---

## SLIDE 14: Common Misconfigurations (Part 2)

**Title:** Common Misconfigurations (Part 2)

**Issue #4: Event on Wrong Page**
• Symptom: Purchase events fire on product page
• Cause: Event code placed incorrectly
• Fix: Move Purchase event to thank-you/success page only
• How to Spot: Test user journey - check when Purchase fires

**Issue #5: Missing Product Data**
• Symptom: Events fire but no product details
• Cause: Macros not configured or data layer empty
• Fix: Verify data layer has values before event fires
• How to Spot: Event shows in Reddit but no itemId or itemPrice

**Issue #6: Test Pixel ID in Production**
• Symptom: Events going to wrong account
• Cause: Developer left test pixel ID in code
• Fix: Replace with production Pixel ID
• How to Spot: Events show up in wrong Ads account or not at all

---

## SLIDE 15: Tools for Advertisers

**Title:** Tools for Advertisers - What We Provide

1. **📖 Implementation Documentation**
   - Step-by-step code placement guide
   - Event specifications
   - Code examples

2. **🧪 Reddit Pixel Helper (Browser Extension)**
   - See events fire in real-time
   - Validate pixel ID
   - Check event parameters

3. **📊 Event Manager (in Ads Manager)**
   - See all events from last 24 hours
   - Verify events are coming through
   - Check data quality

4. **🎓 Help Center Articles**
   - Video tutorials
   - Written guides
   - Troubleshooting FAQs

5. **🤝 Technical Solutions Support**
   - Escalation path for complex issues
   - QA validation
   - Architecture guidance

---

## SLIDE 16: Tools for Sales Teams - Your QA Toolkit

**Title:** Tools for Sales Teams - Your QA Toolkit

**1. Browser Developer Tools (F12)**

Network Tab:
• Filter by "reddit" or "alb.reddit.com"
• See pixel requests in real-time
• Verify event data being sent

Console Tab:
• Check for JavaScript errors
• Verify data layer is populated
• See debug messages

**2. Reddit Pixel Helper Extension**

Download: Chrome Web Store
Features:
• Icon lights up when pixel detected
• Shows events as they fire
• Displays pixel ID and event parameters

How to Use:
1. Install extension
2. Visit client's site
3. Click extension icon
4. See real-time events

**3. Reddit Ads Manager - Event Manager**

Location: Settings → Pixels → Your Pixel → Event Manager

What You See:
• Total events by type
• Last 24 hours of activity
• Data quality warnings

Use During Calls:
• Screen share Event Manager
• Show client their events
• Identify gaps together

---

## SLIDE 17: Sales Team QA Checklist

**Title:** Sales Team QA Checklist

**Before Launching Campaigns, Verify:**

✅ **Setup Phase**
☐ Pixel ID created in Ads Manager
☐ Documentation shared with client
☐ Implementation approach agreed (manual vs GTM)

✅ **Implementation Phase**
☐ Base pixel code on ALL pages (check 3-5 random pages)
☐ Correct Pixel ID in code (not example/test ID)
☐ PageVisit events showing in Event Manager

✅ **Event Tracking Phase**
☐ ViewContent fires on product pages
☐ AddToCart fires when adding to cart
☐ Purchase fires on thank-you page ONLY
☐ Product data is included (itemId, itemPrice)

✅ **Validation Phase**
☐ Test purchase completed end-to-end
☐ Purchase event in Event Manager with correct value
☐ No duplicate events
☐ Events match expected user flow

---

## SLIDE 18: When to Involve Technical Solutions

**Title:** When to Involve Technical Solutions

**You Can Handle:**
• ✅ Sharing implementation documentation
• ✅ Verifying pixel is installed
• ✅ Checking Event Manager for basic events
• ✅ Identifying obvious issues (missing pixel, wrong page)

**Escalate to Tech Solutions When:**
• 🚨 Complex GTM setup with multiple tags
• 🚨 Data layer architecture questions
• 🚨 Server-side tracking requirements
• 🚨 Custom event specifications
• 🚨 Integration with third-party platforms
• 🚨 Persistent issues after advertiser has tried fixes
• 🚨 Cross-domain tracking needs

**Key Point:** You're the first line of support, Tech Solutions is the specialist.

---

## SLIDE 19: Having the Conversation with Clients - Setting Expectations

**Title:** Having the Conversation with Clients

**Setting Expectations (First Call):**

**What to Say:**
"To track results from your Reddit campaigns, we'll need to implement our pixel on your site. This is a small piece of code that tracks when people view products, add to cart, and make purchases. Your development team is already familiar with this type of implementation—it's the same process as Google Analytics or Facebook Pixel. We'll provide you with comprehensive documentation and code examples, and your dev team will place it on the appropriate pages. Once it's in place, we can verify it together."

**Key Points:**
• ✅ Emphasize "your dev team implements" (they have the capability)
• ✅ Compare to familiar tools (reduces perceived complexity)
• ✅ Mention you'll provide documentation
• ✅ Offer to QA after implementation
• ✅ Set timeline expectations (allow 1-2 weeks)
• ✅ Acknowledge their existing technical proficiency

---

## SLIDE 20: Having the Conversation - Following Up

**Title:** Following Up After Implementation

**What to Say:**
"I see the pixel is firing on your site - great work! Let me run through a quick test purchase to verify everything is tracking correctly. [Do test purchase] Perfect! I'm seeing the ViewContent, AddToCart, and Purchase events all coming through with the right product data. You're all set for launch."

**What You're Doing:**
• Builds confidence that it's working
• Validates their dev team's work
• Confirms readiness for campaign launch

---

## SLIDE 21: Real Example - Simple Store

**Title:** Real Example - Simple Store

**Let's look at an actual implementation:**

**Site Structure:**
• Homepage (product listing)
• Product detail pages (2 products)
• Cart page
• Success page

**Pixel Implementation:**
1. Base pixel on all 5 pages
2. ViewContent on homepage (product impressions)
3. ViewContent on product pages (single product)
4. AddToCart on product pages (button click)
5. Purchase on success page (order complete)

**Now let's see it in action...**

---

## SLIDE 22: Live Demo - Setup

**Title:** Live Demo - Part 1 (Setup)

**Demo Flow:**

**Step 1: Show the HTML Files**
• Open index.html in code editor
• Show base pixel in <head>
• Point out Pixel ID location

**Step 2: Show Event Tracking**
• Scroll to ViewContent event code
• Explain product data structure
• Show how it maps to site content

**Step 3: Open Site in Browser**
• Open browser with DevTools already open
• Network tab filtered to "reddit"
• Console tab visible

---

## SLIDE 23: Live Demo - Testing

**Title:** Live Demo - Part 2 (Testing)

**User Journey Walkthrough:**

**Action 1: Load Homepage**
• ✅ Show Reddit Pixel request in Network tab
• ✅ Point out PageVisit event
• ✅ Show product impression data

**Action 2: Click Product**
• ✅ Page loads → New PageVisit
• ✅ ViewContent fires with product details
• ✅ Show data in Network request

**Action 3: Add to Cart**
• ✅ AddToCart event fires
• ✅ Show product ID, name, price in payload
• ✅ Console confirms event

**Action 4: Checkout & Success**
• ✅ Cart PageVisit
• ✅ Success PageVisit
• ✅ Purchase event with transaction details

---

## SLIDE 24: Live Demo - Validation

**Title:** Live Demo - Part 3 (Validation)

**Open Reddit Ads Manager:**

Navigate to: Settings → Pixels → Event Manager

**Show:**
• Recent events (last 24 hours)
• Event counts by type
• Data quality indicators

**Point Out:**
• Events match our test journey
• Product data is present
• No errors or warnings

**Key Message:** "This is what good looks like"

---

## SLIDE 25: Quick QA During Client Calls

**Title:** Quick QA During Client Calls

**Screen Share Protocol:**

1. Ask client to screen share their site
2. Open browser DevTools (F12)
3. Go to Network tab → Filter by 'reddit'
4. Refresh page
5. Look for Reddit pixel requests

**If you see requests:** ✅ "Great, pixel is installed"
**If no requests:** ❌ "Let's check if the code is on this page"

**Next:**
6. Navigate to product page
7. Add item to cart
8. Check for AddToCart event

**Takes 2 minutes, builds massive confidence.**

---

## SLIDE 26: Common Client Questions

**Title:** Common Client Questions

**Q: "How long does implementation take?"**
A: "Typically 1-2 weeks depending on your dev team's bandwidth. The code itself is straightforward - the timeline is usually about prioritization on your end."

**Q: "Can you just do it for us?"**
A: "We provide the code and guidance, but it needs to be implemented by someone with access to your site's codebase. This ensures you maintain control and can make updates in the future. We're here to QA it once it's in place."

Enhanced Response:
"Your development team is already proficient in this type of work—they've built and maintained your website, so implementing tracking pixels is a standard task for them. This is similar to Google Analytics or Facebook Pixel, which most digital advertisers have already implemented. We provide comprehensive documentation with copy-paste code examples, and we'll validate everything once it's live to ensure it's tracking correctly."

Why This Response Works:
• ✅ Acknowledges their existing technical capability
• ✅ Compares to familiar tasks (reduces perceived complexity)
• ✅ Emphasizes your support role (documentation + QA)
• ✅ Maintains appropriate boundaries
• ✅ Shows respect for their dev team's competency

**Q: "Do we need to install anything?"**
A: "No downloads or installations. It's JavaScript code that gets added to your site's HTML. Similar to Google Analytics or Facebook Pixel if you've set those up before."

**Q: "Will it slow down our site?"**
A: "No. The pixel loads asynchronously, which means it doesn't block your page content from loading. It's designed for performance."

**Q: "What if we use Shopify/WordPress/etc?"**
A: "Great! Most platforms have easy ways to add tracking code. We can provide platform-specific instructions or you can use Google Tag Manager if you prefer."

---

## SLIDE 27: Red Flags to Watch For

**Title:** Red Flags to Watch For - During Discovery/Scoping

🚩 **Client says:** "We'll implement it after the campaign launches"
**Response:** "The pixel needs to be in place before launch so we can start building audiences and tracking results from day one."

🚩 **Client says:** "Our site is built on a proprietary platform"
**Response:** "That's fine - as long as you can add JavaScript to the pages, the pixel will work. Let's get Tech Solutions involved to discuss any unique requirements."

🚩 **Client says:** "We have lots of pixels already, should we remove them?"
**Response:** "No need to remove anything. Reddit Pixel works alongside other tracking pixels. Just make sure ours gets added too."

🚩 **Client says:** "We'll just copy the Facebook Pixel code and change it"
**Response:** "Reddit Pixel has its own specific code structure. Let's use the documentation we provide to ensure it's set up correctly."

---

## SLIDE 28: Success Metrics for Pixel Implementation

**Title:** Success Metrics for Pixel Implementation

**What "Good" Looks Like:**

**📊 Event Volume:**
• PageVisit events > 100/day (depends on traffic)
• ViewContent showing for product pages
• AddToCart showing (typically 2-5% of ViewContent)
• Purchase events matching actual orders

**📋 Data Quality:**
• 90%+ events include product data
• Currency and prices are formatted correctly
• Transaction IDs are unique
• No duplicate events

**⏱️ Timeline:**
• Implementation completed before campaign launch
• QA done at least 1 week before first ad runs
• Audience building starts immediately

---

## SLIDE 29: Your Action Items

**Title:** Your Action Items

**After This Training:**

**Week 1:**
☐ Bookmark Reddit Pixel documentation
☐ Install Reddit Pixel Helper browser extension
☐ Review your current pipeline - identify 2-3 upcoming deals needing pixel

**Week 2:**
☐ Practice QA flow on the Simple Store demo site
☐ Shadow a Tech Solutions QA call
☐ Add pixel discussion to your discovery template

**Ongoing:**
☐ Use QA checklist on every new implementation
☐ Share this deck with new team members
☐ Flag common issues to help improve documentation

---

## SLIDE 30: Resources & Support

**Title:** Resources & Support

**Documentation:**
• 📖 Reddit Pixel Installation Guide
• 🎥 Implementation Video Tutorials
• 📋 Event Specification Reference

**Tools:**
• 🔧 Reddit Pixel Helper (Chrome Extension)
• 💻 Simple Store Demo Site (for practice)
• ✅ QA Checklist Template

**Internal Support:**
• 👥 Technical Solutions Team (Slack: #tech-solutions)
• 📧 Pixel Questions: pixel-support@reddit.com
• 📞 Weekly Office Hours: Fridays 2-3pm

**This Deck:**
• 📎 Available on: [Internal Wiki Link]
• 🔄 Updated quarterly

---

## SLIDE 31: Key Takeaways

**Title:** Key Takeaways - Remember:

1. **🎯 Pixel = Better Results**
   Proper tracking means better optimization, audiences, and ROI

2. **🤝 Advertiser Implements, We Guide**
   Clear roles prevent bottlenecks and set proper expectations

3. **✅ Basic QA is Your Superpower**
   2-minute checks during calls build trust and catch issues early

4. **🚨 Know When to Escalate**
   Use Tech Solutions for complex scenarios, you handle the basics

5. **📊 Good Data = Happy Clients**
   Structured product data unlocks platform capabilities

6. **💬 Confident Conversations Close Deals**
   Technical competence differentiates you from competitors

---

## END OF SLIDES

**Total Slides: 31**

**How to Use:**
1. Copy the content for each slide
2. Paste into your Google Slides deck
3. Format with your branding
4. Add visuals/diagrams as needed
5. Adjust layouts to match your template

**Tips:**
• Use two-column layouts for "Pro/Con" slides
• Add screenshots for demo slides
• Use tables for comparison slides
• Add icons/emojis for visual interest

