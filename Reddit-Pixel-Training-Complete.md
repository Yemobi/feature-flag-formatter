# Reddit Pixel Implementation Training
## For Sales Teams & Client Success

**Session Duration:** 45-60 minutes  
**Target Audience:** Sales Teams, Account Managers, Client Success  
**Format:** Presentation + Live Demo + Q&A

---

## 📋 Session Outline

### Part 1: Foundation (10 min)
- What is the Reddit Pixel and why it matters
- Business value for advertisers
- Roles & responsibilities

### Part 2: Implementation Deep Dive (15 min)
- Base pixel code anatomy
- Event tracking structure
- Data layer & macros explained
- Manual vs GTM implementation

### Part 3: Live Demo (15 min)
- Step-by-step implementation walkthrough
- Real site example (Simple Store)
- Browser tools for validation

### Part 4: QA & Troubleshooting (10 min)
- QA checklist for sales teams
- Common misconfigurations
- When to escalate to Technical Solutions

### Part 5: Client Conversations (5 min)
- How to discuss pixel with clients
- Setting expectations
- Documentation handoff

---

# SLIDE DECK CONTENT

---

## SLIDE 1: Title Slide

**Reddit Pixel Implementation**  
**A Sales Team's Guide to Understanding, QA'ing, and Discussing Pixel Setup**

*Presented by: [Your Name]*  
*Date: [Date]*

---

## SLIDE 2: Session Objectives

**By the end of this session, you will be able to:**

✅ Explain how Reddit Pixel tracking works  
✅ Understand what code needs to be on which pages  
✅ Confidently QA a client's pixel implementation  
✅ Identify common setup issues before they impact campaigns  
✅ Know when to involve Technical Solutions  
✅ Have productive conversations with clients about pixel responsibility  

---

## SLIDE 3: Why Does This Matter?

**For Your Clients:**
- 📊 Track campaign ROI accurately
- 🎯 Build high-value retargeting audiences
- 💰 Optimize for conversions, not just clicks
- 📈 Scale campaigns with confidence

**For You (Sales):**
- 💪 Build trust through technical competency
- ⚡ Faster campaign launches (fewer delays)
- 🔄 Reduced back-and-forth with Tech Solutions
- 📞 Better client conversations

**Bottom Line:** Properly implemented pixels = better results = retained clients = renewals

---

## SLIDE 4: The Responsibility Framework

### **Who Does What?**

| Task | Advertiser Responsibility | Account Team (You!) | Tech Solutions Role |
|------|--------------------------|---------------------|---------------------|
| **Code Implementation** | ✅ Primary Owner | 📋 Share documentation | 📖 Create documentation |
| **Placing Code on Pages** | ✅ Their dev team | 🤝 Coordinate & follow up | 🛠️ Complex guidance |
| **Testing & Validation** | ✅ Initial testing | ✅ Basic QA (2-min check) | ✔️ Deep validation |
| **Fixing Issues** | ✅ Update their code | 🔍 Identify simple issues | 🔍 Diagnose complex issues |
| **Ongoing Maintenance** | ✅ Monitor events | 👀 Spot-check regularly | 🚨 Alert if critical issues |
| **Client Communication** | ❌ N/A | ✅ Primary contact | 📞 Technical escalations |

**Key Message:** *"Advertiser implements → Account Team guides & QAs → Tech Solutions handles complex scenarios"*

**Your Role:** You're the bridge between the advertiser and Tech Solutions. Handle the basics, escalate the complex stuff.

---

## SLIDE 4B: Why Clients Should Handle Implementation

### **Your Clients Have the Technical Capacity**

**Key Point:** *Advertisers running digital campaigns already have developers proficient in this type of work.*

**Reality Check:**
- 🏢 **They Already Manage Their Website** - If they built and maintain a website, they can implement tracking pixels
- 💻 **Standard Industry Practice** - Pixel implementation is a core requirement for any digital advertising (Google Ads, Facebook, TikTok, etc.)
- 🛠️ **Basic Web Development Skill** - Adding JavaScript snippets is fundamental web development
- 📋 **They've Done This Before** - Most clients have already implemented Google Analytics, Facebook Pixel, or other tracking codes

**This is NOT a complex technical request:**
- ✅ Copy-paste code snippets (no custom coding required)
- ✅ Industry-standard implementation method
- ✅ Well-documented with clear examples
- ✅ Similar to other pixels they've already implemented

**Client Conversation Script:**
> *"Your development team is already familiar with this type of implementation—it's similar to adding Google Analytics or Facebook Pixel. We provide comprehensive documentation and working examples. Once your team has it in place, we'll validate it's tracking correctly and help troubleshoot if needed."*

**Why This Matters:**
- Respects your client's existing technical capabilities
- Maintains appropriate service boundaries
- Ensures they can maintain and update their own tracking
- Focuses your time on strategy and campaign optimization, not basic code placement

---

## SLIDE 5: What is the Reddit Pixel?

**Definition:**  
A small piece of JavaScript code that tracks user actions on a website and sends that data to Reddit.

**Analogy:**  
Think of it like a security camera in a store:
- **Camera (Pixel):** Watches what happens
- **Recording (Events):** Saves important moments
- **Playback (Reporting):** Shows you what happened later

