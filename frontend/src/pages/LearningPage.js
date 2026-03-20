/**
 * Learning Hub Page
 * Cybersecurity articles, tutorials, and awareness content
 */

import React, { useState } from 'react';
import { BookOpen, Search, Clock, ChevronRight, Tag, ArrowLeft } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'How to Identify eSewa & Khalti Phishing Pages',
    category: 'Phishing',
    readTime: '5 min',
    difficulty: 'Beginner',
    summary: 'Learn to spot fake eSewa and Khalti pages that steal your credentials and money.',
    content: `
## What is eSewa/Khalti Phishing?

Cybercriminals create fake websites that look identical to eSewa or Khalti's official pages. When you enter your login credentials, they steal them and drain your account.

## How to Spot a Fake Page

**1. Check the URL Carefully**
- Official eSewa: https://esewa.com.np
- Fake example: http://esewa-verify.tk/login or http://n3pal-esewa.com
- Always look for HTTPS and the correct domain name

**2. Look for These Red Flags**
- HTTP instead of HTTPS
- Misspelled domain names (es3wa, eSawa, eSewa.verify)
- Free domains (.tk, .ml, .ga)
- Pressure messages like "Your account will be blocked"

**3. Safe Practices**
- Bookmark the official app links
- Never click links from Viber/WhatsApp messages claiming to be eSewa
- Use the official mobile app, not browser links
- Enable transaction PIN in your eSewa app

## What to Do If You're Targeted
1. Don't enter any credentials
2. Close the page immediately
3. Report it using CyberShield Nepal's Report Tool
4. Change your password from the official app immediately
    `,
    tags: ['esewa', 'khalti', 'phishing', 'nepal']
  },
  {
    id: 2,
    title: 'Top 10 Cyber Scams Targeting Nepalis in 2024',
    category: 'Awareness',
    readTime: '8 min',
    difficulty: 'Beginner',
    summary: 'A comprehensive guide to the most common digital scams targeting people in Nepal.',
    content: `
## The Cyber Threat Landscape in Nepal

Nepal has seen cybercrime increase by over 300% in recent years. Here are the top 10 scams you need to know about:

**1. Fake Job Offer Scams**
You receive a WhatsApp/Viber message offering a high-paying job in Malaysia, Qatar, or Dubai. They ask for a "processing fee" or your passport details.

**2. Prize/Lottery Scams**
"Congratulations! You won NPR 5,00,000!" These messages are always fake. No legitimate lottery contacts winners via SMS or Facebook.

**3. Fake eSewa/Khalti Pages**
Phishing websites that mimic Nepal's popular digital wallets to steal login credentials.

**4. Loan Scam Apps**
Fake loan apps that demand access to your contacts and photos, then blackmail you.

**5. Investment/Crypto Fraud**
Promises of doubling your money through fake cryptocurrency platforms.

**6. Fake Government Notifications**
SMS or emails claiming to be from Nepal Police, NTC, or government offices.

**7. Romance Scams**
Fake relationships built on social media, then money requests for "emergencies."

**8. Tech Support Scams**
"Your computer has a virus! Call this number immediately."

**9. Delivery Scams**
Fake parcel delivery notifications asking for payment or personal details.

**10. Social Media Account Hacking**
Phishing links sent through friend's compromised accounts.

## How to Stay Safe
- Verify before you trust: call the official number
- Never share OTPs with anyone
- Use 2FA on all accounts
- Report suspicious activity immediately
    `,
    tags: ['scams', 'awareness', 'nepal', 'fraud']
  },
  {
    id: 3,
    title: 'Creating Strong Passwords: A Nepal-Specific Guide',
    category: 'Password Security',
    readTime: '4 min',
    difficulty: 'Beginner',
    summary: 'Practical password tips that work for Nepali banking apps, social media, and digital wallets.',
    content: `
## Why Password Security Matters in Nepal

With millions of Nepalis now using eSewa, Khalti, mobile banking, and social media, weak passwords have become a serious vulnerability.

## Common Weak Passwords Used in Nepal
- nepal123
- kathmandu
- namaskar
- [your phone number]
- [your birth date]

**If your password is on this list — CHANGE IT NOW.**

## The Passphrase Method (Best for Nepali Users)
Instead of a complex password that's hard to remember, use a passphrase:

❌ Hard to remember: Tr0ub4dor&3
✅ Easy and strong: BlueMoon$Kathmandu#2024

A passphrase is:
- 4+ random words
- Mixed with numbers and symbols
- Easy to remember, hard to crack

## Password Rules for Different Accounts

| Account Type | Minimum Length | Special Characters | 2FA Required? |
|---|---|---|---|
| Banking App | 12+ | Yes | Mandatory |
| eSewa/Khalti | 12+ | Yes | Strongly Recommended |
| Email | 10+ | Yes | Strongly Recommended |
| Social Media | 8+ | Yes | Recommended |

## Password Manager Recommendations
- Bitwarden (Free, Open Source)
- 1Password (Paid but excellent)
- Google Password Manager (Built-in, free)

Never write passwords on paper or save them in WhatsApp notes.
    `,
    tags: ['password', 'security', 'tips']
  },
  {
    id: 4,
    title: 'What to Do If Your Account Gets Hacked',
    category: 'Incident Response',
    readTime: '6 min',
    difficulty: 'Intermediate',
    summary: 'Step-by-step guide to recovering from a hacked account and preventing future incidents.',
    content: `
## Immediate Steps When You're Hacked

### In the First 15 Minutes:
1. **Try to regain access** — Use "Forgot Password" from the official website
2. **Change your password** from a secure device
3. **Log out all other sessions** (available in account settings)
4. **Check recovery options** — ensure your recovery email/phone is still yours

### For Financial Accounts (eSewa, Khalti, Bank):
1. **Call your bank/service immediately** — note the official number before you need it
2. **Freeze/lock your account** if the option exists
3. **Check recent transactions** and dispute unauthorized ones
4. **File a police report** at your local cyber bureau

### For Social Media (Facebook, Instagram):
1. Report the compromise to the platform
2. Warn your friends not to respond to suspicious messages from your account
3. Review all apps connected to your account and remove unknown ones

## Report to Authorities in Nepal
- Nepal Police Cyber Bureau: 01-4412873
- Nepal Telecom Fraud: 1498
- NIC Asia/Banking: Contact your bank's 24/7 helpline

## After Recovery: Prevention Steps
1. Enable 2-Factor Authentication on everything
2. Use unique passwords for every account
3. Set up login alerts/notifications
4. Regularly audit which devices are logged in
5. Never use the same password for eSewa and social media
    `,
    tags: ['hacking', 'recovery', 'incident response']
  },
  {
    id: 5,
    title: 'Safe Online Banking in Nepal',
    category: 'Banking Security',
    readTime: '7 min',
    difficulty: 'Beginner',
    summary: 'Best practices for using mobile banking and digital wallets safely in Nepal.',
    content: `
## Nepal's Digital Banking Landscape

Nepal has rapidly adopted digital payments — eSewa, Khalti, Connect IPS, and mobile banking apps are now mainstream. This convenience also attracts cybercriminals.

## Golden Rules of Safe Digital Banking

### 1. Use Official Apps Only
- Download ONLY from Google Play Store or Apple App Store
- Check the developer name — fake apps often have slightly different names
- Look at reviews and download count before installing

### 2. Never Share These With Anyone
- OTP (One-Time Password)
- Transaction PIN
- CVV number
- Internet banking password
- Even bank employees NEVER ask for these

### 3. Use Secure Networks
- Avoid banking on public WiFi (tea shops, airports, hotels)
- Use mobile data (4G) for financial transactions
- If using WiFi, ensure you're on a trusted home/office network

### 4. Enable All Security Features
- Transaction PINs
- Biometric authentication
- Transaction limits
- Login notifications/SMS alerts

### 5. Verify Before Scanning QR Codes
- Fraudsters place fake QR codes over legitimate ones
- Always verify the merchant name before confirming payment
- Be suspicious if a "QR code" asks you to enter a PIN to receive money

## If You Suspect Fraud
Contact Nepal Rastra Bank's complaint line: 01-4419804
    `,
    tags: ['banking', 'digital wallet', 'esewa', 'connect ips']
  },
  {
    id: 6,
    title: 'Understanding Two-Factor Authentication (2FA)',
    category: 'Account Security',
    readTime: '5 min',
    difficulty: 'Beginner',
    summary: 'Why 2FA is your best defense and how to set it up on popular platforms used in Nepal.',
    content: `
## What is Two-Factor Authentication?

2FA adds a second layer of security beyond your password. Even if a hacker gets your password, they cannot access your account without the second factor.

## Types of 2FA

### SMS-based 2FA (Most Common in Nepal)
- A code is sent to your phone number
- Better than no 2FA, but can be intercepted via SIM swapping
- Used by: most Nepali banks, eSewa

### Authenticator Apps (Most Secure)
- Google Authenticator, Authy, or Microsoft Authenticator
- Generates time-based codes offline
- Immune to SIM swapping attacks
- Recommended for: Google, Facebook, banking

### Biometric (Fingerprint/Face)
- Built into most modern smartphones
- Convenient and secure
- Used in: Khalti, many banking apps

## How to Enable 2FA on Key Platforms

**Facebook:**
Settings → Security and Login → Two-Factor Authentication → Turn On

**Google:**
myaccount.google.com → Security → 2-Step Verification → Get Started

**eSewa:**
Login → Profile → Security → Enable Transaction PIN

## Why This Matters in Nepal
SIM swapping fraud (where criminals trick NTC/Ncell into transferring your number) is growing in Nepal. Authenticator apps protect you even in this scenario.
    `,
    tags: ['2fa', 'authentication', 'account security']
  }
];

