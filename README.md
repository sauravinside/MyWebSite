Saurav Singh - Advanced Portfolio Website
Welcome to the repository for Saurav Singh's personal portfolio website. This modern, interactive site showcases Saurav's skills and experience as a Cloud Engineer and DevOps Specialist through immersive animations, terminal aesthetics, and 3D elements.

Show Image

Features
Interactive Terminal Experience: A fully functional terminal interface that responds to commands like ls, cd, cat, and more.
Scroll-Based Animations: Smooth transitions between sections that create a continuous storytelling experience.
3D Elements: Cloud infrastructure visualization using Three.js and React Three Fiber.
Modern Design: Sleek, futuristic aesthetic with bold typography and subtle motion effects.
Responsive Layout: Fully optimized for all device sizes.
Terminal/Linux Aesthetic: Dark mode terminal theme with command-line interactions.
Performance Optimized: Efficient animations and 3D rendering for smooth experience.
Tech Stack
Framework: Next.js 14 (App Router)
Styling: Tailwind CSS
Animation Libraries:
Framer Motion for UI animations
GSAP with ScrollTrigger for scroll-based animations
Lenis for smooth scrolling
3D Rendering: React Three Fiber (R3F) with Three.js
Terminal Emulation: Custom React terminal component
Type Safety: TypeScript
Getting Started
Prerequisites
Node.js 18.x or higher
npm or yarn
Installation
Clone the repository:
bash
git clone https://github.com/yourusername/saurav-portfolio.git
cd saurav-portfolio
Install dependencies:
bash
npm install
# or
yarn install
Start the development server:
bash
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser to see the result.
Project Structure
saurav-portfolio/
├── public/                  # Static files
│   ├── fonts/               # Custom fonts
│   ├── images/              # Images and icons
│   │   ├── certifications/  # Certification badges
│   │   ├── projects/        # Project screenshots
│   │   └── backgrounds/     # Background patterns
│   └── models/              # 3D models
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── ui/              # UI components
│   │   ├── sections/        # Page sections
│   │   ├── 3d/              # Three.js components
│   │   ├── terminal/        # Terminal components
│   │   └── animations/      # Animation components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and libraries
│   ├── constants/           # Constants and data
│   └── types/               # TypeScript type definitions
└── ...config files          # Various configuration files
Key Components
Terminal
The terminal component is a fully interactive command-line interface that supports various commands to navigate and explore the portfolio. It responds to commands such as:

help - Show available commands
about - Display information about Saurav Singh
skills - List technical skills
experience - Show work experience
cd [section] - Navigate to a specific section
ls - List all sections
cat [file] - View content of a file
3D Elements
The portfolio includes several 3D components built with React Three Fiber:

CloudScene.tsx - A visualization of cloud infrastructure with servers and connections
ParticleField.tsx - A dynamic particle background for the hero section
Scroll Animation
Smooth scrolling and scroll-based animations are implemented using:

Lenis for smooth scrolling behavior
GSAP ScrollTrigger for scroll-based animations
Framer Motion for element animations
Customization
Colors and Theme
The color scheme is defined in tailwind.config.ts and can be easily modified:

typescript
colors: {
  terminal: {
    black: '#282a36',
    gray: '#44475a',
    white: '#f8f8f2',
    blue: '#6272a4',
    cyan: '#8be9fd',
    green: '#50fa7b',
    orange: '#ffb86c',
    pink: '#ff79c6',
    purple: '#bd93f9',
    red: '#ff5555',
    yellow: '#f1fa8c',
  },
  aws: '#FF9900',
  gcp: '#4285F4',
  azure: '#0078D4',
  oci: '#F80000',
}
Content
Update personal information by modifying the data files in the src/constants/ directory:

experience.ts
projects.ts
skills.ts
certifications.ts
Deployment
The site can be easily deployed to Vercel:

bash
npm run build
# or
yarn build
Then deploy the output to your preferred hosting provider. For Vercel, you can use:

bash
vercel
Credits
Fonts: Inter and JetBrains Mono from Google Fonts
Icons: React Icons library
3D Models: Custom-created for this project
Animation Libraries: Framer Motion, GSAP, and Lenis
License
This project is licensed under the MIT License - see the LICENSE file for details.

Author
Saurav Singh - Cloud Engineer & DevOps Specialist

Website: www.sauravsingh.tech
LinkedIn: linkedin.com/in/saurav-singh-81321b16a
GitHub: github.com/sauravinside