**Two Components:**
1. **Base Pixel Code** - Goes on every page (tracks page visits)
2. **Event Tracking Code** - Goes on specific pages (tracks actions)

---

## SLIDE 6: Base Pixel Code - The Foundation

**This code MUST be on EVERY page:**

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
- ❗ Must be in the `<head>` section
- ❗ Loads Reddit's pixel library
- ❗ Initializes with advertiser's unique Pixel ID
- ❗ Automatically tracks PageVisit event

**Why Every Page?**  
If it's missing from ANY page, we lose tracking continuity when users navigate there.

---

## SLIDE 7: Event Tracking - The Actions That Matter

**Standard E-commerce Events:**

| Event | When to Track | Page Example | Why It Matters |
|-------|---------------|--------------|----------------|
| **PageVisit** | Every page load | All pages | Audience building |
| **ViewContent** | Product view | Product detail page | Interest signals |
| **AddToCart** | Add to cart click | Product page | High intent |
| **Purchase** | Order complete | Thank you page | Conversion tracking |
| **SignUp** | Account creation | Registration page | Lead gen |
| **Lead** | Form submission | Contact form | B2B tracking |

**Remember:** More data = Better optimization + Better audiences

---

## SLIDE 8: Event Anatomy - What Goes in the Code?

**Example: AddToCart Event**

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

1. **itemId** → Track which products drive conversions
2. **itemPrice** → Calculate revenue and ROAS
3. **currency** → Support international advertisers
4. **Product details** → Build product-specific audiences

**Without this data:** Pixel fires but data is incomplete = Limited optimization

---

## SLIDE 9: Manual vs GTM Implementation

### **Manual Implementation (Hardcoded)**

**Pros:**
- ✅ Simple for static sites
- ✅ No additional tools needed
- ✅ Direct control
- ✅ Works on platforms like Neocities

**Cons:**
- ❌ Must edit HTML files directly
- ❌ Harder to update
- ❌ Developer required for changes

**Best For:** Small sites, Neocities, static HTML

---

### **GTM Implementation (Tag Manager)**

**Pros:**
- ✅ No code changes needed after GTM is installed
- ✅ Marketers can update tags
- ✅ Multiple pixels managed in one place
- ✅ Easy A/B testing

**Cons:**
- ❌ GTM must be installed first
- ❌ More complex setup
- ❌ Another tool to learn

**Best For:** Large sites, frequent changes, multiple marketing pixels

---

## SLIDE 10: Data Layer & Macros Explained

### **What is a Data Layer?**

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

**Purpose:** Separates data from tracking code

---

### **What are Macros?**

Placeholders that pull data dynamically:

```javascript
rdt('track', 'ViewContent', {
    itemId: '{{Product ID}}',        // Macro - replaced at runtime
    itemPrice: {{Product Price}}     // Macro - replaced at runtime
});
```

**Benefits:**
- One piece of code works for all products
- No hardcoding individual values
- Easier maintenance

---

## SLIDE 11: Why Structured Data is Critical

### **Scenario 1: Poor Data Structure** ❌

```javascript
rdt('track', 'Purchase', {
    value: 'seventy-nine dollars'    // String instead of number
});
```

**Result:**  
- ❌ Can't calculate ROAS
- ❌ Can't optimize for value
- ❌ Reporting breaks

---

### **Scenario 2: Good Data Structure** ✅

```javascript
rdt('track', 'Purchase', {
    value: 79.99,                    // Decimal number
    currency: 'USD',                 // Explicit currency
    transactionId: 'T-12345'         // Unique ID
});
```

**Result:**  
- ✅ Accurate revenue tracking
- ✅ Value-based optimization works
- ✅ Deduplication possible

---

## SLIDE 12: Common Misconfigurations (Part 1)

### **Issue #1: Pixel Only on Homepage**

**Symptom:** Events drop dramatically after first page  
**Cause:** Base pixel code missing from other pages  
**Fix:** Ensure base code is on ALL pages  

**How to Spot:** Check Event Manager - PageVisit count much lower than site traffic

---

### **Issue #2: Wrong Pixel ID**

**Symptom:** No events showing in Ads Manager  
**Cause:** Copy-paste error, using example ID  
**Fix:** Verify Pixel ID matches the one in Settings → Pixels  

**How to Spot:** Check browser console - look for 404 errors or "invalid pixel ID"

---

### **Issue #3: Events Fire Multiple Times**

**Symptom:** Double/triple event counts  
**Cause:** Pixel code duplicated on page or in GTM  
**Fix:** Search page source for `rdt('init'` - should appear once  

**How to Spot:** Event counts are 2x-3x expected traffic

---

## SLIDE 13: Common Misconfigurations (Part 2)

### **Issue #4: Event on Wrong Page**

**Symptom:** Purchase events fire on product page  
**Cause:** Event code placed incorrectly  
**Fix:** Move Purchase event to thank-you/success page only  

**How to Spot:** Test user journey - check when Purchase fires

---

### **Issue #5: Missing Product Data**

**Symptom:** Events fire but no product details  
**Cause:** Macros not configured or data layer empty  
**Fix:** Verify data layer has values before event fires  

