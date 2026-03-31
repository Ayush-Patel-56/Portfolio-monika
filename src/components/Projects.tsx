import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { HiOutlineBeaker } from 'react-icons/hi';

interface Project {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    isLive?: boolean;
    githubUrl?: string;
    liveUrl?: string;
    tags: string[];
    banner: 'gradient' | 'screenshot' | 'icon';
    bannerConfig: {
        gradient?: string;
        icon?: string;
        iconColor?: string;
        screenshotBg?: string;
        screenshotContent?: 'dashboard' | 'table' | 'music' | 'farm';
    };
    size: 'normal' | 'featured' | 'wide';
}

const flagshipProjects: Project[] = [
    {
        id: 'web-audio',
        title: 'Web Audio Player',
        description:
            'A high-performance web-based audio player with real-time visualizations and advanced control mechanics using the Web Audio API.',
        isLive: true,
        githubUrl: 'https://github.com/jakharmonika364/Web-audio-player',
        tags: ['JavaScript', 'Web Audio API', 'Canvas', 'HTML5'],
        banner: 'gradient',
        bannerConfig: {
            gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
            icon: '🎵',
        },
        size: 'normal',
    },
    {
        id: 'food-tracker',
        title: 'Sustainable Food Tracker',
        description:
            'Track your food consumption and carbon footprint with smart analytics and sustainability recommendations.',
        isLive: true,
        githubUrl: 'https://github.com/jakharmonika364/Sustainable-Food-Tracker',
        tags: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
        banner: 'screenshot',
        bannerConfig: {
            screenshotBg: 'linear-gradient(135deg, #0d4f3c 0%, #1a7a56 100%)',
            screenshotContent: 'dashboard',
        },
        size: 'featured',
    },
    {
        id: 'attendance',
        title: 'Student Attendance System',
        description:
            'Automated attendance tracking system for educational institutions with real-time monitoring and analytics.',
        isLive: true,
        liveUrl: '#',
        tags: ['Java', 'MySQL', 'Spring Boot', 'Thymeleaf'],
        banner: 'screenshot',
        bannerConfig: {
            screenshotBg: 'linear-gradient(135deg, #1e3a5f 0%, #2d5986 100%)',
            screenshotContent: 'table',
        },
        size: 'normal',
    },
    {
        id: 'soniq',
        title: 'Soniq Music Player',
        subtitle: 'Music Player',
        description:
            'A modern, feature-rich music player with advanced audio controls, playlist management, and beautiful UI design.',
        isLive: true,
        liveUrl: '#',
        githubUrl: 'https://github.com/jakharmonika364/soniq-music-player',
        tags: ['React', 'Web Audio API', 'IndexedDB', 'CSS'],
        banner: 'icon',
        bannerConfig: {
            gradient: 'linear-gradient(135deg, #6d28d9 0%, #db2777 60%, #f97316 100%)',
            icon: '〜',
            iconColor: '#ffffff',
        },
        size: 'wide',
    },
    {
        id: 'ecobite',
        title: 'EcoBite Food Tracker',
        description:
            'Sustainability-focused web app for tracking food environmental impact with product scanning (OpenFoodFacts API) and gamification features.',
        isLive: false,
        githubUrl: 'https://github.com/jakharmonika364/Food',
        tags: ['JS/ES6', 'Chart.js', 'QuaggaJS', 'API'],
        banner: 'screenshot',
        bannerConfig: {
            screenshotBg: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
            screenshotContent: 'farm',
        },
        size: 'normal',
    },
];

