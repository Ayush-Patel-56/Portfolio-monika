import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, stats } from '../data/portfolioData';
import TerminalWindow from './TerminalWindow';

const roles = ['Frontend Developer', 'Open Source Contributor', 'Full-Stack Developer'];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [typing, setTyping] = useState(true);
    const [visitCount, setVisitCount] = useState<number | string>('...');
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetch('https://abacus.jasoncameron.dev/hit/jakharmonika364/portfolio.visits')
            .then(res => res.json())
            .then(data => setVisitCount(data.value || 321))
            .catch(() => {
                const localCount = Number(localStorage.getItem('port_visits') || '321') + 1;
                localStorage.setItem('port_visits', String(localCount));
                setVisitCount(localCount);
            });
    }, []);

    // Typewriter effect
    useEffect(() => {
        const role = roles[roleIndex];
        if (typing) {
            if (displayed.length < role.length) {
                const t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
                return () => clearTimeout(t);
            } else {
                const t = setTimeout(() => setTyping(false), 2000);
                return () => clearTimeout(t);
            }
        } else {
            if (displayed.length > 0) {
                const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
                return () => clearTimeout(t);
            } else {
                setRoleIndex((roleIndex + 1) % roles.length);
                setTyping(true);
            }
        }
    }, [displayed, typing, roleIndex]);

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34,211,238,0.07) 0%, transparent 70%)',
            }}
        >
            {/* Grid background */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Visit counter */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 glass-card px-4 py-1.5 flex items-center gap-3"
            >
                <span className="text-slate-400 text-xs">Total Visits</span>
                <span className="text-cyan-400 font-bold text-sm font-mono">{visitCount}</span>
            </motion.div>

            <div className="max-w-6xl mx-auto px-20 w-full grid grid-cols-2 gap-12 items-center">
                {/* Left — Photo */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="relative flex flex-col items-center"
                >
                    {/* Glowing bottom line */}
                    <div className="relative">
                        <div
                            className="w-72 h-80 rounded-2xl overflow-hidden relative"
                            style={{
                                background: 'linear-gradient(180deg, rgba(34,211,238,0.05) 0%, rgba(34,211,238,0.1) 100%)',
                                border: '1px solid rgba(34,211,238,0.15)',
                            }}
                        >
                            {/* Placeholder avatar with gradient */}
                            <div className="w-full h-full flex items-end justify-center bg-gradient-to-b from-bg-secondary to-bg-primary relative overflow-hidden">
                                {/* Silhouette-style placeholder */}
                                <div
                                    className="absolute bottom-0 w-56 h-72 rounded-t-full opacity-80"
                                    style={{
                                        background: 'linear-gradient(180deg, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0.05) 100%)',
                                    }}
                                />
                                <svg
                                    viewBox="0 0 200 260"
                                    className="absolute bottom-0 w-52 opacity-60"
                                    fill="none"
                                >
                                    {/* Body */}
                                    <ellipse cx="100" cy="220" rx="70" ry="50" fill="rgba(34,211,238,0.1)" />
                                    {/* Head */}
                                    <circle cx="100" cy="80" r="45" fill="rgba(34,211,238,0.12)" />
                                    {/* Arms crossed suggestion */}
                                    <path d="M40 160 Q100 140 160 160" stroke="rgba(34,211,238,0.15)" strokeWidth="20" strokeLinecap="round" />
                                    {/* Tech text on hoodie */}
                                    <text x="100" y="190" textAnchor="middle" fill="rgba(34,211,238,0.4)" fontSize="10" fontFamily="monospace">&lt;/dev&gt;</text>
                                </svg>
                                <div className="absolute top-4 right-4 text-cyan-400/30 font-mono text-xs">{ }</div>
                            </div>
                        </div>

                        {/* Glow at bottom */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-1 bg-cyan-400/50 blur-sm rounded-full" />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-cyan-400 rounded-full" />
                    </div>

                    {/* Signature-style name below image */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-4 font-mono text-cyan-400/60 text-xl italic tracking-wider"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        {personalInfo.signature}
                    </motion.div>
                </motion.div>

                {/* Right — Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-5"
                >
                    <motion.h1 variants={itemVariants} className="text-5xl font-black text-white leading-tight">
                        Hi, I am{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 100%)' }}
                        >
                            {personalInfo.name}
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg text-slate-300 font-medium">
                        {displayed}
                        <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 animate-blink" />
                    </motion.p>

                    <motion.a
                        variants={itemVariants}
                        href={`mailto:${personalInfo.email}`}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 text-sm"
                    >
                        {personalInfo.email}
                        <span className="text-xs">↗</span>
                    </motion.a>

                    <motion.div variants={itemVariants}>
                        <TerminalWindow />
                    </motion.div>

                    {/* Stats */}
                    <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4 mt-2">
                        {stats.map(({ count, label }) => (
                            <div key={label} className="flex flex-col gap-1">
                                <span className="text-2xl font-black text-cyan-400">{count}</span>
                                <span className="text-xs text-slate-400 leading-tight">{label}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
