# Quick Reference: Pixel Implementation Boundaries
## One-Page Guide for Sales Teams

---

## 🎯 The Golden Rule

**Clients have developers proficient in implementing tracking pixels.**  
*They built their website → They can add JavaScript code*

---

## ✅ What You DO

| Action | Time Investment | Your Role |
|--------|----------------|-----------|
| **Share Documentation** | 2 min | Send comprehensive guides |
| **Brief Walkthrough** | 5-10 min (optional) | Explain doc structure |
| **QA After Implementation** | 2-5 min | Verify events firing correctly |
| **Answer Simple Questions** | As needed | Point to specific doc sections |
| **Escalate Complex Issues** | As needed | Connect with Tech Solutions |

---

## ❌ What You DON'T DO

- ❌ Jump on technical implementation calls
- ❌ Place code on their website
- ❌ Debug their codebase
- ❌ Write custom code for them
- ❌ Take ownership of their implementation

**Why?** Because their developers are already capable—this is standard work for any team that maintains a website.

---

## 💬 Client Conversation Scripts

### "Can you just do it for us?"

> "Your development team is already proficient in this—they've implemented Google Analytics or Facebook Pixel before, right? Reddit Pixel works the same way. We provide comprehensive documentation with copy-paste code examples. Once your team has it in place, I'll validate it's tracking correctly and help troubleshoot if needed."

### Initial Conversation

> "We'll need to implement our pixel to track results. Your dev team is already familiar with this type of implementation—it's the same process as Google Analytics. We'll provide documentation and code examples. Once it's live, we'll verify it together. Typically takes 1-2 weeks depending on your team's bandwidth."

### "How long will this take?"

> "The code itself is straightforward—typically 1-2 weeks depending on your dev team's priorities. It's similar complexity to adding Google Analytics."

---

## 🚦 Escalation Guide

### ✅ Handle Yourself (Basic Support)
- Questions about documentation
- "Where does this code go?"
- QA validation after implementation
- Identifying simple issues (pixel not firing, wrong page)

### 🚨 Escalate to Tech Solutions
- Complex GTM setups
- Server-side tracking
- Custom event architectures
- Cross-domain tracking
- Unusual CMS/platform requirements
- Persistent issues after multiple attempts

---

## 🎓 Why This Approach Works

### For Clients:
✅ Maintains their codebase ownership  
✅ Builds internal capability  
✅ Their dev knows their architecture best  

### For You:
✅ Scales across many clients  
✅ Focuses your time on strategy  
✅ Maintains professional boundaries  

### For The Relationship:
✅ Respects their technical capacity  
✅ Positions you as strategic partner  
✅ Sets healthy support expectations  

---

## 📊 2-Minute QA Checklist

After client implements, validate on a quick screen share:

1. ✅ Open their site in browser
2. ✅ Open DevTools (F12) → Network tab
3. ✅ Filter by "reddit"
4. ✅ Navigate through: Homepage → Product → Add to Cart
5. ✅ Check that Reddit Pixel requests appear
6. ✅ Verify event names are correct (ViewContent, AddToCart, etc.)

**If it works:** "Perfect! You're all set for launch."  
**If issues found:** "I see [specific issue]. In the documentation, check the section on [topic]. Let me know once you've made the update."

---

## 📚 Resources to Share

Always have these ready to send:

- `REDDIT-PIXEL-IMPLEMENTATION-GUIDE.md` - Non-technical, step-by-step
- `GTM-SETUP-GUIDE.md` - For GTM users
- `Simple-Store-Manual-Pixel/` - Working code examples
- Browser extension for validation

---

## 🔑 Key Talking Points

**When clients push back:**

1. **"This is standard practice"**
   - Every digital advertiser implements their own pixels (Google, Facebook, TikTok, etc.)

2. **"Your team is already capable"**
   - They built and maintain your website, so they can add tracking code

3. **"We provide excellent documentation"**
   - Step-by-step guides with copy-paste examples

4. **"We'll QA and support"**
   - Once it's live, we validate and help troubleshoot

5. **"It's about ownership"**
   - Ensures you can maintain and update it going forward

---

## ⚡ Quick Stats

- **Documentation provided:** ✅ Comprehensive guides
- **Code examples:** ✅ Multiple working demos
- **Your time investment:** 5-10 minutes per client
- **Their dev time:** 2-4 hours (spread across 1-2 weeks)
- **Typical implementation:** Standard for any digital advertiser

---

## 🎯 Remember

> **Your role: Guide → Validate → Support**  
> **Not: Implement → Own → Maintain**

Clients have the capability. Respect it. Support it. Don't replace it.

---

**Need more details?** See `WHY-NO-IMPLEMENTATION-CALLS.md`  
**Complex issue?** Escalate to Technical Solutions  
**Training needed?** Review `Reddit-Pixel-Training-Complete.md`



