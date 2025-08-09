/* =====================================================================
   COMPLETE CERTIFICATIONS PAGE CONFIGURATION
   
   🎯 PURPOSE: Control EVERYTHING on the certifications page through this config
   📝 USAGE: Edit the data below, save, and refresh page - changes apply instantly!
   
   ⚡ WHAT YOU CAN CONTROL:
   ✅ Page title and subtitle
   ✅ Add/remove certification cards  
   ✅ Change names, images, logos, dates, descriptions
   ✅ Modify skills, verification status, overlay text
   ✅ Control featured/highlighted cards
   ✅ Update statistics automatically
   ✅ Maintain exact same layout and styling
   
   📋 CERTIFICATE SCHEMA:
   {
     id: "unique-id",                    // Unique identifier
     title: "Full Certificate Name",     // Main title shown on card
     shortTitle: "Short Name",           // Used in overlay
     issuer: "Company/Organization",     // Certificate issuer
     issuerLogo: "images/logo.png",      // Company logo image
     image: "images/cert.jpg",           // Certificate image
     date: "2024",                       // Completion date/year
     description: "What you learned...",  // Detailed description
     overlayText: "Overlay description", // Text shown on hover
     skills: ["Skill1", "Skill2"],       // Array of skills
     verifyUrl: "https://...",           // Verification link (optional)
     featured: true,                     // Show as featured card
     verified: true,                     // Show verified badge
     crop: true,                         // Crop image to fit
     customClass: "google-cert"          // Additional CSS class
   }
   
   💡 QUICK TIPS:
   - Keep the same number of cards or adjust as needed
   - featured: true adds "featured" class and highlights the card
   - crop: true adds "crop" class for better image fitting
   - verified: false hides the verified status
   - customClass: adds extra CSS classes for special styling
===================================================================== */

// ============================================================================
// 📄 PAGE CONFIGURATION - Edit page title and subtitle
// ============================================================================
const PAGE_SETTINGS = {
  title: "Certifications & Achievements",
  subtitle: "Professional certifications that validate my expertise in AI, Data Science, and Cloud Technologies"
};

// ============================================================================
// 🎯 CERTIFICATIONS DATA - Add/Edit/Remove your certificates here
// ============================================================================
const CERTIFICATIONS_DATA = [
  // Google Data Analytics - Featured Certificate
  {
    id: "google-data-analytics",
    title: "Google Data Analytics Professional Certificate",
    shortTitle: "Google Data Analytics Professional",
    issuer: "Google",
    issuerLogo: "images/google-logo.png",
    image: "images/google-data-analytics-cert.jpeg",
    date: "August 2025",
    description: "Comprehensive program covering data analysis fundamentals, data visualization, R programming, and business intelligence tools including Tableau and SQL.",
    overlayText: "Comprehensive certification covering data analysis, visualization, and business intelligence",
    skills: ["Data Analysis", "R Programming", "Tableau", "SQL", "Data Visualization"],
    verifyUrl: "https://coursera.org/verify/professional-cert/EFUP52K35NTD",
    featured: true,
    verified: true,
    crop: true,
    customClass: ""
  },

  // Azure AI Internship
  {
    id: "azure-ai-internship",
    title: "Azure AI Internship Completion",
    shortTitle: "Azure AI Internship",
    issuer: "Microsoft Azure",
    issuerLogo: "images/azure-logo.png",
    image: "images/azure-ai-cert.jpeg",
    date: "2024",
    description: "Intensive internship program focusing on machine learning model development, data preprocessing, and AI model deployment on Azure cloud platform.",
    overlayText: "Hands-on experience with Azure Machine Learning and AI services",
    skills: ["Azure ML", "Machine Learning", "Cloud Computing", "Model Deployment"],
    verifyUrl: false,
    featured: false,
    verified: true,
    crop: false,
    customClass: ""
  },

  // Deep Learning Certificate
  {
    id: "deep-learning",
    title: "Fundamentals Of Deep Learning",
    shortTitle: "Deep Learning",
    issuer: "Nvidia",
    issuerLogo: "images/NVDA.png",
    image: "images/nvda-cert.jpeg",
    date: "2025",
    description: "Certification covering deep learning concepts, neural networks, and practical implementations using popular frameworks.",
    overlayText: "Fundamental deep learning concepts and implementations",
    skills: ["Deep Learning", "Neural Networks", "GPU", "Jupyter", "Python"],
    verifyUrl: "https://learn.nvidia.com/certificates?id=aJhlGQ0FSkqrK3HCZbbvtQ#",
    featured: false,
    verified: true,
    crop: false,
    customClass: ""
  },

  // 🚀 ADD MORE CERTIFICATES HERE:
  // Copy the template above and modify with your details
];

