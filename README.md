# 🚀 Sujan Singh - AI & Data Science Portfolio

A modern, responsive portfolio website showcasing expertise in Artificial Intelligence, Data Science, and Machine Learning. Built with pure HTML, CSS, and JavaScript with dynamic configuration system.


## 🌟 Features

### ✨ **Modern Design**
- Responsive design that works on all devices
- Dark theme with elegant animations
- Interactive particle background effects
- Glass morphism UI elements
- Smooth scrolling and transitions

### 🔧 **Dynamic Configuration**
- **Centralized Config System** - Edit `js/config.js` to update all content
- **Dynamic Certifications** - Manage certifications through `js/certifications-config.js`
- **Easy Customization** - Change colors, content, and layout without touching HTML

### 🛡️ **Security & Performance**
- Content Security Policy (CSP) implementation
- XSS protection and security headers
- Optimized loading and performance
- SEO-friendly with meta tags and sitemap

### 📱 **Responsive Features**
- Mobile-first design approach
- Adaptive layouts for all screen sizes
- Touch-friendly navigation
- Progressive enhancement

## 🏗️ **Project Structure**

```
portfolio/
├── index.html              # Main homepage
├── certifications.html     # Certifications page
├── css/
│   ├── style.css          # Main styles
│   ├── responsive.css     # Responsive layouts
│   ├── mobile.css         # Mobile-specific styles
│   └── certifications.css # Certification page styles
├── js/
│   ├── config.js          # 🔧 Main site configuration
│   ├── certifications-config.js # 🔧 Certifications data
│   ├── script.js          # Main functionality
│   ├── particles.js       # 🔧 Particle effects
│   ├── responsive-utils.js # Responsive utilities
│   └── security.js        # Security features
├── images/                # All images and assets
├── .htaccess             # Server security configuration
├── robots.txt            # SEO crawler instructions
├── sitemap.xml           # Search engine sitemap
└── SECURITY.md           # Security documentation
```

## ⚙️ **Configuration Guide**

### 🎯 **Personal Information** (`js/config.js`)
```javascript
personal: {
    name: "Sujan Singh",
    title: "AI & Data Science Student",
    email: "sujanhany12345@gmail.com",
    location: "Bharatpur, Rajasthan, India",
    institution: "Government Engineering College, Bharatpur",
    bio: "Your bio description",
    profileImage: "images/profile-photo.png"
}
```

### 🔗 **Social Links**
```javascript
social: {
    github: "https://github.com/Sujanatgit123",
    linkedin: "https://www.linkedin.com/in/sujan-singh-096860312/",
    email: "mailto:sujanhany12345@gmail.com"
}
```

### 🏆 **Adding Certifications** (`js/certifications-config.js`)
```javascript
// Add new certification
addCertification({
    id: "cert-new",
    title: "New Certification",
    issuer: "Issuing Organization",
    date: "2025",
    image: "images/new-cert.jpg",
    // ... other properties
});
```

### 🎨 **Customizing Particles** (`js/particles.js`)
```javascript
// Modify particle settings
const particleSettings = {
    count: 100,
    speed: 0.5,
    color: '#ffffff',
    size: 2
};
```

## 🚀 **Deployment Options**

### **🎯 Your Current Setup (sujansingh.me)**
**Repository**: https://github.com/Sujanatgit123/sujansingh.github.io
**Domain**: https://sujansingh.me

**Quick Deploy Steps:**
1. Push your portfolio files to the main branch
2. GitHub Pages will automatically deploy
3. Your site will be live at sujansingh.me
4. Any updates pushed to main will auto-deploy

### **Option 1: GitHub Pages (Recommended)**
1. Push code to GitHub repository: `https://github.com/Sujanatgit123/sujansingh.github.io`
2. Go to repository Settings → Pages
3. Select source branch (main/master)
4. Your site will be live at `https://sujansingh.me` or `https://Sujanatgit123.github.io/sujansingh.github.io`

