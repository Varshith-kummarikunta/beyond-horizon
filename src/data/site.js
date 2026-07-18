export const site = {
  personal: {
    name: "Kummarikunta Varshith",
    title: "Full Stack Developer",
    tagline: "Crafting immersive digital experiences through code, design, and storytelling.",
    bio: "I am a Full Stack Developer focused on building immersive web experiences with React, modern frontend technologies, and thoughtful user experience. I enjoy blending design, storytelling, and engineering, often drawing inspiration from travel and art to create interfaces that feel beautiful and performant.",
    email: "varshithkummarikunta@gmail.com",
    phone: "+91 9381413278",
    location: "Hyderabad, Telangana, India",
    profileImage: "/images/profile/profile.jpg",
    resumeUrl:"https://drive.google.com/file/d/1tmjHgnQoqluE-VUPCBWty6Kl0vs3O1WR/view",
  },
  navigation: [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Journey", id: "journey" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Travel", id: "travel" },
    { label: "Art", id: "art" },
    { label: "Contact", id: "contact" },
  ],
  social: [
    { label: "GitHub", url: "https://github.com/Varshith-kummarikunta" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/varshith-kummarikunta-067253328/" },
    { label: "Instagram", url:"https://www.instagram.com/varshith.kummarikunta/" },
        { label: "Art", url: "https://www.instagram.com/vinnysketchbook/" },
    { label: "Portfolio", url: "#home" },
  ],
  hero: {
    titleLines: ["Beyond the Code,", "Beyond the Horizon."],
    description: "I craft immersive digital experiences with React, modern web technologies, and cinematic interactions.",
    primaryAction: { label: "Explore Work", target: "projects" },
    secondaryAction: { label: "Contact Me", target: "contact" },
    scrollLabel: "Scroll to explore",
  },
  about: {
    eyebrow: "About",
    titleLines: ["Creating digital experiences", "that feel alive."],
    statistics: [
      { value: "01+", label: "Years Learning" },
      { value: "20+", label: "Projects Built" },
      { value: "100%", label: "Passion" },
    ],
  },
  journey: {
    eyebrow: "Journey",
    titleLines: ["Every step shaped", "who I am today."],
  },
  timeline: [
    { year: "2021", description: "Started B.Tech in Computer Science." },
    { year: "2023", description: "Discovered React and modern frontend development." },
    { year: "2024", description: "Built multiple MERN stack projects and explored UI/UX." },
    { year: "2025", description: "Graduated and focused on creating premium web experiences." },
  ],
  skills: {
    eyebrow: "Skills",
    titleLines: ["Technologies", "I work with."],
    description: "I build scalable, performant web applications using modern frontend and backend technologies while focusing on clean architecture and exceptional user experience.",
    categories: [
      { title: "Frontend", technologies: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"] },
      { title: "Backend", technologies: ["Node.js", "Express.js", "MongoDB", "REST APIs"] },
      { title: "Tools", technologies: ["Git", "GitHub", "VS Code", "Vite", "GSAP", "Figma"] },
    ],
  },
  projects: [
  {
    number: "01",
    title: "ATS Resume Analyzer",
    description:
      "AI-powered ATS resume checker with resume parsing, scoring, keyword analysis and suggestions.",
    technologies: ["React", "Express", "OpenAI"],
    githubUrl: "https://github.com/Varshith-kummarikunta",
    liveUrl: "#",
    // Add verified project-name.webp screenshots from public/images/projects when available.
    screenshotPath: null,
  },
  {
    number: "02",
    title: "Object Recognition",
    description:
      "Real-time object detection using TensorFlow and browser camera APIs.",
    technologies: ["React", "TensorFlow", "COCO SSD"],
    githubUrl: "https://github.com/Varshith-kummarikunta",
    liveUrl: "#",
    screenshotPath: null,
  },
  {
    number: "03",
    title: "Configurable Rich Text Editor",
    description:
      "Reusable editor with speech-to-text, markdown support and configurable plugins.",
    technologies: ["React", "TipTap", "Node.js"],
    githubUrl: "https://github.com/Varshith-kummarikunta",
    liveUrl: "#",
    screenshotPath: null,
  },
],
  projectsIntro: {
    eyebrow: "Projects",
    titleLines: ["Selected work", "that defines my journey."],
    description: "A collection of projects showcasing modern frontend engineering, full stack development, performance optimization, and interactive user experiences.",
    visitLabel: "Visit Project",
    githubLabel: "GitHub",
  },
  travel: [
  {
    location: "Kedarkantha Trek",
    subtitle: "Snow mountains & adventure",
    imagePath: "/images/travel/juda_Ka_talab.jpg",
    variant: "large",
  },
  {
    location: "Lambasingi",
    subtitle: "Mist and mountains",
    imagePath: "/images/travel/lambasingi.jpg",
    variant: "portrait",
  },
  {
    location: "Beach Exploration",
    subtitle: "Ocean and sunsets",
    imagePath: "/images/travel/beach.jpg",
    variant: "portrait",
  },
  {
    location: "Village Life",
    subtitle: "Simple moments",
    imagePath: "/images/travel/aura_farming.jpg",
    variant: "wide",
  },
  {
    location: "Sunrise Moments",
    subtitle: "New beginnings",
    imagePath: "/images/travel/sunrise.jpg",
    variant: "small",
  },
  {
    location: "Sunset Moments",
    subtitle: "Golden hour reflections",
    imagePath: "/images/travel/sunset.jpg",
    variant: "future",
  },
],
  travelIntro: {
    eyebrow: "Travel",
    titleLines: ["Every destination", "changed my perspective."],
    description: "Travel inspires the way I design and build digital experiences. Every journey teaches simplicity, balance, storytelling, and curiosity.",
  },
  artGallery: {
    eyebrow: "Creative Work",
    titleLines: ["Beyond Code,", "Through Art."],
    description: "Sketching has always been a way for me to observe, create, and tell stories beyond technology.",
    emptyMessage: "New studies are being prepared.",
    images: [
      // Add verified sketch assets here as { src, title, category, year, description, alt }.
    ],
  },
  contact: {
    eyebrow: "Contact",
    titleLines: ["Let's build", "something remarkable."],
    description: "Whether it's a freelance project, a full-time opportunity, or simply a conversation about technology and design, I'd love to hear from you.",
    availability: "Open to opportunities",
    sendEmailLabel: "Send Email",
    downloadResumeLabel: "Download Resume",
  },
  footer: {
    copyright: "\u00A9 2026 Beyond Horizon. All rights reserved.",
    stack: ["React", "GSAP", "Framer Motion", "Lenis", "Three.js"],
    backToTopLabel: "Back to top",
  },
  loader: { label: "PORTFOLIO 2026" },
};