**How to Spot:** Event shows in Reddit but no itemId or itemPrice

---

### **Issue #6: Test Pixel ID in Production**

**Symptom:** Events going to wrong account  
**Cause:** Developer left test pixel ID in code  
**Fix:** Replace with production Pixel ID  

**How to Spot:** Events show up in wrong Ads account or not at all

---

## SLIDE 14: Tools for Advertisers

### **What We Provide:**

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

## SLIDE 15: Tools for Sales Teams (Your QA Toolkit)

### **1. Browser Developer Tools (F12)**

**Network Tab:**
- Filter by "reddit" or "alb.reddit.com"
- See pixel requests in real-time
- Verify event data being sent

**Console Tab:**
- Check for JavaScript errors
- Verify data layer is populated
- See debug messages

---

### **2. Reddit Pixel Helper Extension**

**Download:** Chrome Web Store  
**Features:**
- Icon lights up when pixel detected
- Shows events as they fire
- Displays pixel ID and event parameters

**How to Use:**
1. Install extension
2. Visit client's site
3. Click extension icon
4. See real-time events

---

### **3. Reddit Ads Manager - Event Manager**

**Location:** Settings → Pixels → Your Pixel → Event Manager

**What You See:**
- Total events by type
- Last 24 hours of activity
- Data quality warnings

**Use During Calls:**
- Screen share Event Manager
- Show client their events
- Identify gaps together

---

## SLIDE 16: Sales Team QA Checklist

**Before Launching Campaigns, Verify:**

### ✅ **Setup Phase**
- [ ] Pixel ID created in Ads Manager
- [ ] Documentation shared with client
- [ ] Implementation approach agreed (manual vs GTM)

### ✅ **Implementation Phase**
- [ ] Base pixel code on ALL pages (check 3-5 random pages)
- [ ] Correct Pixel ID in code (not example/test ID)
- [ ] PageVisit events showing in Event Manager

### ✅ **Event Tracking Phase**
- [ ] ViewContent fires on product pages
- [ ] AddToCart fires when adding to cart
- [ ] Purchase fires on thank-you page ONLY
- [ ] Product data is included (itemId, itemPrice)

### ✅ **Validation Phase**
- [ ] Test purchase completed end-to-end
- [ ] Purchase event in Event Manager with correct value
- [ ] No duplicate events
- [ ] Events match expected user flow

---

## SLIDE 17: When to Involve Technical Solutions

### **You Can Handle:**
- ✅ Sharing implementation documentation
- ✅ Verifying pixel is installed
- ✅ Checking Event Manager for basic events
- ✅ Identifying obvious issues (missing pixel, wrong page)

### **Escalate to Tech Solutions When:**
- 🚨 Complex GTM setup with multiple tags
- 🚨 Data layer architecture questions
- 🚨 Server-side tracking requirements
- 🚨 Custom event specifications
- 🚨 Integration with third-party platforms
- 🚨 Persistent issues after advertiser has tried fixes
- 🚨 Cross-domain tracking needs

**Key Point:** You're the first line of support, Tech Solutions is the specialist.

---

## SLIDE 18: Having the Conversation with Clients

### **Setting Expectations (First Call):**

**What to Say:**
> "To track results from your Reddit campaigns, we'll need to implement our pixel on your site. This is a small piece of code that tracks when people view products, add to cart, and make purchases. Your development team is already familiar with this type of implementation—it's the same process as Google Analytics or Facebook Pixel. We'll provide you with comprehensive documentation and code examples, and your dev team will place it on the appropriate pages. Once it's in place, we can verify it together."

**Key Points:**
- ✅ Emphasize "your dev team implements" (they have the capability)
- ✅ Compare to familiar tools (reduces perceived complexity)
- ✅ Mention you'll provide documentation
- ✅ Offer to QA after implementation
- ✅ Set timeline expectations (allow 1-2 weeks)
- ✅ Acknowledge their existing technical proficiency

---

### **Following Up (After They Implement):**

**What to Say:**
> "I see the pixel is firing on your site - great work! Let me run through a quick test purchase to verify everything is tracking correctly. [Do test purchase] Perfect! I'm seeing the ViewContent, AddToCart, and Purchase events all coming through with the right product data. You're all set for launch."

**What You're Doing:**
- Builds confidence that it's working
- Validates their dev team's work
- Confirms readiness for campaign launch

---

## SLIDE 19: Real Example - Simple Store

**Let's look at an actual implementation:**

### **Site Structure:**
- Homepage (product listing)
- Product detail pages (2 products)
- Cart page
- Success page

### **Pixel Implementation:**
1. **Base pixel** on all 5 pages
2. **ViewContent** on homepage (product impressions)
3. **ViewContent** on product pages (single product)
4. **AddToCart** on product pages (button click)
5. **Purchase** on success page (order complete)

**Now let's see it in action...**

---

## SLIDE 20: Live Demo - Part 1 (Setup)

### **Demo Flow:**

**Step 1: Show the HTML Files**
- Open index.html in code editor
- Show base pixel in `<head>`
- Point out Pixel ID location

