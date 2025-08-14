# DNS Configuration for Email Deliverability

## 🚨 **Critical: Your emails are going to spam because of missing DNS records**

To fix email deliverability issues, you need to add these DNS records to your domain `royalroutestours.com`:

## **1. SPF Record (Sender Policy Framework)**
Add this TXT record to your DNS:
```
Type: TXT
Name: @ (or leave blank)
Value: v=spf1 include:_spf.resend.com ~all
TTL: 3600
```

## **2. DKIM Record (DomainKeys Identified Mail)**
You need to get this from Resend:
1. Go to your Resend dashboard
2. Navigate to Domains
3. Add your domain `royalroutestours.com`
4. Resend will provide you with DKIM records to add

## **3. DMARC Record (Domain-based Message Authentication)**
Add this TXT record:
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@royalroutestours.com; ruf=mailto:dmarc@royalroutestours.com; sp=quarantine; adkim=r; aspf=r;
TTL: 3600
```

## **4. MX Record (Mail Exchange)**
```
Type: MX
Name: @ (or leave blank)
Value: 10 mx.resend.com
TTL: 3600
```

## **5. Additional Records for Better Deliverability**

### **PTR Record (Reverse DNS)**
Contact your hosting provider to set up reverse DNS for your domain.

### **TXT Records for Email Authentication**
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com include:_spf.google.com ~all
TTL: 3600
```

## **Steps to Implement:**

1. **Log into your domain registrar** (where you bought royalroutestours.com)
2. **Find DNS management** or DNS settings
3. **Add the records above**
4. **Wait 24-48 hours** for propagation
5. **Test email deliverability**

## **Testing Your Setup:**

### **Use these tools to verify:**
- [MXToolbox](https://mxtoolbox.com/SuperTool.aspx) - Check SPF, DKIM, DMARC
- [Mail-Tester](https://www.mail-tester.com/) - Test email deliverability
- [Google Postmaster Tools](https://postmaster.google.com/) - Monitor deliverability

### **Expected Results:**
- ✅ SPF: PASS
- ✅ DKIM: PASS  
- ✅ DMARC: PASS
- ✅ No spam flags

## **Additional Recommendations:**

### **1. Use a Professional Email Address**
Instead of `noreply@royalroutestours.com`, use:
- `info@royalroutestours.com`
- `hello@royalroutestours.com`
- `support@royalroutestours.com`

### **2. Warm Up Your Domain**
- Start with low email volume
- Gradually increase over 2-4 weeks
- Monitor deliverability metrics

### **3. Content Best Practices**
- Avoid spam trigger words
- Use proper HTML structure
- Include unsubscribe links
- Keep image-to-text ratio balanced

### **4. Monitor and Maintain**
- Check deliverability regularly
- Monitor bounce rates
- Keep DNS records updated
- Use email authentication tools

## **Quick Fix for Immediate Results:**

If you can't set up DNS immediately, use Resend's verified domains:
```typescript
// In src/lib/resend.ts
export const DEFAULT_FROM_EMAIL = "onboarding@resend.dev" // Temporary fix
```

This will work immediately but won't have your branding.

## **Priority Actions:**

1. **HIGH**: Add SPF record immediately
2. **HIGH**: Set up DKIM with Resend
3. **MEDIUM**: Add DMARC record
4. **LOW**: Optimize email content

After implementing these DNS records, your email deliverability should improve significantly!