### **Option 2: Netlify**
1. Connect your GitHub repository (https://github.com/Sujanatgit123/sujansingh.github.io) to Netlify
2. Deploy automatically on every push
3. Custom domain support available (sujansingh.me)

### **Option 3: Vercel**
1. Import project from GitHub (https://github.com/Sujanatgit123/sujansingh.github.io)
2. Automatic deployments
3. Excellent performance optimization
4. Custom domain setup for sujansingh.me

### **Option 4: Traditional Web Hosting**
1. Upload all files via FTP to your web server
2. Ensure `.htaccess` is supported for security
3. Point domain to the uploaded directory

## � **Local Development**

### **Prerequisites**
- Modern web browser
- Text editor (VS Code recommended)
- Local web server (optional)

### **Setup**
1. Clone or download the repository
2. Open `index.html` in your browser, or
3. Use a local server: `python -m http.server 8000`
4. Edit configuration files as needed

### **Making Changes**
1. **Content Changes**: Edit `js/config.js`
2. **Certifications**: Edit `js/certifications-config.js`
3. **Styling**: Modify CSS files in `css/` directory
4. **Functionality**: Update `js/script.js`

## 📋 **Customization Checklist**

- [ ] Update personal information in `js/config.js`
- [ ] Replace profile photo in `images/`
- [ ] Add your project images to `images/`
- [ ] Update certification details in `js/certifications-config.js`
- [ ] Modify social media links
- [ ] Update contact information
- [x] Replace domain URLs in `sitemap.xml` and `robots.txt` (✅ Done: sujansingh.me)
- [ ] Test responsive design on different devices

## 🛡️ **Security Features**

- **Content Security Policy** - Prevents XSS attacks
- **Security Headers** - X-Frame-Options, X-Content-Type-Options
- **Input Sanitization** - Client-side validation
- **File Protection** - Sensitive files blocked via .htaccess
- **HTTPS Ready** - Security headers configured for SSL

## 📈 **SEO Optimizations**

- **Meta Tags** - Title, description, keywords for each page
- **Sitemap** - XML sitemap for search engines
- **Robots.txt** - Crawler instructions
- **Semantic HTML** - Proper heading structure
- **Image Alt Tags** - Accessibility and SEO
- **Fast Loading** - Optimized resources

## 🔄 **Available Scripts & Functions**

### **Certification Management**
```javascript
// Add new certification
addCertification(certificationData);

// Remove certification by ID
removeCertification('cert-id');

// List all certifications
listCertifications();

// Update page title
updatePageTitle('New Title');
```

### **Configuration Updates**
```javascript
// Update personal info
SITE_CONFIG.personal.name = "New Name";

// Update social links
SITE_CONFIG.social.github = "https://github.com/Sujanatgit123";

// Refresh page with new config
location.reload();
```

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## � **Contact**

**Sujan Singh**
- 📧 Email: sujanhany12345@gmail.com
- 💼 LinkedIn: [Sujan Singh](https://www.linkedin.com/in/sujan-singh-096860312/)
- 🐙 GitHub: [Sujanatgit123](https://github.com/Sujanatgit123)

## 🔄 **Version History**

- **v1.0.0** - Initial release with full functionality
- **v1.1.0** - Added security features and SEO optimization
- **v1.2.0** - Enhanced responsive design and configuration system

## 🛠️ **Technologies Used**

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Variables, CSS Animations
- **Security**: Content Security Policy, XSS Protection
- **SEO**: Meta Tags, Sitemap, Robots.txt
- **Performance**: Optimized loading, Compression ready
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter, JetBrains Mono)

## 🎯 **Browser Support**

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

---

⭐ **If you find this portfolio template helpful, please give it a star!**

🚀 **Ready to deploy? Your portfolio is production-ready!**

Built with ❤️ by [Sujan Singh](https://github.com/Sujanatgit123)