**Step 2: Show Event Tracking**
- Scroll to ViewContent event code
- Explain product data structure
- Show how it maps to site content

**Step 3: Open Site in Browser**
- Open browser with DevTools already open
- Network tab filtered to "reddit"
- Console tab visible

---

## SLIDE 21: Live Demo - Part 2 (Testing)

### **User Journey Walkthrough:**

**Action 1: Load Homepage**
- ✅ Show Reddit Pixel request in Network tab
- ✅ Point out PageVisit event
- ✅ Show product impression data

**Action 2: Click Product**
- ✅ Page loads → New PageVisit
- ✅ ViewContent fires with product details
- ✅ Show data in Network request

**Action 3: Add to Cart**
- ✅ AddToCart event fires
- ✅ Show product ID, name, price in payload
- ✅ Console confirms event

**Action 4: Checkout & Success**
- ✅ Cart PageVisit
- ✅ Success PageVisit
- ✅ Purchase event with transaction details

---

## SLIDE 22: Live Demo - Part 3 (Validation)

### **Open Reddit Ads Manager:**

**Navigate to:** Settings → Pixels → Event Manager

**Show:**
- Recent events (last 24 hours)
- Event counts by type
- Data quality indicators

**Point Out:**
- Events match our test journey
- Product data is present
- No errors or warnings

**Key Message:** "This is what good looks like"

---

## SLIDE 23: Quick QA During Client Calls

### **Screen Share Protocol:**

1. **Ask client to screen share their site**
2. **Open browser DevTools (F12)**
3. **Go to Network tab → Filter by 'reddit'**
4. **Refresh page**
5. **Look for Reddit pixel requests**

**If you see requests:** ✅ "Great, pixel is installed"  
**If no requests:** ❌ "Let's check if the code is on this page"

**Next:**
6. **Navigate to product page**
7. **Add item to cart**
8. **Check for AddToCart event**

**Takes 2 minutes, builds massive confidence.**

---

## SLIDE 24: Common Client Questions

### **Q: "How long does implementation take?"**

**A:** "Typically 1-2 weeks depending on your dev team's bandwidth. The code itself is straightforward - the timeline is usually about prioritization on your end."

---

### **Q: "Can you just do it for us?"**

**A:** "We provide the code and guidance, but it needs to be implemented by someone with access to your site's codebase. This ensures you maintain control and can make updates in the future. We're here to QA it once it's in place."

**Enhanced Response:**
"Your development team is already proficient in this type of work—they've built and maintained your website, so implementing tracking pixels is a standard task for them. This is similar to Google Analytics or Facebook Pixel, which most digital advertisers have already implemented. We provide comprehensive documentation with copy-paste code examples, and we'll validate everything once it's live to ensure it's tracking correctly."

**Why This Response Works:**
- ✅ Acknowledges their existing technical capability
- ✅ Compares to familiar tasks (reduces perceived complexity)
- ✅ Emphasizes your support role (documentation + QA)
- ✅ Maintains appropriate boundaries
- ✅ Shows respect for their dev team's competency

---

### **Q: "Do we need to install anything?"**

**A:** "No downloads or installations. It's JavaScript code that gets added to your site's HTML. Similar to Google Analytics or Facebook Pixel if you've set those up before."

---

### **Q: "Will it slow down our site?"**

**A:** "No. The pixel loads asynchronously, which means it doesn't block your page content from loading. It's designed for performance."

---

### **Q: "What if we use Shopify/WordPress/etc?"**

**A:** "Great! Most platforms have easy ways to add tracking code. We can provide platform-specific instructions or you can use Google Tag Manager if you prefer."

---

## SLIDE 25: Red Flags to Watch For

### **During Discovery/Scoping:**

🚩 **Client says:** "We'll implement it after the campaign launches"  
**Response:** "The pixel needs to be in place before launch so we can start building audiences and tracking results from day one."

---

🚩 **Client says:** "Our site is built on a proprietary platform"  
**Response:** "That's fine - as long as you can add JavaScript to the pages, the pixel will work. Let's get Tech Solutions involved to discuss any unique requirements."

---

🚩 **Client says:** "We have lots of pixels already, should we remove them?"  
**Response:** "No need to remove anything. Reddit Pixel works alongside other tracking pixels. Just make sure ours gets added too."

---

🚩 **Client says:** "We'll just copy the Facebook Pixel code and change it"  
**Response:** "Reddit Pixel has its own specific code structure. Let's use the documentation we provide to ensure it's set up correctly."

---

## SLIDE 26: Success Metrics for Pixel Implementation

### **What "Good" Looks Like:**

📊 **Event Volume:**
- PageVisit events > 100/day (depends on traffic)
- ViewContent showing for product pages
- AddToCart showing (typically 2-5% of ViewContent)
- Purchase events matching actual orders

📋 **Data Quality:**
- 90%+ events include product data
- Currency and prices are formatted correctly
- Transaction IDs are unique
- No duplicate events

⏱️ **Timeline:**
- Implementation completed before campaign launch
- QA done at least 1 week before first ad runs
- Audience building starts immediately

---

## SLIDE 27: Your Action Items

### **After This Training:**

