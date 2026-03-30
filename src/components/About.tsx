import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutMe } from '../data/portfolioData';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
    }),
};

const driveDotColors = ['#22d3ee', '#a855f7', '#f97316'];

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" ref={ref} className="py-24 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
            <motion.h2
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="section-title text-center lg:text-left text-white mb-8 lg:mb-12"
            >
                About{' '}
                <span className="text-cyan-400">Me</span>
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left — Text content */}
                <div className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left">
                    <div className="flex flex-col gap-6 w-full">
                        {aboutMe.paragraphs.map((para, i) => (
                            <motion.p
                                key={i}
                                custom={i + 1}
                                variants={fadeUp}
                                initial="hidden"
                                animate={inView ? 'visible' : 'hidden'}
                                className="text-slate-300 leading-relaxed text-base sm:text-lg lg:text-sm font-light text-center"
                            >
                                {para}
                            </motion.p>
                        ))}
                    </div>

                    {/* Resume Button (Styled like the mobile reference) */}
                    <motion.a
                        href="#"
                        custom={2}
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        className="mt-6 w-[80%] max-w-[300px] lg:w-auto bg-white text-black font-bold tracking-widest text-sm py-4 px-8 rounded flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-shadow"
                    >
                        RESUME
                    </motion.a>

                    {/* Highlights */}
                    <motion.div
                        custom={3}
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full"
                    >
                        {aboutMe.highlights.map(({ icon, label, sub }) => (
                            <div
                                key={label}
                                className="glass-card p-4 flex items-center gap-3 hover:border-cyan-400/30 transition-colors"
                            >
                                <span className="text-2xl">{icon}</span>
                                <div className="text-left">
                                    <p className="text-white font-semibold text-sm">{label}</p>
                                    <p className="text-slate-400 text-xs">{sub}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right — What drives me */}
                <motion.div
                    custom={4}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="glass-card p-6 relative overflow-hidden"
                >
                    {/* Big faded icon */}
                    <div
                        className="absolute top-4 right-4 text-8xl opacity-5 select-none pointer-events-none"
                    >
                        🧠
                    </div>

                    <h3 className="text-white font-bold text-lg mb-6">What drives me?</h3>
                    <div className="flex flex-col gap-5">
                        {aboutMe.drivesMe.map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div
                                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                                    style={{ backgroundColor: driveDotColors[i % driveDotColors.length] }}
                                />
                                <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
