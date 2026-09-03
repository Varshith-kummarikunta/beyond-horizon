export const site = {
  personal: {
    name: "Varshith Kummarikunta",
    title: "MERN Stack Developer | AI Applications Engineer",
    tagline:
      "Building production-ready full-stack applications with MERN, AI integrations, real-time systems, and immersive user experiences.",
    bio: "I'm a MERN Stack Developer focused on building scalable full-stack applications using React, Node.js, Express, MongoDB, and AI technologies. I enjoy combining engineering with creativity through immersive interfaces, travel photography, and traditional art.",
    email: "varshithkummarikunta@gmail.com",
    phone: "+91 9381413278",
    location: "Hyderabad, Telangana, India",
    profileImage: "/images/profile/profile.webp",
    resumeUrl:
      "https://drive.google.com/file/d/1xSmIVuxNYroPBmkXzhjCzciOJqRQJQCO/view",
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
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/varshith-kummarikunta-067253328/",
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/varshith.kummarikunta/",
    },
    { label: "Art", url: "https://www.instagram.com/vinnysketchbook/" },
    { label: "Portfolio", url: "https://varshith-kummarikunta.vercel.app/" },
  ],
  hero: {
    titleLines: [
  "Beyond",
  "Horizon",
],
    description:
  "Building intelligent digital experiences through MERN, AI, and creative engineering.",
    primaryAction: { label: "Explore Work", target: "projects" },
    secondaryAction: { label: "Contact Me", target: "contact" },
    scrollLabel: "Scroll to explore",
  },
  about: {
    eyebrow: "About",
    titleLines: ["Creating digital experiences", "that feel alive."],
    statistics: [
      {
        value: "3",
        label: "Featured Projects",
      },
      {
        value: "MERN",
        label: "Primary Stack",
      },
      {
        value: "2025",
        label: "B.Tech Graduate",
      },
    ],
  },
  journey: {
    eyebrow: "Journey",
    titleLines: ["Every step shaped", "who I am today."],
  },
  timeline: [
    {
      year: "2021",
      description: "Started B.Tech in Computer Science.",
    },
    {
      year: "2023",
      description: "Discovered React and modern frontend development.",
    },
    {
      year: "2024",
      description: "Built MERN applications and explored UI/UX engineering.",
    },
    {
      year: "2025",
      description:
        "Graduated and focused on production-ready full-stack development.",
    },
    {
      year: "2026",
      description:
        "Built AI-powered applications, real-time platforms, and deployed cloud applications.",
    },
  ],
  skills: {
    eyebrow: "Skills",
    titleLines: ["Technologies", "I work with."],
    description:
      "I build scalable, performant web applications using modern frontend and backend technologies while focusing on clean architecture and exceptional user experience.",
    categories: [
      {
        title: "Frontend",
        technologies: [
          "React",
          "JavaScript ES6+",
          "Redux Toolkit",
          "Context API",
          "Tailwind CSS",
          "GSAP",
          "Vite",
        ],
      },
      {
        title: "Backend",
        technologies: [
          "Node.js",
          "Express.js",
          "MongoDB",
          "Mongoose",
          "REST APIs",
          "JWT Authentication",
          "Socket.IO",
          "WebSockets",
        ],
      },
      {
        title: "AI & Browser",
        technologies: [
          "Groq AI",
          "LLM Integration",
          "Prompt Engineering",
          "Chrome Extension API",
          "Manifest V3",
          "PDF Parsing",
        ],
      },

      {
        title: "Tools",
        technologies: [
          "Git",
          "GitHub",
          "Postman",
          "Figma",
          "Cloudinary",
          "Vercel",
          "Render",
        ],
      },
    ],
  },
  projects: [
    {
      number: "01",
      title: "Chess Game — Real-Time Multiplayer Platform",
      description:
        "Full-stack real-time multiplayer chess platform featuring server-side move validation with chess.js, Socket.IO room synchronization, 5-minute blitz chess clocks, and a mathematical FIDE Elo rating engine (K=32) backed by MongoDB Atlas and deployed across Vercel and Render.",
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.IO",
        "chess.js",
        "Cloudinary",
        "Redux Toolkit",
      ],
      githubUrl: "https://github.com/Varshith-kummarikunta/Chess-Game",
      liveUrl: "https://play-chess-online.vercel.app",
      liveLabel: "Live Demo",
      screenshotPath: "/images/projects/chess-game.webp",
    },

    {
      number: "02",
      title: "Instagram Clone — Full-Stack Social Platform & WebRTC Calling",
      description:
        "Production-scale social media platform built with the MERN stack and Socket.IO, featuring WebRTC peer-to-peer audio and video calling with call-state signaling, real-time direct messaging with typing indicators, and Cloudinary media pipelines supporting posts, stories, and video reels.",
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.IO",
        "WebRTC",
        "Tailwind CSS",
        "Cloudinary",
      ],
      githubUrl: "https://github.com/Varshith-kummarikunta/instagram-clone",
      liveUrl: "https://instagram-clone-two-ashy.vercel.app",
      liveLabel: "Live Demo",
      screenshotPath: "/images/projects/instagram-clone.webp",
    },

    {
      number: "03",
      title: "AI Resume Matcher Chrome Extension",
      description:
        "Manifest V3 Chrome Extension powered by Groq AI (Llama 3.3 70B) and an Express.js backend. Extracts candidate resume text from PDF buffers in-memory to compute deterministic ATS match scores, keyword gap analyses, interview probabilities, and exportable PDF audit reports.",
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "Groq AI",
        "Chrome Extension Manifest V3",
        "PDF Parsing",
      ],
      githubUrl:
        "https://github.com/Varshith-kummarikunta/AI-Resume-Matcher-Chrome-Extension",
      liveUrl:
        "https://drive.google.com/file/d/1TcZ44yC6a6Ku2NlEz5rR5mqnC8XqYRWQ/view",
      liveLabel: "Video Walkthrough",
      screenshotPath: "/images/projects/resume-matcher.webp",
    },
  ],
  projectsIntro: {
    eyebrow: "Projects",
    titleLines: ["Selected work", "that defines my journey."],
    description:
      "A collection of projects showcasing modern frontend engineering, full stack development, performance optimization, and interactive user experiences.",
    visitLabel: "Visit Project",
    githubLabel: "GitHub",
  },
  travel: [
    {
      location: "Kedarkantha Trek",
      subtitle: "Snow mountains & adventure",
      imagePath: "/images/travel/juda_Ka_talab.webp",
      variant: "portrait-primary",
    },
    {
      location: "Lambasingi",
      subtitle: "Mist and mountains",
      imagePath: "/images/travel/lambasingi.webp",
      variant: "portrait-mist",
    },
    {
      location: "Beach Exploration",
      subtitle: "Ocean and sunsets",
      imagePath: "/images/travel/beach.webp",
      variant: "portrait-beach",
    },
    {
      location: "Village Life",
      subtitle: "Simple moments",
      imagePath: "/images/travel/aura_farming.webp",
      variant: "tall-village",
    },
    {
      location: "Sunrise Moments",
      subtitle: "New beginnings",
      imagePath: "/images/travel/sunrise.webp",
      variant: "portrait-sunrise",
    },
    {
      location: "Sunset Moments",
      subtitle: "Golden hour reflections",
      imagePath: "/images/travel/sunset.webp",
      variant: "square-sunset",
    },
  ],
  travelIntro: {
    eyebrow: "Travel",
    titleLines: ["Every destination", "changed my perspective."],
    description:
      "Exploring landscapes and cultures shapes my perspective on design. Travel teaches me composition, storytelling, and the beauty of simple experiences.",
  },
  artGallery: {
    eyebrow: "Creative Work",
    titleLines: ["Beyond Code,", "Through Art."],
    description:
      "Sketching has always been a way for me to observe, create, and tell stories beyond technology.",
    emptyMessage: "New studies are being prepared.",
    images: [
      {
        src: "/images/sketches/IMG_20250202_222721.webp",
        title: "Quiet Resolve",
        category: "Charcoal Portrait",
        year: "2025",
        description: "A textured charcoal study of a man in profile.",
        alt: "Charcoal portrait of a man in profile wearing a jacket.",
      },
      {
        src: "/images/sketches/IMG_20250214_173659.webp",
        title: "The Ensemble",
        category: "Charcoal Portrait",
        year: "2025",
        description:
          "A dramatic group portrait built through light and shadow.",
        alt: "Charcoal drawing of three people, with a man in a tuxedo in the foreground.",
      },
      {
        src: "/images/sketches/IMG_20250217_144403.webp",
        title: "Edge of Light",
        category: "Charcoal Portrait",
        year: "2025",
        description: "A close portrait study with strong directional lighting.",
        alt: "High-contrast charcoal portrait of a man looking to the side.",
      },
      {
        src: "/images/sketches/IMG_20250302_234810.webp",
        title: "Blue Hours",
        category: "Color Pencil",
        year: "2025",
        description: "A color pencil portrait set against a nocturnal scene.",
        alt: "Color pencil drawing of a woman with blue hair against a dark blue background.",
      },
      {
        src: "/images/sketches/IMG_20250330_154952.webp",
        title: "Cricket Study",
        category: "Color Pencil",
        year: "2025",
        description: "A multi-panel tribute to the energy of the game.",
        alt: "Color pencil collage featuring a cricketer and several cricket scenes.",
      },
      {
        src: "/images/sketches/IMG_20260519_213035.webp",
        title: "Winged Guardian",
        category: "Ink Illustration",
        year: "2026",
        description:
          "An intricate sepia drawing of a winged warrior and serpent.",
        alt: "Sepia ink illustration of a winged warrior with a spear beside a serpent.",
      },
      {
        src: "/images/sketches/IMG_20260519_231422.webp",
        title: "Winged Guardian — Detail",
        category: "Ink Illustration",
        year: "2026",
        description:
          "A close study of the finished winged warrior composition.",
        alt: "Detailed sepia illustration of a winged warrior holding a spear above a serpent.",
      },
      {
        src: "/images/sketches/IMG_20260522_231054.webp",
        title: "Strings of Memory",
        category: "Graphite Illustration",
        year: "2026",
        description:
          "A tonal study of a musician and a traditional string instrument.",
        alt: "Graphite drawing of a musician playing a traditional string instrument.",
      },
      {
        src: "/images/sketches/IMG_20260605_200430.webp",
        title: "Sharing the Work",
        category: "Art Documentation",
        year: "2026",
        description: "A moment from an art presentation and sketch showcase.",
        alt: "Photo of an art presentation with people displaying sketches in front of a classroom board.",
      },
      {
        src: "/images/sketches/Picsart_25-02-03_22-23-31-464.webp",
        title: "Classic Study",
        category: "Charcoal Portrait",
        year: "2025",
        description: "A carefully rendered front-facing portrait in charcoal.",
        alt: "Charcoal portrait of a man in a suit and tie.",
      },
      {
        src: "/images/sketches/Picsart_25-02-13_23-56-02-773.webp",
        title: "Messenger",
        category: "Graphite Illustration",
        year: "2025",
        description: "A portrait balanced with the silhouette of a raven.",
        alt: "Graphite drawing of a woman in profile beside a black raven.",
      },
      {
        src: "/images/sketches/Picsart_25-02-21_02-15-44-195.webp",
        title: "Beyond the Horizon",
        category: "Concept Study",
        year: "2025",
        description:
          "A visual notebook of space, science, and cinematic portrait studies.",
        alt: "Detailed sketchbook page with space diagrams, handwritten notes, and character portraits.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    titleLines: ["Let's build", "something remarkable."],
    description:
      "Whether it's a freelance project, a full-time opportunity, or simply a conversation about technology and design, I'd love to hear from you.",
    availability: "Open to opportunities",
    sendEmailLabel: "Send Email",
    downloadResumeLabel: "Download Resume",
  },
  footer: {
    copyright: "\u00A9 2026 Beyond Horizon. All rights reserved.",
    stack: ["React", "Tailwind CSS", "GSAP", "Lenis", "Vite"],
    backToTopLabel: "Back to top",
  },
  loader: { label: "PORTFOLIO 2026" },
};