// ============================================================================
// 📊 STATISTICS CONFIGURATION - Auto-calculated from certificates data
// ============================================================================
const STATS_CONFIG = [
  {
    icon: "fa-certificate",
    label: "Professional Certifications",
    getValue: () => `${CERTIFICATIONS_DATA.length}+`
  },
  {
    icon: "fa-shield-alt", 
    label: "Verified Credentials",
    getValue: () => "100%"
  },
  {
    icon: "fa-award",
    label: "Certification Domains",
    getValue: () => {
      const domains = new Set();
      CERTIFICATIONS_DATA.forEach(cert => {
        if (cert.skills) {
          cert.skills.forEach(skill => {
            if (skill.includes('Data') || skill.includes('Analytics')) domains.add('Data Science');
            if (skill.includes('Cloud') || skill.includes('AWS') || skill.includes('Azure')) domains.add('Cloud');
            if (skill.includes('Machine Learning') || skill.includes('ML') || skill.includes('AI')) domains.add('AI/ML');
            if (skill.includes('Programming') || skill.includes('Python')) domains.add('Programming');
          });
        }
      });
      return `${domains.size}+`;
    }
  }
];

// ============================================================================
// 🛠️ HELPER FUNCTIONS - Use in browser console for quick management
// ============================================================================

// Add a new certificate
window.addCertificate = function(cert) {
  if (!cert.id || !cert.title || !cert.issuer || !cert.image) {
    console.error('❌ Missing required fields: id, title, issuer, image');
    return false;
  }
  
  if (CERTIFICATIONS_DATA.find(c => c.id === cert.id)) {
    console.error(`❌ Certificate with id "${cert.id}" already exists`);
    return false;
  }
  
  CERTIFICATIONS_DATA.push(cert);
  renderCertificationsPage();
  console.log(`✅ Added certificate: ${cert.title}`);
  return true;
};

// Remove a certificate by ID
window.removeCertificate = function(id) {
  const index = CERTIFICATIONS_DATA.findIndex(c => c.id === id);
  if (index === -1) {
    console.error(`❌ Certificate with id "${id}" not found`);
    return false;
  }
  
  const removed = CERTIFICATIONS_DATA.splice(index, 1)[0];
  renderCertificationsPage();
  console.log(`✅ Removed certificate: ${removed.title}`);
  return true;
};

// List all certificates
window.listCertificates = function() {
  console.table(CERTIFICATIONS_DATA.map(c => ({
    id: c.id,
    title: c.title,
    issuer: c.issuer,
    date: c.date,
    featured: c.featured ? '⭐' : '',
    verified: c.verified ? '✅' : ''
  })));
};

// Update page title/subtitle
window.updatePageTitle = function(title, subtitle) {
  PAGE_SETTINGS.title = title;
  PAGE_SETTINGS.subtitle = subtitle;
  renderCertificationsPage();
  console.log('✅ Page title updated');
};

// ============================================================================
// 🎨 RENDERING ENGINE - Generates HTML from configuration
// ============================================================================

function renderCertificationsPage() {
  updatePageHeader();
  updateCertificationsGrid();
  updateStatistics();
  
  // Re-initialize any interactive effects
  if (window.initTiltEffects) {
    setTimeout(() => window.initTiltEffects(), 100);
  }
}

