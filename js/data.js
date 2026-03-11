/* ============================================
   SITE DATA - All portfolio content
   Editable via Admin Dashboard
   ============================================ */

const defaultSiteData = {
    personal: {
        name: "Your Name",
        logoText: "Portfolio",
        greeting: "Hello, I'm",
        titles: ["Full Stack Developer", "UI/UX Designer", "Creative Coder", "Problem Solver"],
        description: "Passionate developer crafting digital experiences with clean code and creative design. I build modern, responsive, and user-friendly web applications.",
        profileImage: "assets/profile.jpg",
        aboutImage: "assets/about.jpg",
        aboutSubtitle: "Creative Developer & Designer",
        aboutText: "I'm a passionate developer with expertise in building modern web applications. I love turning complex problems into simple, beautiful, and intuitive solutions. My goal is to create impactful digital experiences that make a difference.\n\nWith years of experience in both frontend and backend development, I bring a holistic approach to every project. I believe in writing clean, maintainable code and staying up-to-date with the latest technologies.",
        email: "email@example.com",
        phone: "+1 234 567 890",
        location: "City, Country",
        availability: "Available for Freelance",
        experienceYears: "5+",
        projectsCount: "50+",
        stats: {
            projects: 50,
            clients: 30,
            experience: 5,
            awards: 10
        },
        social: {
            github: "https://github.com",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            instagram: "https://instagram.com",
            dribbble: "https://dribbble.com"
        }
    },

    services: [
        {
            id: 1,
            icon: "fas fa-code",
            title: "Web Development",
            description: "Building responsive, fast, and modern websites using the latest technologies and best practices."
        },
        {
            id: 2,
            icon: "fas fa-mobile-alt",
            title: "Mobile Apps",
            description: "Creating cross-platform mobile applications with smooth performance and native-like experience."
        },
        {
            id: 3,
            icon: "fas fa-paint-brush",
            title: "UI/UX Design",
            description: "Designing intuitive and visually stunning user interfaces that enhance user experience."
        },
        {
            id: 4,
            icon: "fas fa-server",
            title: "Backend Development",
            description: "Building robust and scalable server-side applications with secure APIs and databases."
        },
        {
            id: 5,
            icon: "fas fa-search",
            title: "SEO Optimization",
            description: "Optimizing websites for search engines to improve visibility and drive organic traffic."
        },
        {
            id: 6,
            icon: "fas fa-chart-line",
            title: "Digital Strategy",
            description: "Developing comprehensive digital strategies to help businesses grow and succeed online."
        }
    ],

    skills: [
        { id: 1, name: "HTML/CSS", icon: "fab fa-html5", percentage: 95 },
        { id: 2, name: "JavaScript", icon: "fab fa-js", percentage: 90 },
        { id: 3, name: "React", icon: "fab fa-react", percentage: 88 },
        { id: 4, name: "Node.js", icon: "fab fa-node-js", percentage: 85 },
        { id: 5, name: "Python", icon: "fab fa-python", percentage: 82 },
        { id: 6, name: "TypeScript", icon: "fas fa-code", percentage: 80 },
        { id: 7, name: "Vue.js", icon: "fab fa-vuejs", percentage: 75 },
        { id: 8, name: "PHP", icon: "fab fa-php", percentage: 70 },
        { id: 9, name: "Git", icon: "fab fa-git-alt", percentage: 90 },
        { id: 10, name: "Docker", icon: "fab fa-docker", percentage: 72 },
        { id: 11, name: "AWS", icon: "fab fa-aws", percentage: 68 },
        { id: 12, name: "Figma", icon: "fab fa-figma", percentage: 78 }
    ],

    projects: [
        {
            id: 1,
            title: "E-Commerce Platform",
            category: "web",
            description: "A full-featured online store with payment integration, inventory management, and admin panel.",
            image: "https://via.placeholder.com/600x400/0a0a0a/39ff14?text=E-Commerce",
            tags: ["React", "Node.js", "MongoDB"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 2,
            title: "Task Management App",
            category: "app",
            description: "A collaborative project management tool with real-time updates and team features.",
            image: "https://via.placeholder.com/600x400/0a0a0a/39ff14?text=Task+App",
            tags: ["Vue.js", "Firebase", "Tailwind"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 3,
            title: "Portfolio Dashboard",
            category: "design",
            description: "An analytics dashboard with interactive charts, data visualization, and reporting.",
            image: "https://via.placeholder.com/600x400/0a0a0a/39ff14?text=Dashboard",
            tags: ["React", "D3.js", "API"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 4,
            title: "Social Media App",
            category: "app",
            description: "A social networking platform with real-time messaging, stories, and media sharing.",
            image: "https://via.placeholder.com/600x400/0a0a0a/39ff14?text=Social+App",
            tags: ["React Native", "GraphQL", "AWS"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 5,
            title: "Blog Platform",
            category: "web",
            description: "A modern blogging platform with markdown support, comments, and SEO optimization.",
            image: "https://via.placeholder.com/600x400/0a0a0a/39ff14?text=Blog",
            tags: ["Next.js", "Prisma", "PostgreSQL"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 6,
            title: "Brand Identity Design",
            category: "design",
            description: "Complete brand identity design including logo, color palette, and brand guidelines.",
            image: "https://via.placeholder.com/600x400/0a0a0a/39ff14?text=Branding",
            tags: ["Figma", "Illustrator", "Branding"],
            liveUrl: "#",
            githubUrl: "#"
        }
    ],

    gallery: [
        { id: 1, image: "https://via.placeholder.com/600x600/0a0a0a/39ff14?text=Photo+1", caption: "Creative workspace" },
        { id: 2, image: "https://via.placeholder.com/400x400/0a0a0a/39ff14?text=Photo+2", caption: "Team collaboration" },
        { id: 3, image: "https://via.placeholder.com/400x400/0a0a0a/39ff14?text=Photo+3", caption: "Conference talk" },
        { id: 4, image: "https://via.placeholder.com/400x400/0a0a0a/39ff14?text=Photo+4", caption: "Code & Coffee" },
        { id: 5, image: "https://via.placeholder.com/400x400/0a0a0a/39ff14?text=Photo+5", caption: "Design process" },
        { id: 6, image: "https://via.placeholder.com/400x400/0a0a0a/39ff14?text=Photo+6", caption: "Hackathon winners" },
        { id: 7, image: "https://via.placeholder.com/400x400/0a0a0a/39ff14?text=Photo+7", caption: "Workshop session" },
        { id: 8, image: "https://via.placeholder.com/400x400/0a0a0a/39ff14?text=Photo+8", caption: "Tech meetup" }
    ]
};

// Load data from localStorage or use defaults
function loadSiteData() {
    const stored = localStorage.getItem('portfolioSiteData');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.warn('Failed to parse stored data, using defaults');
            return JSON.parse(JSON.stringify(defaultSiteData));
        }
    }
    return JSON.parse(JSON.stringify(defaultSiteData));
}

// Save data to localStorage
function saveSiteData(data) {
    localStorage.setItem('portfolioSiteData', JSON.stringify(data));
}

// Global site data
let siteData = loadSiteData();
