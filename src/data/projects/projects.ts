export interface ProjectData {
  id?: string
  title: string
  image?: string
  description: string
  features: string[]
  technologies: string[]
  liveLink?: string
  githubLink?: string
  weeklyRank?: 1 | 2 | 3
  weeklyTrend?: 'up' | 'down' | 'steady' | 'new'
  weeklyDelta?: number
}

export const projectsData: ProjectData[] = [
  {
    title: 'SangamAI',
    image: '/sangam-ai.jpeg',
    description:
      'A production-grade RAG platform that turns PDFs, YouTube videos, and CSV files into interactive conversational knowledge bases.',
    features: [
      'Multi-modal ingestion for PDF, YouTube transcript, and CSV datasets',
      'FastAPI + Next.js architecture with persistent user chat history',
      'FAISS-powered retrieval with context-aware answer generation',
      'Terminal-inspired UI pipeline and split-view document chatting',
    ],
    technologies: ['Next.js', 'FastAPI', 'Python', 'LangChain', 'FAISS', 'Firebase'],
    githubLink: 'https://github.com/ANAS727189/SangamAI',
    weeklyRank: 1,
    weeklyTrend: 'up',
    weeklyDelta: 2,
  },
  {
    title: 'Trunk',
    image: '/Trunk.jpeg',
    description:
      'A functional implementation of the Git core protocol in Go, compatible with real .git structures and object workflows.',
    features: [
      'Implements content-addressable object storage with SHA-1 + zlib compression',
      'Supports blob, tree, commit, and reference internals',
      'Provides manual plumbing commands and automated commit lifecycle',
      'Demonstrates Merkle tree and DAG-based version history mechanics',
    ],
    technologies: ['Go', 'Git internals', 'SHA-1', 'Zlib', 'CLI'],
    githubLink: 'https://github.com/ANAS727189/Trunk',
    weeklyRank: 2,
    weeklyTrend: 'down',
    weeklyDelta: 1,
  },
  {
    title: 'SolThrone',
    image: '/solthrone.png',
    description:
      'A Solana-based King-of-the-Hill game where players outbid each other to hold the throne and win the jackpot.',
    features: [
      'On-chain gameplay with anti-snipe timer extensions',
      'Instant ROI payouts for dethroned monarchs',
      'Anchor smart contract for secure game-state management',
      'Realtime gameplay dashboard with wallet integration',
    ],
    technologies: ['Next.js', 'TypeScript', 'Solana', 'Anchor', 'Rust', 'Tailwind CSS'],
    liveLink: 'https://who-wants-to-be-a-king.vercel.app/',
    githubLink: 'https://github.com/ANAS727189/SolThrone',
    weeklyRank: 3,
    weeklyTrend: 'new',
  },
  {
    title: 'Pixel UI - 8-Bit Component Library',
    image: '/pixel-art.png',
    description:
      'A retro-styled UI component library and docs platform with pixel-perfect design system, demos, and accessibility-focused components.',
    features: [
      'Large set of pixel-style UI components with interactive examples',
      'Docs site with live previews, usage guides, and props tables',
      'Redux-powered demo experiences with real filtering and search',
      'Next.js + TypeScript architecture with modern tooling',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Redux', 'Biome'],
    liveLink: 'https://pixel8-ui.vercel.app/',
    githubLink: 'https://github.com/Team-Parashuram/Pixel-art-8-bit',
  },
  {
    title: 'BountyStack',
    image: '/bounty-stack.png',
    description:
      'A Web3-native Q&A platform on Solana where users attach bounties to questions and experts compete to earn rewards through trustless escrow.',
    features: [
      'Trustless escrow for SOL bounties using Solana Program Derived Addresses',
      'Automated bounty settlement with atomic on-chain transactions',
      'Wallet-integrated Q&A marketplace with transparent incentives',
      'Full-stack architecture with Next.js, Express, MongoDB, and Anchor programs',
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Solana', 'Rust'],
    liveLink: 'https://bounty-stack.vercel.app/',
    githubLink: 'https://github.com/ANAS727189/Bounty-Stack',
  },
  {
    title: 'Heisenberg Protocol',
    image: '/heisenberg.png',
    description:
      'An autonomous cyber-resilience and self-healing platform that injects chaos, detects vulnerabilities, and opens fix pull requests with orchestration workflows.',
    features: [
      'Automated chaos testing with k6 in isolated Docker environments',
      'Closed-loop detect and remediate workflow with generated code fixes',
      'Command center dashboard for real-time threat and traffic monitoring',
      'Kestra-orchestrated security pipeline with AI-assisted remediation',
    ],
    technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'Python', 'Docker', 'Kestra', 'Grafana'],
    githubLink: 'https://github.com/ANAS727189/Heisenberg',
  },
  {
    title: 'Bolt - Asteroids Game',
    image: '/asteroid-game.png',
    description:
      'A lightning-fast arcade space shooter with unlockable weapon progression, dynamic effects, and smooth 60 FPS gameplay built with Python and Pygame.',
    features: [
      'Five unlockable weapons with different firing patterns and mechanics',
      'Dynamic starfield and explosion effects for immersive gameplay',
      'Progressive difficulty with score-based unlock milestones',
      'Cross-platform packaging with PyInstaller and automated release builds',
    ],
    technologies: ['Python', 'Pygame', 'PyInstaller', 'GitHub Actions'],
    githubLink: 'https://github.com/ANAS727189/Asteroids-Game',
  },
  {
    title: 'TreasureHunt',
    image: '/treasure-hunt.png',
    description:
      'A gamified hiring challenge website designed as a puzzle-based talent hunt with one winning path and multiple decoy routes.',
    features: [
      'Puzzle-driven progression with multiple fail states and one winning route',
      'Security-focused route and path validation improvements',
      'High-traffic capable setup used during live challenge campaigns',
      'Interactive experience engineered for engagement and curiosity',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveLink: 'https://kya-tumhe-naukri-milegi-i-dont-think-so.vercel.app/',
    githubLink: 'https://github.com/ANAS727189/TreasureHunt',
  },
  {
    title: 'Z-Arena',
    image: '/z-arena.png',
    description:
      'A full-stack competitive programming platform supporting Z-- and popular languages, with battles, streaks, and leaderboard-driven gameplay.',
    features: [
      'Custom Z-- compiler integration with Judge0 multi-language execution',
      'Competitive modes including war battles, streaks, and achievements',
      'Challenge system with extensible schema-validated JSON problem sets',
      'Cloud-ready architecture with Appwrite, Dockerized backend, and CI workflows',
    ],
    technologies: ['React.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Docker', 'Appwrite'],
    githubLink: 'https://github.com/ANAS727189/Z-Arena',
  },
  {
    "title": "Z-Studio",
    "image": "/z-studio.png",
    "description": "A full-featured development environment for the custom Z-- programming language, integrating a web-based code editor, a custom-built compiler backend, and server APIs for multi-language support.",
    "features": [
      "Custom Z-- language with minimal, expressive syntax and first-class functions",
      "From-scratch compiler with lexer, parser, AST, C code generation, and LLVM IR output",
      "Dead-code elimination and basic optimizations",
      "Modern web IDE with real-time syntax highlighting, multi-file support, and integrated console",
      "Server backend with secure API routes for Z-- and multi-language compilation via Judge0",
      "Support for multiple languages including C, C++, Java, Python, Go, and Rust"
    ],
    "technologies": [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Judge0 API",
      "LLVM",
      "C",
      "JavaScript"
    ],
    "liveLink": "https://z-studio.vercel.app/",
    "githubLink": "https://github.com/ANAS727189/Z-Studio"
  },
  {
    "title": "Smart File Organizer",
    "image": "/file-organiser.png",
    "description": "A cross-platform Electron + Python desktop app to automate file organization, remove duplicates, and visualize analytics with a cyberpunk-inspired terminal UI.",
    "features": [
      "Automated file organization by type, date, or size",
      "Duplicate file detection and removal with parallel processing",
      "Real-time file monitoring and auto-organization",
      "Interactive analytics dashboard with Chart.js",
      "Built-in file previews for images, PDFs, and text",
      "Customizable organization rules and categories",
      "Cyberpunk terminal-style UI with animations"
    ],
    "technologies": [
      "Electron",
      "JavaScript",
      "HTML/CSS",
      "Python",
      "Chart.js",
      "watchdog",
      "tqdm",
      "colorama"
    ],
    "githubLink": "https://github.com/ANAS727189/SmartFileOrganizer"
  },
  {
    "title": "Dhvani - Comprehensive Health Management Platform",
    "image": "/dhvani-home.png",
    "description": "A modular, full-stack healthcare system with microservices in Go, Node.js, and Python, featuring AI-powered diagnostics, chatbot integration, blood bank management, and nutrition analysis.",
    "features": [
      "Role-based dashboards for patients, organizations, and admins",
      "Blood bank inventory, donation, and request management",
      "AI chatbot with LLM integration (Google Gemini, DeepSeek)",
      "Medical image analysis for TB detection and segmentation",
      "Personalized nutrition planning and recommendations",
      "Interactive maps and charts for healthcare data visualization"
    ],
    "technologies": [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Go",
      "Python",
      "MongoDB",
      "Redis",
      "PyTorch",
      "Leaflet",
      "Recharts"
    ],
    "liveLink": "https://dhvani.mayankdev.com/",
    "githubLink": "https://github.com/ANAS727189/Dhvani"
  },
  {
    "title": "Tokenova",
    "image": "/tokenova.png",
    "description": "A blockchain-powered event ticketing platform leveraging AI and NFT technology to enable secure, transparent, and decentralized event management.",
    "features": [
      "Blockchain-based NFT ticket creation, sale, and verification",
      "AI-driven conversational agents for event discovery",
      "Fraud-resistant and fully decentralized ticketing",
      "User-friendly event exploration and booking interface"
    ],
    "technologies": [
      "Solidity",
      "Ethers.js",
      "Wagmi",
      "React.js",
      "TypeScript",
      "OpenZeppelin",
      "Ethereum"
    ],
    "liveLink": "https://tokenova.vercel.app/",
    "githubLink": "https://github.com/ANAS727189/TokeNova"
  },
  {
    "title": "Hungrr",
    "image": "/hungrr.png",
    "description": "A modern full-stack food delivery platform with restaurant discovery, real-time order tracking, Stripe payments, and a custom campus canteen module.",
    "features": [
      "Smart restaurant discovery with advanced filtering",
      "Real-time order tracking from kitchen to doorstep",
      "Secure Stripe-based payment processing",
      "Personalized recommendations based on user history",
      "Restaurant dashboard for menu and order management",
      "Campus canteen ordering system"
    ],
    "technologies": [
      "React.js",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Stripe",
      "Cloudinary",
      "Auth0"
    ],
    "liveLink": "https://hungrr-sage.vercel.app/",
    "githubLink": "https://github.com/Night-Legion/Food_Delivery"
  },
  {
    title: "AutoML-MLOps",
    image: "/auto-ml-cropped.png",
    description:
      "A comprehensive platform that simplifies the machine learning workflow by automating model development, training, and deployment. With features like real-time dashboards, interactive data visualization, and automated target selection.",
    features: [
      "Automated end-to-end ML pipeline with intuitive drag-and-drop interface for dataset upload and model configuration",
      "Real-time training dashboard with interactive visualizations and progress monitoring",
      "Smart preprocessing engine with automated feature engineering and target variable detection",
      "Comprehensive model evaluation suite featuring customizable metrics and performance comparisons",
      "Flexible architecture supporting both automated workflows for beginners and custom configurations for experts",
    ],
    technologies: [
      "Next.js",
      "Python3",
      "Typescript",
      "Scikit-learn",
      "TailwindCSS",
      "recharts",
    ],
    githubLink: "https://github.com/ANAS727189/AutoML-MLOps/",
  },
  {
    title: "AttendEase",
    image: "/attend-ease.png",
    description:
      "A centralized platform designed for efficient student record management, attendance tracking, and personalized course recommendations based on student grade.",
    features: [
      "Upload and manage courses by grade with YouTube-like video interface",
      "Comprehensive student data management and grade organization",
      "Efficient attendance tracking with date-wise and grade-wise filtering",
      "Intuitive dashboard with modern UI and seamless navigation",
      "Real-time updates and responsive design for all devices",
    ],
    technologies: ["Next.js", "React.js", "Node.js", "MongoDB", "Mongoose"],
    liveLink: "https://attend-ease-iota.vercel.app/",
    githubLink: "https://github.com/ANAS727189/AttendEase",
  },
  {
    title: "CloudKeeper",
    image: "/cloudkeeper.png",
    description:
      "A modern take on cloud storage, offering space-efficient file management and AI-powered file analysis. It's designed to provide a seamless experience for users who need more than just storage - they need intelligent interaction with their data.",
    features: [
      "Enterprise-level storage system with Cloudinary-powered compression that automatically optimizes files while maintaining quality",
      "AI-enhanced file analysis powered by Google's Gemini API for intelligent data insights and natural language queries",
      "Modern, intuitive dashboard featuring real-time storage metrics and visual file type analytics",
      "Comprehensive file management system with advanced search, filtering, and organization capabilities",
      "Secure authentication and file-sharing infrastructure ensuring data protection and privacy",
    ],
    technologies: [
      "Next.js",
      "React.js",
      "Appwrite",
      "Cloudinary",
      "Gemini-api",
      "shadcn",
    ],
    liveLink: "https://cloud-keeper.vercel.app/",
    githubLink: "https://github.com/ANAS727189/CloudKeeper",
  },
  {
    title: "MediaHub",
    image: "/media-hub.png",
    description:
      "A robust platform designed for video streaming, media editing, and user management, combining seamless streaming capabilities with powerful editing tools.",
    features: [
      "Advanced video streaming with upload and management capabilities",
      "Professional-grade media editor for images and videos",
      "Secure user authentication and personalized experiences",
      "Responsive design optimized for various devices",
      "Dark/Light mode theme support for comfortable viewing",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Clerk",
      "FFmpeg",
    ],
    liveLink: "https://front-media.onrender.com/",
    githubLink: "https://github.com/ANAS727189/MediaHub",
  },
  {
    title: "ProspectIQ",
    image: "/prospect-iq-cropped.png",
    description:
      "A cutting-edge tool for B2B sales and marketing teams, combining web scraping, AI-powered data enrichment, and real-time analytics to streamline the lead generation process and provide actionable insights.",
    features: [
      "Automated lead generation system powered by Crunchbase API with continuous data scraping and enrichment.",
      "AI-driven data analysis using Google's Gemini API for comprehensive prospect profiling and insights.",
      "Real-time SERP intelligence providing up-to-date company digital footprints and market presence.",
      "Advanced analytics dashboard featuring interactive visualizations and performance metrics.",
      "Automated 4-hour data refresh cycle ensuring consistently updated prospect information.",
    ],
    technologies: [
      "Python3",
      "React.js",
      "Flask",
      "SERP-API",
      "Crunchbase API",
      "shadcn",
    ],
    githubLink: "https://github.com/ANAS727189/ProspectIQ",
  },
  {
    title: "BuzzChat",
    image: "/buzz-chat-cropped.png",
    description:
      "🐝 BuzzChat is a real-time messaging app with React, Node.js, Socket.io. Secure auth, customizable themes, instant messaging. Full-stack modern chat solution !",
    features: [
      "Real-time messaging system powered by Socket.io enabling instant communication and live status updates",
      "Robust authentication infrastructure using JWT for secure user access and data protection",
      "Dynamic theme customization allowing personalized user experience and interface preferences",
      "Comprehensive user profile system with Cloudinary-powered avatar management",
      "Advanced messaging features including typing indicators and online/offline status tracking",
    ],
    technologies: [
      "Nodejs",
      "React.js",
      "ExpressJS",
      "MongoDB",
      "DaisyUI",
      "Cloudinary",
      "Zustand",
      "tailwindcss",
    ],
    liveLink: "https://buzz-chat-qtdn.onrender.com/",
    githubLink: "https://github.com/ANAS727189/Buzzchat",
  },
];
