import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiChevronRight, FiCalendar, FiShield } from 'react-icons/fi';

interface OpenSourceProject {
    title: string;
    org: string;
    badge: string;
    description: string;
    bannerColor: [string, string]; // gradient from-to
    bgPattern?: string;
    accentColor: string;
    tags: string[];
    contributions: string[];
    credentialUrl: string;
}

const openSourceProjects: OpenSourceProject[] = [
    {
        title: 'Contributor — Kyverno',
        org: 'Kyverno',
        badge: 'CNCF 2026',
        description:
            'Kyverno is a cloud-native policy engine for Kubernetes — designed to validate, mutate, and generate configurations seamlessly without custom code.',
        bannerColor: ['#0f2a1a', '#0d4726'],
        accentColor: '#4ade80',
        tags: ['Go', 'Kubernetes', 'Policy', 'CNCF', 'CLI'],
        contributions: [
            'Fixed CLI test errors masked as "excluded" — PR #15708 targeting Kyverno v1.17.2 milestone',
            'Fixed leaderelection.New calling os.Exit instead of returning error — merged PR #15576',
            'Improved CLI test output with detailed diffs & error messages for mutate failures',
            'Assigned to and actively working on Kyverno issue #12198 with maintainers',
        ],
        credentialUrl: 'https://github.com/kyverno/kyverno',
    },
    {
        title: 'Contributor — Fluid',
        org: 'Fluid',
        badge: 'CNCF 2026',
        description:
            'Fluid is a CNCF project providing elastic data abstraction and acceleration for BigData/AI workloads in the cloud, built on Kubernetes.',
        bannerColor: ['#0a1a2e', '#0d2a4a'],
        accentColor: '#22d3ee',
        tags: ['Go', 'Kubernetes', 'Cloud Native', 'CNCF', 'BigData'],
        contributions: [
            'Fixed UfsTotal metadata not updating on mount-point changes — merged PR #5675 to master',
            'Wrapped Status().Update() with retry.RetryOnConflict for conflict-safe concurrent updates',
            'Addressed maintainer review feedback across AlluxioEngine & GooseFSEngine packages',
            'Contributed to data abstraction layer for fluid-cloudnative/fluid BigData/AI workloads',
        ],
        credentialUrl: 'https://github.com/fluid-cloudnative/fluid',
    },
];

function BannerIllustration({ project }: { project: OpenSourceProject }) {
    const isKyverno = project.org === 'Kyverno';

    if (isKyverno) {
        // Kyverno banner — shield + policy theme
        return (
            <div
                className="w-full h-full flex items-center justify-between px-8 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${project.bannerColor[0]}, ${project.bannerColor[1]})` }}
            >
                <div className="flex flex-col gap-1">
                    <span className="text-white text-2xl font-black tracking-tight">Kyverno</span>
                    <span className="text-green-300 text-sm font-medium">Cloud-Native Policy</span>
                </div>
                {/* Shield icon */}
                <svg viewBox="0 0 120 130" className="w-24 h-24 opacity-90" fill="none">
                    <path
                        d="M60 8 L110 30 L110 70 Q110 100 60 122 Q10 100 10 70 L10 30 Z"
                        fill="url(#shieldGrad)"
                        stroke="rgba(74,222,128,0.3)"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M60 25 L90 40 L90 68 Q90 88 60 102 Q30 88 30 68 L30 40 Z"
                        fill="rgba(74,222,128,0.12)"
                    />
                    {/* Checkmark */}
                    <polyline
                        points="44,65 55,76 76,52"
                        stroke="#4ade80"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                    <defs>
                        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#166534" />
                            <stop offset="100%" stopColor="#14532d" />
                        </linearGradient>
                    </defs>
                </svg>
                {/* Floating k8s-style dots */}
                <div className="absolute bottom-3 right-3 flex gap-1 opacity-30">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-green-400" />
                    ))}
                </div>
            </div>
        );
    }

    // Fluid banner — wave / data flow theme
    return (
        <div
            className="w-full h-full flex items-center justify-between px-8 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${project.bannerColor[0]}, ${project.bannerColor[1]})` }}
        >
            <div className="flex flex-col gap-1">
                <span className="text-white text-2xl font-black tracking-tight">Fluid</span>
                <span className="text-cyan-300 text-sm font-medium">Data Acceleration</span>
            </div>
            {/* Wave / flow SVG */}
            <svg viewBox="0 0 120 80" className="w-28 h-20 opacity-85" fill="none">
                {[0, 12, 24].map((offset, i) => (
                    <path
                        key={i}
                        d={`M0,${30 + offset} Q20,${15 + offset} 40,${30 + offset} Q60,${45 + offset} 80,${30 + offset} Q100,${15 + offset} 120,${30 + offset}`}
                        stroke={`rgba(34,211,238,${0.7 - i * 0.2})`}
                        strokeWidth={3 - i * 0.5}
                        strokeLinecap="round"
                        fill="none"
                    />
                ))}
            </svg>
            {/* Scanline overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.05) 4px, rgba(0,0,0,0.05) 5px)',
                }}
            />
        </div>
    );
}

export default function OpenSource() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });


    return (
        <section id="opensource" ref={ref} className="py-24 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
            {/* Section heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <h2 className="text-3xl font-black text-white inline-block relative">
                    Open Source
                    <span
                        className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #22d3ee, transparent)' }}
                    />
                </h2>
            </motion.div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {openSourceProjects.map((project, idx) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: idx * 0.15 + 0.2, duration: 0.6, ease: 'easeOut' }}
                        className="rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1"
                        style={{
                            background: 'rgba(13, 21, 38, 0.8)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
                        }}
                        onMouseEnter={() => { }}
                        onMouseLeave={() => { }}
                    >
                        {/* Banner */}
                        <div className="relative h-40 overflow-hidden flex-shrink-0">
                            <BannerIllustration project={project} />

                            {/* Badge */}
                            <div
                                className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
                            >
                                <FiCalendar size={11} className="opacity-70" />
                                {project.badge}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col gap-3 flex-1">
                            {/* Title */}
                            <h3 className="text-white font-bold text-base leading-tight">{project.title}</h3>

                            {/* Description */}
                            <p className="text-slate-400 text-xs leading-relaxed">{project.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5">
                                {project.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-0.5 rounded-full text-xs text-slate-300 border"
                                        style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Contributions */}
                            <div className="flex flex-col gap-2 mt-1">
                                {project.contributions.map((c, i) => (
                                    <div key={i} className="flex items-start gap-2.5">
                                        <FiShield
                                            size={13}
                                            className="mt-0.5 flex-shrink-0"
                                            style={{ color: project.accentColor, opacity: 0.8 }}
                                        />
                                        <span className="text-slate-400 text-xs leading-relaxed">{c}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Footer link */}
                            <div className="mt-auto pt-3 border-t border-white/5">
                                <a
                                    href={project.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    id={`cred-${project.org.toLowerCase().replace(/\s/g, '-')}`}
                                    className="flex items-center gap-1 text-xs font-medium transition-colors duration-200 hover:gap-2"
                                    style={{ color: project.accentColor }}
                                >
                                    Show Credentials
                                    <FiChevronRight size={13} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