// Mock UI previews for banner screenshots
function DashboardPreview() {
    return (
        <div className="w-full h-full flex flex-col gap-1 p-2">
            {/* Toolbar */}
            <div className="flex items-center gap-1 mb-1">
                <div className="h-2 w-2 rounded-full bg-red-400/70" />
                <div className="h-2 w-2 rounded-full bg-yellow-400/70" />
                <div className="h-2 w-2 rounded-full bg-green-400/70" />
                <div className="flex-1 h-2 bg-white/10 rounded ml-2" />
            </div>
            {/* Nav row */}
            <div className="flex gap-1">
                {[3, 4, 3].map((w, i) => (
                    <div key={i} style={{ width: `${w * 12}px` }} className="h-1.5 bg-white/20 rounded" />
                ))}
            </div>
            {/* Cards */}
            <div className="flex gap-1 mt-1">
                {['bg-emerald-400/60', 'bg-blue-400/40', 'bg-purple-400/40'].map((c, i) => (
                    <div key={i} className={`flex-1 h-6 rounded ${c}`} />
                ))}
            </div>
            {/* Chart area */}
            <div className="flex-1 bg-white/5 rounded flex items-end gap-0.5 px-1 pb-1 mt-1">
                {[40, 65, 45, 80, 55, 70, 50, 85, 60].map((h, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-t bg-emerald-400/60"
                        style={{ height: `${h}%` }}
                    />
                ))}
            </div>
        </div>
    );
}

function TablePreview() {
    return (
        <div className="w-full h-full flex flex-col p-2 gap-1">
            {/* Header bar */}
            <div className="h-4 bg-blue-500/30 rounded flex items-center px-2 gap-2">
                <div className="h-1.5 w-12 bg-white/50 rounded" />
                <div className="ml-auto h-3 w-8 bg-red-400/70 rounded" />
            </div>
            {/* Stat boxes */}
            <div className="flex gap-1">
                {['bg-blue-400/40', 'bg-cyan-400/30', 'bg-purple-400/30'].map((c, i) => (
                    <div key={i} className={`flex-1 h-5 rounded ${c} flex items-center justify-center`}>
                        <div className="h-1 w-6 bg-white/50 rounded" />
                    </div>
                ))}
            </div>
            {/* Table rows */}
            {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-1 items-center">
                    <div className="h-1.5 w-8 bg-white/20 rounded" />
                    <div className="h-1.5 flex-1 bg-white/10 rounded" />
                    <div className={`h-3 w-8 rounded ${i % 2 === 0 ? 'bg-green-400/60' : 'bg-blue-400/40'}`} />
                </div>
            ))}
        </div>
    );
}