function updatePageHeader() {
  const titleElement = document.querySelector('.page-title');
  const subtitleElement = document.querySelector('.page-subtitle');
  
  if (titleElement) titleElement.textContent = PAGE_SETTINGS.title;
  if (subtitleElement) subtitleElement.textContent = PAGE_SETTINGS.subtitle;
}

function updateCertificationsGrid() {
  const gridContainer = document.querySelector('.certifications-grid');
  if (!gridContainer) return;
  
  gridContainer.innerHTML = '';
  
  CERTIFICATIONS_DATA.forEach(cert => {
    const cardHTML = generateCertificateCard(cert);
    gridContainer.insertAdjacentHTML('beforeend', cardHTML);
  });
}

function generateCertificateCard(cert) {
  const cardClasses = ['certification-card'];
  if (cert.featured) cardClasses.push('featured');
  if (cert.customClass) cardClasses.push(cert.customClass);
  
  const imageClasses = ['certification-image'];
  if (cert.crop) imageClasses.push('crop');
  if (cert.customClass) imageClasses.push(cert.customClass);
  
  const skillsBadges = cert.skills ? 
    cert.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('') : '';
  
  const verifyButton = cert.verifyUrl ? 
    `<a href="${cert.verifyUrl}" target="_blank" class="btn btn-verify">
       <i class="fas fa-shield-alt"></i> Verify
     </a>` : 
    `<a href="#" class="btn btn-verify">
       <i class="fas fa-shield-alt"></i> Verify
     </a>`;
  
  return `
    <!-- ${cert.title} -->
    <div class="${cardClasses.join(' ')}">
      <div class="${imageClasses.join(' ')}">
        <img src="${cert.image}" alt="${cert.title}" onerror="this.src='${cert.image}'">
        <div class="certification-overlay">
          <div class="overlay-content">
            <h3>${cert.shortTitle}</h3>
            <p>${cert.overlayText}</p>
            <div class="cert-buttons">
              <a href="${cert.image}" target="_blank" class="btn btn-view" rel="noopener noreferrer">
                <i class="fas fa-eye"></i> View Certificate
              </a>
              ${verifyButton}
            </div>
          </div>
        </div>
      </div>
      <div class="certification-info">
        <div class="cert-header">
          <div class="cert-logo">
            <img src="${cert.issuerLogo}" alt="${cert.issuer}" onerror="this.src='${cert.issuerLogo}'">
          </div>
          <div class="cert-details">
            <h3 class="cert-title">${cert.title}</h3>
            <p class="cert-issuer">${cert.issuer}</p>
            <p class="cert-date">Completed: ${cert.date}</p>
          </div>
        </div>
        <div class="cert-description">
          <p>${cert.description}</p>
        </div>
        ${skillsBadges ? `<div class="cert-skills">${skillsBadges}</div>` : ''}
        ${cert.verified !== false ? 
          `<div class="cert-status verified">
             <i class="fas fa-check-circle"></i>
             <span>Verified</span>
           </div>` : ''}
      </div>
    </div>
  `;
}

function updateStatistics() {
  const statsGrid = document.querySelector('.cert-stats .stats-grid');
  if (!statsGrid) return;
  
  statsGrid.innerHTML = '';
  
  STATS_CONFIG.forEach(stat => {
    const statHTML = `
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas ${stat.icon}"></i>
        </div>
        <div class="stat-info">
          <h3>${stat.getValue()}</h3>
          <p>${stat.label}</p>
        </div>
      </div>
    `;
    statsGrid.insertAdjacentHTML('beforeend', statHTML);
  });
}

// ============================================================================
// 🚀 AUTO-INITIALIZATION - Runs when page loads
// ============================================================================

function initializeCertificationsPage() {
  renderCertificationsPage();
  
  console.log('🎓 Certifications page initialized');
  console.log('💡 Available commands:');
  console.log('   • addCertificate(certObject)');
  console.log('   • removeCertificate(id)');
  console.log('   • listCertificates()');
  console.log('   • updatePageTitle(title, subtitle)');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCertificationsPage);
} else {
  initializeCertificationsPage();
}

// Expose main functions globally
window.renderCertificationsPage = renderCertificationsPage;