const categories = ['All', 'Phishing', 'Awareness', 'Password Security', 'Incident Response', 'Banking Security', 'Account Security'];

const difficultyColor = {
  Beginner: '#22c55e',
  Intermediate: '#f59e0b',
  Advanced: '#ef4444'
};

const LearningPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch = !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some(t => t.includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  // Article detail view
  if (selectedArticle) {
    return (
      <div className="page-container">
        <button className="back-btn" onClick={() => setSelectedArticle(null)}>
          <ArrowLeft size={18} /> Back to Learning Hub
        </button>
        <div className="article-detail">
          <div className="article-detail-meta">
            <span className="article-cat-badge">{selectedArticle.category}</span>
            <span className="article-time"><Clock size={14} /> {selectedArticle.readTime} read</span>
            <span
              className="article-difficulty"
              style={{ color: difficultyColor[selectedArticle.difficulty] }}
            >
              {selectedArticle.difficulty}
            </span>
          </div>
          <h1 className="article-detail-title">{selectedArticle.title}</h1>
          <div className="article-tags">
            {selectedArticle.tags.map(t => (
              <span key={t} className="article-tag"><Tag size={12} /> {t}</span>
            ))}
          </div>
          <div className="article-body">
            {selectedArticle.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
              if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>;
              if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} className="article-bold-line">{line.replace(/\*\*/g, '')}</strong>;
              if (line.startsWith('- ')) return <li key={i}>{line.replace('- ', '')}</li>;
              if (line.startsWith('1. ') || line.match(/^\d+\. /)) return <li key={i} className="ordered">{line.replace(/^\d+\. /, '')}</li>;
              if (line.trim() === '') return <br key={i} />;
              if (line.startsWith('❌') || line.startsWith('✅')) return <p key={i} className="article-highlight">{line}</p>;
              return <p key={i}>{line}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-icon-wrap purple">
          <BookOpen size={32} />
        </div>
        <h1>Cybersecurity Learning Hub</h1>
        <p>Articles, tutorials, and guides to help you stay safe online in Nepal.</p>
      </div>

      {/* Search */}
      <div className="search-bar-container">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search articles, topics, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${activeCategory === cat ? 'category-active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="no-results">
          <BookOpen size={48} />
          <p>No articles found for your search. Try different keywords.</p>
        </div>
      ) : (
        <div className="articles-grid">
          {filtered.map(article => (
            <div
              key={article.id}
              className="article-card"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="article-card-header">
                <span className="article-cat-badge">{article.category}</span>
                <span
                  className="article-difficulty"
                  style={{ color: difficultyColor[article.difficulty] }}
                >
                  {article.difficulty}
                </span>
              </div>
              <h3 className="article-card-title">{article.title}</h3>
              <p className="article-card-summary">{article.summary}</p>
              <div className="article-card-footer">
                <span className="article-time"><Clock size={14} /> {article.readTime} read</span>
                <div className="article-tags">
                  {article.tags.slice(0, 2).map(t => (
                    <span key={t} className="article-tag">{t}</span>
                  ))}
                </div>
                <ChevronRight size={18} className="article-arrow" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPage;