**Week 1:**
- [ ] Bookmark Reddit Pixel documentation
- [ ] Install Reddit Pixel Helper browser extension
- [ ] Review your current pipeline - identify 2-3 upcoming deals needing pixel

**Week 2:**
- [ ] Practice QA flow on the Simple Store demo site
- [ ] Shadow a Tech Solutions QA call
- [ ] Add pixel discussion to your discovery template

**Ongoing:**
- [ ] Use QA checklist on every new implementation
- [ ] Share this deck with new team members
- [ ] Flag common issues to help improve documentation

---

## SLIDE 28: Resources & Support

### **Documentation:**
- 📖 [Reddit Pixel Installation Guide](https://business.reddithelp.com)
- 🎥 Implementation Video Tutorials
- 📋 Event Specification Reference

### **Tools:**
- 🔧 Reddit Pixel Helper (Chrome Extension)
- 💻 Simple Store Demo Site (for practice)
- ✅ QA Checklist Template

### **Internal Support:**
- 👥 Technical Solutions Team (Slack: #tech-solutions)
- 📧 Pixel Questions: pixel-support@reddit.com
- 📞 Weekly Office Hours: Fridays 2-3pm

### **This Deck:**
- 📎 Available on: [Internal Wiki Link]
- 🔄 Updated quarterly

---

## SLIDE 29: Key Takeaways

### **Remember:**

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

## SLIDE 30: Q&A

**Questions?**

---

## SLIDE 31: Practice Scenarios

### **Scenario 1:**
Client says their pixel is installed but you see no events in Event Manager after 48 hours. What do you check first?

<details>
<summary>Answer</summary>

1. Verify Pixel ID in their code matches Event Manager
2. Check if base pixel is on ALL pages (not just homepage)
3. Look at Network tab during site visit - are requests firing?
4. Check for JavaScript errors in Console tab
5. Confirm they're testing on production site, not staging
</details>

---

### **Scenario 2:**
Client implemented pixel last week. Purchase events are showing, but no product data (itemId, itemPrice) is included. What do you tell them?

<details>
<summary>Answer</summary>

"I can see your Purchase events are firing, which is great! However, we're not receiving the product details like item ID and price. This data is critical for building product-specific audiences and calculating ROAS. Could your dev team review the event tracking code and ensure the product data parameters are being passed? I can share a code example that shows the correct format."
</details>

---

### **Scenario 3:**
During a sales call, the client asks if they really need to implement the pixel before launch, or if they can add it later. How do you respond?

<details>
<summary>Answer</summary>

"While technically possible to add later, I strongly recommend implementing before launch for three reasons:

1. We can start building retargeting audiences from day one
2. Our optimization algorithms learn faster with conversion data from the start
3. You'll have accurate ROI data from your first dollar spent

If we wait, you'll miss that early data and it takes longer to see optimal performance. Most of our successful advertisers have the pixel ready before their first ad runs."
</details>

---

# LIVE DEMO SCRIPT

---

## Demo Setup (Before Presentation)

### **Prepare:**

1. Open Simple Store site in browser
2. Open browser DevTools (F12)
3. Position Network tab (filtered to "reddit")
4. Open Console tab in second tab
5. Have code editor open with index.html
6. Clear any existing cart data: `localStorage.clear()`
7. Have Reddit Ads Manager open in another browser tab → Event Manager visible
8. Install Reddit Pixel Helper extension (if available)

---

## Demo Part 1: Show the Code (5 min)

### **Script:**

"Let me show you what pixel implementation actually looks like on a real site. This is a simple e-commerce store we use for training.

**[Open index.html in code editor]**

First, let me show you the base pixel code. See here in the `<head>` section? This is what goes on every page:

**[Scroll to base pixel code]**

- This line loads Reddit's pixel library
- This line initializes it with the advertiser's unique Pixel ID
- This line fires the PageVisit event automatically

**[Scroll down to event tracking]**

Now down here at the bottom, we have event-specific tracking. This ViewContent event tracks when products are shown. See how it includes:
- Product ID
- Product name  
- Price

This structured data is what powers our optimization and audience building.

**[Switch to browser]**

Now let's see it in action..."

---

## Demo Part 2: User Journey (7 min)

### **Script:**

"I'm going to simulate what a real user does on this site. Watch the Network tab on the right - every time the pixel fires, you'll see a request to Reddit's servers.

**[Action: Load homepage]**

**[Point to Network tab]**

See that request? That's the base pixel firing. It sent a PageVisit event. And this next request is the ViewContent event with our product data.

**[Open Network request details]**

Look at the payload here - see the product array? That's the two products on this page.

**[Action: Click on "Premium Widget"]**

**[New page loads]**

Another PageVisit as the page loads. And here's another ViewContent, but this time for just one product - the Premium Widget.

**[Scroll down product page]**

Now let's add it to cart...

**[Action: Click "Add to Cart"]**

**[Point to Network tab]**

There! AddToCart event just fired. Let me show you what data was sent...

**[Open AddToCart request payload]**

- Item ID: product1
- Item name: Premium Widget  
- Price: 29.99
- Currency: USD

That's the structured data we talked about.

**[Action: Go to cart, click "Complete Purchase"]**

**[Success page loads]**

Final PageVisit, and watch for it... there's the Purchase event!

**[Open Purchase request payload]**

This one includes:
- Transaction ID (unique for every order)
- Total revenue
- All products in the order
- Quantities

This is what we use to calculate ROAS and attribute conversions to Reddit campaigns."

---

## Demo Part 3: Validation (3 min)

### **Script:**

"Now, in a real client scenario, you'd want to verify these events are showing up in Reddit Ads Manager.

**[Switch to Reddit Ads Manager tab]**

I'm in Event Manager now. This shows all events from the last 24 hours.

**[Point to event counts]**

See:
- PageVisit: 247 (every page load)
- ViewContent: 89 (product page views)
- AddToCart: 12 (people adding to cart)  
- Purchase: 3 (completed orders)

This funnel makes sense - not everyone who views will add to cart, and not everyone who adds to cart will purchase.

**[Point to data quality indicators]**

And see these checkmarks? That means product data is coming through correctly.

**[Point to recent events list]**

If I scroll down, I can see the specific events that just fired from our test, including the Purchase event with $29.99 value.

This is what good looks like. When you're QA'ing with a client, you want to see:
1. Events showing up
2. Counts make sense relative to site traffic  
3. Product data is present
4. No error warnings

If all that checks out, they're ready to launch campaigns."

---

# APPENDIX: QA CHECKLIST (Handout)

---

## Reddit Pixel QA Checklist for Sales Teams

**Client Name:** ___________________  
**Website:** ___________________  
**Pixel ID:** ___________________  
**QA Date:** ___________________  
**QA'd By:** ___________________

---

### ✅ PHASE 1: PIXEL INSTALLATION

**Base Pixel Code:**
- [ ] Pixel ID created in Reddit Ads Manager
- [ ] Base pixel code present in `<head>` of homepage
- [ ] Base pixel code present on at least 3 other random pages
- [ ] Correct Pixel ID (matches Ads Manager)
- [ ] No placeholder/test Pixel IDs (like t2_XXXXX)
- [ ] PageVisit events showing in Event Manager
- [ ] Event count aligns with site traffic

**Browser Validation:**
- [ ] Network tab shows requests to `alb.reddit.com`
- [ ] No JavaScript errors in Console
- [ ] Reddit Pixel Helper extension detects pixel (if available)

---

### ✅ PHASE 2: EVENT TRACKING

**ViewContent (Product Pages):**
- [ ] Fires on product detail pages
- [ ] Includes `itemId`
- [ ] Includes `itemName`
- [ ] Includes `itemPrice` (as decimal number)
- [ ] Includes `currency`

**AddToCart:**
- [ ] Fires when adding product to cart
- [ ] Fires only once per add (not multiple times)
- [ ] Includes product data (itemId, itemName, itemPrice)
- [ ] Quantity parameter present if adding multiple

**Purchase:**
- [ ] Fires ONLY on order confirmation/thank you page
- [ ] Does NOT fire on cart page
- [ ] Includes `transactionId` (unique per order)
- [ ] Includes `value` (total order value as decimal)
- [ ] Includes `currency`
- [ ] Includes `products` array with all items purchased

---

### ✅ PHASE 3: END-TO-END TESTING

**Test Purchase Flow:**
- [ ] Complete full test purchase on site
- [ ] All events fired in correct sequence:
  - [ ] ViewContent (product page)
  - [ ] AddToCart (add to cart)
  - [ ] PageVisit (cart page)
  - [ ] PageVisit (checkout pages)
  - [ ] Purchase (confirmation page)
- [ ] Purchase value in Event Manager matches order total
- [ ] No duplicate Purchase events
- [ ] Transaction ID visible in Event Manager

---

### ✅ PHASE 4: DATA QUALITY

**Product Data:**
- [ ] Product IDs are consistent (same format across events)
- [ ] Prices are decimal numbers (not strings like "$29.99")
- [ ] Currency codes are valid (USD, EUR, GBP, etc.)
- [ ] Product names don't have special characters causing issues

**Event Timing:**
- [ ] Events appear in Event Manager within 5 minutes of test
- [ ] Events in Event Manager match test actions performed
- [ ] No unexplained event spikes or drops

---

### ✅ PHASE 5: FINAL SIGN-OFF

**Campaign Readiness:**
- [ ] All priority events implemented and verified
- [ ] Client's dev team confirms implementation complete
- [ ] QA document shared with client for their records
- [ ] Escalated any complex issues to Technical Solutions (if applicable)
- [ ] Pixel is on production site (not staging environment)
- [ ] Client trained on how to check Event Manager themselves

**Launch Approval:**
- [ ] Sales rep approval: ___________________
- [ ] Tech Solutions approval (if required): ___________________

---

### 📝 NOTES:

Issues found:
_____________________________________________
_____________________________________________
_____________________________________________

Resolution:
_____________________________________________
_____________________________________________
_____________________________________________

Follow-up needed:
_____________________________________________
_____________________________________________
_____________________________________________

---

# APPENDIX: COMMON ISSUES REFERENCE GUIDE

---

## Issue #1: No Events Showing in Event Manager

**Symptoms:**
- Pixel installed 24+ hours ago
- No events in Event Manager
- Client says "it's installed"

**Diagnosis:**
1. Check Pixel ID in code vs. Ads Manager (copy-paste error?)
2. View page source - is pixel code actually there?
3. Check Network tab - are any Reddit requests firing?
4. Look for JavaScript errors blocking execution

**Common Causes:**
- Wrong Pixel ID (using example from documentation)
- Code only on homepage
- JavaScript error earlier on page breaking pixel
- Testing on staging site, pixel ID is for production
- Ad blocker preventing requests

**Resolution:**
1. Verify correct Pixel ID in code
2. Ensure pixel on all pages
3. Check JavaScript console for errors
4. Disable ad blockers for testing
5. Clear browser cache and retest

**Client Communication:**
> "I'm not seeing events in Event Manager yet. Let's do a quick check together - can you screen share your site? I'll walk you through verifying the pixel code is correctly installed."

---

## Issue #2: Events Fire Multiple Times

**Symptoms:**
- Event counts are 2x, 3x, or more than expected
- Single page load triggers multiple PageVisit events
- Single purchase creates multiple Purchase events

**Diagnosis:**
1. Search page source for `rdt('init'` - how many times does it appear?
2. Check if pixel is in both HTML and GTM
3. Look for pixel in header AND footer
4. Check if SPA (Single Page App) is re-firing events

**Common Causes:**
- Pixel code copied twice on page
- Pixel in both GTM and hardcoded
- Multiple GTM containers
- SPA framework triggering events on route changes

**Resolution:**
1. Remove duplicate pixel code
2. Choose ONE implementation method (manual OR GTM, not both)
3. For SPAs, implement proper event deduplication

**Client Communication:**
> "I'm seeing your events fire multiple times per action. This usually means the pixel code is on the page more than once - either copied twice or in both your HTML and tag manager. Let's find and remove the duplicate."

---

## Issue #3: Purchase Event Missing Product Data

**Symptoms:**
- Purchase event fires
- Value is present
- But products array is empty or missing

**Diagnosis:**
1. Check if data layer is populated before event fires
2. Verify macro syntax in GTM (if using GTM)
3. Look at Network request payload - is data being sent?

**Common Causes:**
- Event fires before data layer loads (timing issue)
- Macros not configured in GTM
- Data layer structure doesn't match macro path
- Hardcoded event without product loop

**Resolution:**
1. Add delay to ensure data loads first
2. Verify data layer structure matches macro references
3. Add product data to Purchase event code

**Client Communication:**
> "Your Purchase events are coming through, but we're not receiving the product details. This data is crucial for campaign optimization. Can your dev team review the Purchase event code and ensure the products array is being populated with the cart contents?"

---

## Issue #4: AddToCart Fires on Page Load

**Symptoms:**
- AddToCart fires when visiting product page
- Fires without user clicking "Add to Cart" button

**Diagnosis:**
1. Check if event code is in wrong location (not in click handler)
2. Verify event is inside button click function
3. Check for auto-triggering GTM tags

**Common Causes:**
- Event code outside of click handler function
- GTM trigger set to "Page Load" instead of "Click"
- Event code at bottom of page (fires immediately)

**Resolution:**
1. Move event code inside button click function
2. Update GTM trigger to "Click" on Add to Cart button
3. Test by visiting page without clicking - should NOT fire

**Client Communication:**
> "I'm seeing AddToCart events firing as soon as the product page loads, before anyone clicks the button. The event code needs to be inside the button's click handler so it only fires when someone actually adds to cart. This is an easy fix for your dev team."

---

## Issue #5: Wrong Currency or Price Format

**Symptoms:**
- Prices showing as "$29.99" (string) instead of 29.99 (number)
- Currency missing or incorrect
- ROAS calculations not working

**Diagnosis:**
1. Look at Network request payload
2. Check if price has dollar sign or commas
3. Verify currency is valid 3-letter code

**Common Causes:**
- Passing display price ("$29.99") instead of raw number
- Currency not specified
- Prices include commas (1,234.56)

**Resolution:**
1. Strip currency symbols and commas before sending
2. Use `parseFloat()` to convert to decimal
3. Add explicit currency parameter

**Example Fix:**
```javascript
// Bad
itemPrice: "$29.99"

// Good
itemPrice: 29.99
currency: "USD"
```

**Client Communication:**
> "The prices coming through have dollar signs which prevents our system from calculating ROAS correctly. Can your dev team format prices as decimal numbers (29.99) and add the currency parameter separately?"

---

## Issue #6: Base Pixel Only on Homepage

**Symptoms:**
- High PageVisit count on first visit
- Sharp drop in events after first page
- ViewContent and AddToCart counts very low

**Diagnosis:**
1. Check base pixel code on homepage ✓
2. Check base pixel code on product page ✗
3. Check base pixel code on cart page ✗

**Common Causes:**
- Dev only added to homepage
- Using page template that only applies to homepage
- Multi-page site with different templates

**Resolution:**
1. Add base pixel code to site-wide header template
2. Verify on ALL page types (homepage, product, category, cart, checkout, confirmation)

**Client Communication:**
> "Your pixel is working great on the homepage, but I'm not seeing events from other pages. The base pixel code needs to be on every page - typically this is done by adding it to your site's header template. Can your dev team ensure it's site-wide?"

---

# APPENDIX: CLIENT CONVERSATION TEMPLATES

---

## Template #1: Initial Pixel Discussion (Discovery Call)

**Situation:** Explaining pixel to new client for first time

**What to Say:**

"To accurately measure results from your Reddit campaigns and build effective retargeting audiences, we'll need to install the Reddit Pixel on your site. 

The pixel is a small piece of JavaScript code - similar to Google Analytics or Facebook Pixel if you've used those before - that tracks important customer actions like viewing products, adding to cart, and completing purchases.

Here's how the process typically works:

1. We'll provide you with implementation documentation and code examples
2. Your development team will add the code to the appropriate pages on your site
3. We'll test it together to ensure everything is tracking correctly
4. Once verified, you're ready to launch campaigns with full tracking

The whole process usually takes 1-2 weeks depending on your dev team's availability. Most of our advertisers find it straightforward - the code itself is simple, it's just a matter of prioritization on your end.

Does your team have experience implementing tracking pixels, or would you like us to schedule a call to walk your developers through it?"

---

## Template #2: Setting Implementation Expectations

**Situation:** Client asks if you can implement it for them

**What to Say:**

"I wish I could wave a magic wand and install it for you! However, the pixel needs to be implemented by someone with access to your site's codebase - that ensures you maintain control and can make updates in the future as needed.

What we do provide is:
- Step-by-step implementation documentation
- Code examples you can copy and paste
- Event specifications showing what to track on which pages
- A QA call once it's in place to verify everything is working
- Technical Solutions support if your team runs into complex scenarios

Think of it like this: we provide the blueprint, your team builds it, and we inspect it together to make sure it's solid. That way you're not dependent on us for any future updates or changes.

How does your team typically handle tracking pixel implementations? Have you set up Google Analytics or Facebook Pixel before?"

---

## Template #3: QA Call After Implementation

**Situation:** Client says pixel is installed, you're verifying it works

**What to Say:**

"Great! Let's verify everything is tracking correctly. Can you screen share your site?

[Client shares screen]

Perfect. I'm going to open the browser's developer tools - don't worry, this is just so we can see the pixel working in real-time. [Open DevTools, Network tab]

Now, can you refresh the page?

[Page refreshes]

Excellent! I can see the pixel fired - that's this request here to Reddit's servers. Your pixel is installed and working.

Now let's walk through a typical customer journey to make sure all the events are tracking:

1. Can you click on one of your products?
[ViewContent event fires - confirm]

2. Perfect, now add it to cart?
[AddToCart event fires - confirm]

3. Great! Now let's go through checkout...
[Walk through to success page, Purchase event fires]

Fantastic! All your events are firing correctly and the product data is coming through. Let me show you where you can see this in your Ads Manager...

[Screen share Event Manager, show events]

You're all set! The pixel is installed correctly and you're ready to launch campaigns with full conversion tracking. I'll send you a summary of what we verified today for your records."

---

## Template #4: Issue Found During QA

**Situation:** Testing reveals pixel is missing from some pages

**What to Say:**

"Good news: the pixel is working on your homepage. However, I'm noticing it's not firing on your product pages and cart page.

For full tracking, the base pixel code needs to be on every page of your site. Right now it looks like it's only on the homepage, which means we're losing visibility when customers navigate to other pages.

This is a super common thing - usually happens when the code was added to the homepage template but not the site-wide header.

Could your dev team add the pixel code to your global header template so it appears on all pages? Once that's done, we can retest together.

Everything else looks perfect - product data structure is correct, events are formatted properly. It's just a matter of getting the code on all pages.

Would you like me to send over the implementation guide again, or can your team handle it from here?"

---

## Template #5: Complex Setup - Escalate to Tech Solutions

**Situation:** Client has complex requirements beyond basic implementation

**What to Say:**

"Based on what you're describing - [complex scenario: server-side tracking / cross-domain / custom events / etc] - I think it makes sense to bring in our Technical Solutions team. They specialize in more complex pixel architectures and can provide detailed guidance on your specific setup.

I can set up a call with you, your dev team, and our Technical Solutions specialist. They'll be able to:
- Review your technical requirements
- Recommend the best implementation approach
- Provide detailed documentation for your specific use case
- Answer any technical questions your developers have

Once the implementation is done, I'll be back in the loop to verify everything is tracking correctly and get your campaigns launched.

Does a 30-minute technical consultation call work for your team? I can send a calendar invite with a few time options."

---

# END OF TRAINING MATERIALS

---

**Congratulations on completing the Reddit Pixel Implementation Training!**

You now have the knowledge and tools to confidently discuss, QA, and troubleshoot pixel implementations with clients.

**Remember:**
- You're the first line of support
- Basic QA is within your wheelhouse
- Complex scenarios get escalated
- Technical competence builds client trust

**Questions or need support?**  
Reach out to Technical Solutions team or refer back to this training deck.

---

**Training Version:** 1.0  
**Last Updated:** January 2026  
**Created For:** Reddit Sales Teams  
**Maintained By:** Technical Solutions & Sales Enablement

