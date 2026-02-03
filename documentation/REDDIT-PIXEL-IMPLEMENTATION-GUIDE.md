# Reddit Pixel Implementation Guide
## For Sales and Marketing Teams

### Overview
This guide will help you set up Reddit Pixel tracking for conversion events using Google Tag Manager. **No coding required!** This is a step-by-step guide designed for non-technical users.

---

## What is the Reddit Pixel?

The Reddit Pixel is a tracking code that helps you:
- Measure conversions from Reddit ads
- Build retargeting audiences
- Optimize ad campaigns based on user behavior
- Track ROI from Reddit advertising

---

## Prerequisites

Before starting, you'll need:
1. **Reddit Ads account** with Pixel created ([ads.reddit.com](https://ads.reddit.com))
2. **Reddit Pixel ID** (looks like: `t2_abc123xyz`)
3. **Google Tag Manager access** (already installed on your website)
4. **Admin or Publish permissions** in GTM

---

## Part 1: Get Your Reddit Pixel ID

### Step 1: Log into Reddit Ads
1. Go to [ads.reddit.com](https://ads.reddit.com)
2. Log in with your Reddit Ads account

### Step 2: Find Your Pixel
1. Click on **"Pixels"** in the left sidebar
2. If you don't have a pixel yet:
   - Click **"Create Pixel"**
   - Give it a name (e.g., "Simple Shop Pixel")
   - Click **"Create"**

### Step 3: Copy Your Pixel ID
1. Find your pixel in the list
2. Copy the **Pixel ID** (format: `t2_abc123xyz`)
3. Keep this ID handy - you'll need it in GTM

---

## Part 2: Set Up Reddit Pixel in Google Tag Manager

### Step 1: Access Google Tag Manager
1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Select your website's container
3. Click **"Submit"** to ensure you're in the workspace

### Step 2: Create a New Tag for Reddit Pixel Base Code

**This tag loads the Reddit Pixel on every page.**

1. Click **"Tags"** in the left sidebar
2. Click **"New"** button
3. Click on the tag configuration area (where it says "Tag Configuration")
4. Search for and select **"Reddit Ads"** or **"Reddit Pixel"**
   - If you don't see it, select **"Discover more tag types in the Community Template Gallery"**
   - Search for "Reddit Pixel" and add the template

5. **Configure the tag:**
   - **Tag Name**: "Reddit Pixel - Base Code"
   - **Pixel ID**: Paste your Reddit Pixel ID (`t2_abc123xyz`)
   - **Event Type**: Select **"PageVisit"**

6. **Set the trigger:**
   - Click on "Triggering" section
   - Select **"All Pages"** trigger
   - This ensures the pixel loads on every page

7. Click **"Save"**

---

### Step 3: Create Tag for Purchase Conversions

**This tag fires when someone completes a purchase.**

1. Click **"Tags"** → **"New"**
2. Name it: "Reddit Pixel - Purchase"
3. Tag Configuration: Select **"Reddit Ads"** or **"Reddit Pixel"**

4. **Configure the tag:**
   - **Pixel ID**: Same as before (`t2_abc123xyz`)
   - **Event Type**: Select **"Purchase"** or **"Custom"**
     - If "Purchase" option exists, use it
     - If not, select "Custom" and enter event name: `Purchase`

5. **Add conversion value** (optional but recommended):
   - Look for fields like "Value" or "Revenue"
   - Enter: `{{ecommerce.purchase.actionField.revenue}}`
   - Currency: `USD`

6. **Set the trigger:**
   - Click "Triggering"
   - Click the **"+"** icon to create a new trigger
   - **Trigger Configuration**:
     - Name: "Purchase Event"
     - Type: **"Custom Event"**
     - Event name: `purchase`
     - This trigger fires on: **"All Custom Events"**
   - Click **"Save"**

7. Click **"Save"** on the tag

---

### Step 4: (Optional) Create Tag for Add to Cart Events

**Track when users add products to cart.**

1. Click **"Tags"** → **"New"**
2. Name it: "Reddit Pixel - Add to Cart"
3. Tag Configuration: Select **"Reddit Ads"** or **"Reddit Pixel"**

4. **Configure the tag:**
   - **Pixel ID**: Your Reddit Pixel ID
   - **Event Type**: Select **"AddToCart"** or **"Custom"**
     - If using "Custom", enter: `AddToCart`

5. **Set the trigger:**
   - Create new trigger named "Add to Cart Event"
   - Type: **"Custom Event"**
   - Event name: `addToCart`

6. Click **"Save"**

---

### Step 5: (Optional) Create Tag for Product Views

**Track when users view product detail pages.**

1. Click **"Tags"** → **"New"**
2. Name it: "Reddit Pixel - View Content"
3. Tag Configuration: Select **"Reddit Ads"** or **"Reddit Pixel"**

4. **Configure the tag:**
   - **Pixel ID**: Your Reddit Pixel ID
   - **Event Type**: Select **"ViewContent"** or **"Custom"**
     - If using "Custom", enter: `ViewContent`

5. **Set the trigger:**
   - Create new trigger named "Product View Event"
   - Type: **"Custom Event"**
   - Event name: `productView`

6. Click **"Save"**

---

## Part 3: Test Your Setup

### Step 1: Use GTM Preview Mode

1. In GTM, click the **"Preview"** button (top right)
2. Enter your website URL
3. Click **"Connect"**
4. A new tab opens with your website in debug mode

### Step 2: Test Each Event

**Test PageVisit:**
1. Load any page on your site
2. In the GTM Debug panel, look for "Reddit Pixel - Base Code"
3. It should show as "Fired" (green)

**Test Purchase:**
1. Add a product to cart
2. Go to cart and click "Proceed to Checkout"
3. You'll be taken to the success page
4. In the GTM Debug panel, look for "Reddit Pixel - Purchase"
5. Verify it shows as "Fired"

**Test Add to Cart (if set up):**
1. Go to a product page
2. Click "Add to Cart"
3. Check GTM Debug panel for "Reddit Pixel - Add to Cart"
4. Should show as "Fired"

### Step 3: Verify in Reddit Ads

1. Go back to Reddit Ads Manager
2. Navigate to **"Pixels"**
3. Click on your pixel
4. Check the **"Activity"** tab
5. You should see recent events (may take a few minutes to appear)

---

## Part 4: Publish Your Changes

Once testing is complete:

1. Exit Preview Mode (click the red "X" in the preview banner)
2. In GTM, click **"Submit"** button (top right)
3. Add a **Version Name**: "Reddit Pixel Implementation"
4. Add a **Version Description**: "Added Reddit Pixel with Purchase, AddToCart, and ViewContent events"
5. Click **"Publish"**

**🎉 Your Reddit Pixel is now live!**

---

## Understanding Your Tags

Here's a summary of what you've set up:

| Tag Name | What It Tracks | When It Fires |
|----------|---------------|---------------|
| Reddit Pixel - Base Code | Page views | Every page load |
| Reddit Pixel - Purchase | Conversions/Sales | Success page after checkout |
| Reddit Pixel - Add to Cart | Cart additions | When user adds product to cart |
| Reddit Pixel - View Content | Product views | Product detail pages |

---

## Troubleshooting

### Issue: Tags not firing

**Solution:**
1. Check that Preview Mode is active
2. Verify trigger names match exactly (case-sensitive)
3. Ensure GTM container is published

### Issue: Events not showing in Reddit Ads

**Solution:**
1. Wait 10-15 minutes for data to appear
2. Verify Pixel ID is correct
3. Check that tags fired successfully in Preview Mode
4. Clear browser cache and test again

### Issue: Can't find Reddit Pixel template in GTM

**Solution:**
1. In tag configuration, scroll down to "Discover more tag types in the Community Template Gallery"
2. Search for "Reddit Pixel" or "Reddit Ads"
3. If still not found, contact your GTM administrator or developer

### Issue: Conversion values not tracking

**Solution:**
1. Edit the Purchase tag
2. Ensure value field is set to: `{{ecommerce.purchase.actionField.revenue}}`
3. Double-check that the field name is correct in your template
4. Save and republish

---

## Using Reddit Pixel Data for Ads

### Creating Conversion Events in Reddit Ads

1. Go to Reddit Ads Manager
2. Click **"Pixels"** → select your pixel
3. Click **"Conversion Events"** tab
4. Click **"Create Conversion Event"**
5. Select event type (e.g., "Purchase")
6. Set conversion window (recommended: 7 days)
7. Add to your ad campaigns

### Building Retargeting Audiences

1. In Reddit Ads, go to **"Audiences"**
2. Click **"Create Audience"**
3. Select **"Pixel-based"**
4. Choose your pixel
5. Set rules:
   - **Example**: "Include people who viewed a product but didn't purchase in last 30 days"
   - Events: `ViewContent` AND NOT `Purchase`
   - Time window: 30 days

### Optimizing Campaigns

- Use Purchase events for **Conversion campaigns**
- Use AddToCart events for **Retargeting mid-funnel users**
- Use ViewContent events for **Broad retargeting**
- Set up **Custom Audiences** based on pixel events
- Track **ROI** using conversion values

---

## Best Practices

1. **Always test in Preview Mode** before publishing
2. **Wait 24-48 hours** after setup before making campaign decisions (data needs to populate)
3. **Check pixel activity weekly** to ensure it's still firing correctly
4. **Document changes** in GTM (use version descriptions)
5. **Coordinate with your team** before making changes to live tags

---

## Getting Help

### Resources

- **Reddit Ads Help**: [reddit.com/help/ads](https://www.reddit.com/help/ads)
- **GTM Documentation**: [support.google.com/tagmanager](https://support.google.com/tagmanager)
- **Reddit Pixel Guide**: Search "Reddit Pixel setup" in Reddit Ads Help Center

### Need Technical Help?

If you encounter issues:
1. Take screenshots of your GTM setup
2. Note the exact error messages
3. Record what you were doing when the issue occurred
4. Contact your web developer or GTM administrator
5. Provide them with this guide

---

## Summary Checklist

Before you finish, make sure:

- [ ] Reddit Pixel ID copied from Reddit Ads
- [ ] Base Code tag created and set to "All Pages"
- [ ] Purchase tag created with "purchase" event trigger
- [ ] (Optional) AddToCart tag created
- [ ] (Optional) ViewContent tag created
- [ ] All tags tested in Preview Mode
- [ ] Events verified in Reddit Ads Activity
- [ ] Changes published in GTM
- [ ] Team notified of implementation

---

**Congratulations!** You've successfully implemented Reddit Pixel tracking. Your Reddit ads can now track conversions and build powerful retargeting audiences.

---

**Last Updated**: January 2026  
**Version**: 1.0  
**Guide Type**: Non-Technical / Sales Team
