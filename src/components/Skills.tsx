import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolioData';

const categoryColors: Record<string, string> = {
    cyan: '#22d3ee',
    purple: '#a855f7',
    white: '#ffffff',
};

export default function Skills() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="skills"
            ref={ref}
            className="py-24 relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #070b14 0%, #0a0f1e 50%, #070b14 100%)' }}
        >
            {/* Grid bg overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="max-w-5xl mx-auto px-6 relative flex flex-col items-center">
                {/* Section title — strictly matching the user's screenshot */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
                        <span className="text-white">TECHNICAL </span>
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #22d3ee 100%)' }}
                        >
                            ARSENAL
                        </span>
                    </h2>
                </motion.div>

                {/* Skill cards — Centered with grid-cols-3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {skills.map(({ category, color, items }, idx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: idx * 0.15, duration: 0.6, ease: 'easeOut' }}
                            className="glass-card p-8 group transition-all duration-300 hover:-translate-y-1 relative"
                            style={{
                                background: 'rgba(13, 21, 38, 0.4)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
                            }}
                        >
                            {/* Category Glow Effect */}
                            <div
                                className="absolute top-0 left-1/4 right-1/4 h-[1px] opacity-30 blur-sm group-hover:opacity-100 transition-opacity"
                                style={{ background: categoryColors[color] }}
                            />

                            <h3
                                className="text-base font-black mb-6 tracking-widest uppercase"
                                style={{ color: categoryColors[color] }}
                            >
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-2.5">
                                {items.map(item => (
                                    <span
                                        key={item}
                                        className="px-4 py-1.5 rounded-full text-[11px] font-medium text-slate-300 border border-white/5 bg-white/5 hover:border-current/40 hover:text-white transition-all duration-200 cursor-default"
                                        style={{ '--tw-border-color': categoryColors[color] } as React.CSSProperties}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
