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
    const itemVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col lg:flex-row items-center overflow-hidden"
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

            {/* ══════════ MOBILE LAYOUT (< lg) ══════════ */}
            <div className="lg:hidden w-full flex flex-col items-center relative z-10 pt-16 pb-12 px-5">
                {/* Visit counter — top center */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card px-4 py-1.5 flex items-center gap-3 mb-6"
                >
                    <span className="text-slate-400 text-xs">Total Visits</span>
                    <span className="text-cyan-400 font-bold text-sm font-mono">{visitCount}</span>
                </motion.div>

                {/* Portrait */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="relative w-full max-w-[320px] flex flex-col items-center"
                >
                    {/* Ambient glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />

                    {/* Image container */}
                    <div className="relative w-full h-[340px] flex items-end justify-center overflow-hidden">
                        <img
                            src="/monika.png"
                            alt="Monika Jakhar"
                            className="w-full h-full object-contain"
                            style={{
                                objectPosition: 'center bottom',
                                filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.6))',
                            }}
                        />
                    </div>

                    {/* Neon floor line */}
                    <div className="w-[90%] h-[3px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-[4px]" />
                    <div className="w-[70%] h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent -mt-[2px]" />

                    {/* Signature */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="mt-2 text-white/90 text-4xl italic tracking-wide pointer-events-none"
                        style={{
                            fontFamily: "cursive, 'Brush Script MT', 'Dancing Script', serif",
                            textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                            transform: 'rotate(-5deg)',
                        }}
                    >
                        {personalInfo.signature}
                    </motion.div>
                </motion.div>

                {/* Text content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center gap-4 mt-8 w-full"
                >
                    <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl font-black text-white leading-tight text-center">
                        Hi, I am{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 100%)' }}
                        >
                            {personalInfo.name}
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-base text-slate-300 font-medium text-center">
                        {displayed}
                        <span className="inline-block w-0.5 h-4 bg-cyan-400 ml-0.5 animate-blink" />
                    </motion.p>

                    <motion.a
                        variants={itemVariants}
                        href={`mailto:${personalInfo.email}`}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 text-sm"
                    >
                        {personalInfo.email}
                        <span className="text-xs">↗</span>
                    </motion.a>

                    <motion.div variants={itemVariants} className="w-full">
                        <TerminalWindow />
                    </motion.div>

                    {/* Stats — 2 column on mobile */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-2 w-full">
                        {stats.map(({ count, label }) => (
                            <div key={label} className="flex flex-col items-center gap-1 glass-card py-3">
                                <span className="text-xl font-black text-cyan-400">{count}</span>
                                <span className="text-[10px] text-slate-400 leading-tight text-center">{label}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* ══════════ DESKTOP LAYOUT (≥ lg) ══════════ */}
            <div className="hidden lg:flex w-full min-h-screen items-center relative z-10">
                {/* Visit counter — absolute top center */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-6 left-1/2 -translate-x-1/2 glass-card px-4 py-1.5 flex items-center gap-3 z-20"
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
                        <div className="relative group flex flex-col items-center -ml-12 xl:-ml-24 w-full">
                            <div className="relative w-[130%] max-w-[700px] h-[650px] flex items-end justify-center">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
                                <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden flex items-end justify-center z-10">
                                    <img
                                        src="/monika.png"
                                        alt="Monika Jakhar"
                                        className="w-[120%] h-[120%] max-w-none ml-[-10%] object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                                        style={{
                                            objectPosition: 'center bottom',
                                            filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))',
                                            transformOrigin: 'bottom center',
                                        }}
                                    />
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[4px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-[5px] z-20 pointer-events-none" />
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-30 pointer-events-none" />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="-mt-12 self-end mr-24 relative z-40 text-white/95 text-7xl italic tracking-wide pointer-events-none"
                                style={{
                                    fontFamily: "cursive, 'Brush Script MT', 'Dancing Script', serif",
                                    textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                                    transform: 'rotate(-5deg)',
                                }}
                            >
                                {personalInfo.signature}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right — Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-5"
                    >
                        <motion.h1 variants={itemVariants} className="text-5xl xl:text-6xl font-black text-white leading-tight">
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
            </div>
        </section>
    );
}
