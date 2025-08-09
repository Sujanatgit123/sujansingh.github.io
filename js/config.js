// Global Site Configuration
// Comprehensive configuration system - modify values here to customize your portfolio
window.SITE_CONFIG = {
  // Personal Information
  personal: {
    name: "Sujan Singh",
    title: "AI & Data Science Student",
  email: "sujanhany12345@gmail.com",
    location: "Bharatpur, Rajasthan, India",
    institution: "Government Engineering College, Bharatpur",
    bio: "Passionate about transforming data into insights and building intelligent systems. Currently pursuing Artificial Intelligence & Data Science at Government Engineering College, Bharatpur.",
  profileImage: "images/profile-photo.png"
  },

  // Social Links
  social: {
    github: "https://github.com/Sujanatgit123",
    linkedin: "https://www.linkedin.com/in/sujan-singh-096860312/",
    email: "mailto:sujanhany12345@gmail.com",
    // Optional: add more platforms
    twitter: null,
    instagram: null,
    website: null
  },

  // Hero Section
  hero: {
    typingText: "Hi, I'm Sujan Singh",
    typingSpeed: 90,
    typingStartDelay: 800,
    subtitle: "AI & Data Science Student",
    description: "Passionate about transforming data into insights and building intelligent systems. Currently pursuing Artificial Intelligence & Data Science at Government Engineering College, Bharatpur.",
    showScrollIndicator: true,
    buttons: [
      { text: "View My Work", href: "#projects", type: "primary" },
      { text: "Get In Touch", href: "#contact", type: "secondary" }
    ]
  },

  // About Section Stats
  stats: [
    { number: 14, label: "Certifications", enabled: true },
    { number: 2, label: "Projects Completed", enabled: true },
    { number: 1, label: "Internship", enabled: true },
    { number: 10, label: "Technologies", enabled: true }
  ],

  // Education
  education: [
    {
      degree: "B.Tech in Artificial Intelligence & Data Science",
      institution: "Government Engineering College, Bharatpur",
      year: "2023 - 2027",
      enabled: true
    }
  ],

  // Skills Configuration
  skills: {
    categories: [
      {
        name: "Programming Languages",
        enabled: true,
        items: [
          { name: "Python", percentage: 85 },
          { name: "R", percentage: 95 },
          { name: "C++", percentage: 80 },
          { name: "SQL", percentage: 90 }
        ]
      },
      {
        name: "Data Science & AI",
        enabled: true,
        items: [
          { name: "Machine Learning", percentage: 88 },
          { name: "Data Analysis", percentage: 90 },
          { name: "Data Visualization", percentage: 85 },
          { name: "Statistics", percentage: 82 }
        ]
      },
      {
        name: "Tools & Technologies",
        enabled: true,
        badges: [
          "Git/GitHub", "Jupyter", "TensorFlow",
          "Pandas", "NumPy", "Matplotlib", "Seaborn", 
          "Scikit-learn", "Visual Studio Code", "PyCharm"
        ]
      }
    ]
  },

  // Projects Configuration
  projects: [
    {
      title: "Machine Learning Project",
      description: "A CNN-based model that predicts a person’s country from facial images using deep learning and computer vision techniques. Achieved 95% accuracy on test dataset.",
  image: "images/project1.jpg",
      tech: ["Python", "TensorFlow", "OpenCV", "Scikit-learn", "Pandas", "Matplotlib"],
      status: "completed",
      github: "https://github.com/Sujanatgit123/Country-prediction-from-face",
      demo: null,
      enabled: true
    },
    {
      title: "Data Analysis Dashboard",
      description: "An interactive dashboard for analyzing complex datasets with real-time visualizations. Includes statistical analysis and trend prediction capabilities.",
  image: "images/project2.jpg",
      tech: ["R", "Shiny", "ggplot2", "dplyr"],
      status: "in-progress",
      github: "https://github.com/sujansingh/data-analysis",
      demo: null,
      enabled: true
    },
  ],

  // Certifications Configuration (edit this to control certifications page)
  // Each item can be surfaced on certifications.html (add dynamic script later if desired)
  certifications: [
    {
      title: "Microsoft Azure AI Fundamentals",
      issuer: "Microsoft / Azure",
      date: "2025",
      credentialId: "",
      credentialUrl: "https://learn.microsoft.com/",
      image: "images/azure-ai-cert.jpeg",   // Large certificate image
      logo: "images/azure-logo.png",        // Issuer logo
      skills: ["Azure AI", "Cloud", "ML Basics"],
      highlight: true,
      enabled: true
    },
    {
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google / Coursera",
      date: "2025",
      credentialId: "",
      credentialUrl: "https://www.coursera.org/",
      image: "images/google-data-analytics-cert.jpeg",
      logo: "images/google-logo.png",
      skills: ["Data Cleaning", "SQL", "Spreadsheets", "Visualization"],
      highlight: true,
      enabled: true
    },
    {
      title: "IBM Data Science Fundamentals",
      issuer: "IBM",
      date: "2025",
      credentialId: "",
      credentialUrl: "https://www.ibm.com/training",
      image: "images/data-science-cert.jpg",
      logo: "images/ibm-logo.png",
      skills: ["Python", "Pandas", "Statistics"],
      highlight: false,
      enabled: true
    }
  ],

  // Experience Timeline
  experience: [
    {
      title: "Microsoft Azure AI Intern",
      company: "Edunet Foundation",
      date: "2025",
      description: "Gained hands-on experience in machine learning model building, data preprocessing, and model deployment on Azure cloud platform. Worked with Azure Machine Learning Studio and contributed to various AI projects.",
      skills: ["Azure ML", "Python", "Model Deployment", "Data Processing"],
      enabled: true
    },
    {
      title: "AI & Data Science Student",
      company: "Government Engineering College, Bharatpur",
      date: "2023 - Present",
      description: "Pursuing Bachelor's degree in Artificial Intelligence and Data Science. Actively engaged in research projects, hackathons, and technical competitions. Maintaining excellent academic performance while building practical skills.",
      skills: ["Machine Learning", "Data Science", "Research", "Problem Solving"],
      enabled: true
    }
  ],

  // Particles Configuration
  particles: {
    enabled: true,
    globalCanvasId: 'particles-canvas',
    numParticles: 200,
    colors: ['#6366f1', '#06b6d4', '#f59e0b', '#8b5cf6', '#10b981'],
    size: { min: 1, max: 4 },
    velocity: { min: -0.8, max: 0.8 },
    connection: { enabled: true, maxDistance: 140, lineColor: 'rgba(99,102,241,ALPHA)', baseAlpha: 0.28 },
    regenerateOnResize: true,
    performanceCap: { enabled: true, maxWidth: 1800, scaleFactor: 0.75 }
  },

  // Glass Morphism
  glass: {
    autoApply: true,
    hoverLift: true,
    blur: 16,
    saturation: 160,
    cardOpacity: 0.55
  },

  // Feature Toggles
  features: {
    scrollAnimations: true,
    counters: true,
    skillBars: true,
    parallax: true,
    notifications: true,
    pageLoader: false,
    contactForm: true,
    scrollToTop: true
  },

  // Theme Configuration
  theme: {
    gradients: {
      body: [
        { at: '20% 30%', color: 'rgba(99,102,241,0.18)', radius: '60%' },
        { at: '80% 70%', color: 'rgba(6,182,212,0.18)', radius: '65%' },
        { at: '50% 100%', color: 'rgba(245,158,11,0.08)', radius: '70%' }
      ]
    },
    colors: {
      primary: '#6366f1',
      secondary: '#06b6d4',
      accent: '#f59e0b'
    }
  },

  // Contact Information
  contact: {
  email: "sujanhany12345@gmail.com",
    location: "Bharatpur, Rajasthan, India",
    institution: "Government Engineering College, Bharatpur",
    formEnabled: true,
    showContactDetails: true
  },

  // Navigation Configuration
  navigation: {
    logo: "Sujan Singh",
    links: [
      { text: "Home", href: "#home", enabled: true },
      { text: "About", href: "#about", enabled: true },
      { text: "Skills", href: "#skills", enabled: true },
      { text: "Projects", href: "#projects", enabled: true },
      { text: "Experience", href: "#experience", enabled: true },
      { text: "Certifications", href: "certifications.html", enabled: true },
      { text: "Contact", href: "#contact", enabled: true }
    ]
  }
};