function FarmPreview() {
    return (
        <div className="w-full h-full relative overflow-hidden">
            {/* Sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 to-green-600/20" />
            {/* Field rows */}
            <div className="absolute bottom-0 w-full flex flex-col gap-0.5 p-2">
                <div className="text-center text-white/60 text-xs font-semibold mb-1">Get the Best Crop Recommendations</div>
                {[70, 60, 50].map((w, i) => (
                    <div key={i} className="h-2 bg-green-400/40 rounded mx-auto" style={{ width: `${w}%` }} />
                ))}
                <div className="flex gap-2 mt-1 justify-center">
                    {['Soil', 'Water', 'Temp'].map(label => (
                        <div key={label} className="text-green-400/60 text-xs">{label}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function BannerContent({ project }: { project: Project }) {
    if (project.banner === 'gradient' || project.id === 'web-audio') {
        return (
            <div
                className="w-full h-full flex items-center justify-center relative"
                style={{ background: project.bannerConfig.gradient }}
            >
                {/* Floating dots */}
                <div className="absolute inset-0 overflow-hidden">
                    {[
                        { top: '30%', left: '20%', color: '#a855f7', size: 12 },
                        { top: '60%', left: '70%', color: '#6366f1', size: 8 },
                        { top: '20%', left: '50%', color: '#818cf8', size: 6 },
                    ].map((dot, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                top: dot.top,
                                left: dot.left,
                                width: dot.size,
                                height: dot.size,
                                background: dot.color,
                                filter: 'blur(1px)',
                                opacity: 0.8,
                            }}
                        />
                    ))}
                </div>
                {/* Decorative lines */}
                <div className="absolute inset-0 flex flex-col justify-center gap-2 px-6 opacity-40">
                    {[80, 60, 70, 50].map((w, i) => (
                        <div key={i} className="h-1.5 bg-white/20 rounded" style={{ width: `${w}%` }} />
                    ))}
                </div>
            </div>
        );
    }

    if (project.banner === 'icon') {
        return (
            <div
                className="w-full h-full flex flex-col items-center justify-center gap-2 relative overflow-hidden"
                style={{ background: project.bannerConfig.gradient }}
            >
                {/* Glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                </div>
                {/* Icon circle */}
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30 relative z-10">
                    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                        <path d="M8 20 Q14 10 20 15 Q26 20 32 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    </svg>
                </div>
                {/* Labels */}
                <p className="text-white font-bold text-lg relative z-10">{project.title}</p>
                <p className="text-white/70 text-sm relative z-10">{project.subtitle}</p>
                {/* Progress bar */}
                <div className="w-24 h-1 bg-white/20 rounded-full mt-1 relative z-10">
                    <div className="w-12 h-full bg-white/60 rounded-full" />
                </div>
            </div>
        );
    }

    // screenshot type
    const bg = project.bannerConfig.screenshotBg ?? 'linear-gradient(135deg, #1a1a2e, #16213e)';
    return (
        <div className="w-full h-full relative overflow-hidden" style={{ background: bg }}>
            <div className="absolute inset-0 p-2">
                {project.bannerConfig.screenshotContent === 'dashboard' && <DashboardPreview />}
                {project.bannerConfig.screenshotContent === 'table' && <TablePreview />}
                {project.bannerConfig.screenshotContent === 'farm' && <FarmPreview />}
            </div>
        </div>
    );
}

function LiveBadge() {
    return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
        </span>
    );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
    const isFeatured = project.size === 'featured';
    const isWide = project.size === 'wide';

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay, duration: 0.55, ease: 'easeOut' }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-2xl overflow-hidden flex flex-col group"
            style={{
                background: 'rgba(13, 21, 38, 0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
                gridRow: isFeatured ? 'span 1' : undefined,
            }}
        >
            {/* Banner */}
            <div
                className="relative flex-shrink-0 overflow-hidden"
                style={{ height: isWide ? '160px' : isFeatured ? '160px' : '120px' }}
            >
                <BannerContent project={project} />
                {/* Live badge overlay */}
                {project.isLive && (
                    <div className="absolute top-3 right-3">
                        <LiveBadge />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2.5 flex-1">
                {/* Title row */}
                <div className="flex items-center gap-2">
                    <HiOutlineBeaker size={14} className="text-cyan-400 flex-shrink-0" />
                    <h3 className="text-white font-bold text-sm leading-tight group-hover:text-cyan-400 transition-colors duration-200">
                        {project.title}
                    </h3>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs leading-relaxed flex-1">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map(tag => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-xs text-slate-400"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-1 border-t border-white/5">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            id={`github-${project.id}`}
                            className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            <FiGithub size={12} />
                            GitHub
                            <FiExternalLink size={10} />
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            id={`live-${project.id}`}
                            className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            Live Demo
                            <FiExternalLink size={10} />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    const row1 = flagshipProjects.filter(p => ['web-audio', 'food-tracker', 'attendance'].includes(p.id));
    const row2 = flagshipProjects.filter(p => ['soniq', 'ecobite'].includes(p.id));

    return (
        <section id="projects" ref={ref} className="py-24 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl font-black text-white text-center mb-10 sm:mb-14"
            >
                Flagship <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee, #818cf8)' }}>Projects</span>
            </motion.h2>

            {/* Row 1 — 3 column bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                {row1.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} delay={idx * 0.1 + 0.1} />
                ))}
            </div>

            {/* Row 2 — wide + normal */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* Wide card spans 3 cols */}
                <div className="lg:col-span-3">
                    <ProjectCard project={row2[0]} delay={0.4} />
                </div>
                {/* Normal card spans 2 cols */}
                <div className="lg:col-span-2">
                    <ProjectCard project={row2[1]} delay={0.5} />
                </div>
            </div>
        </section>
    );
}
