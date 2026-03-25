import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SiLeetcode, SiGeeksforgeeks, SiHackerrank, SiCodechef } from 'react-icons/si';

interface CodingPlatform {
    id: string;
    displayName: string;
    url: string;
    color: string;
    darkBg: boolean;
    icon: React.ReactElement;
}

const platforms: CodingPlatform[] = [
    {
        id: 'leetcode',
        displayName: 'LEETCODE',
        url: 'https://leetcode.com/yourusername',
        color: '#ffa116',
        darkBg: true,
        icon: <SiLeetcode color="#ffa116" />,
    },
    {
        id: 'codechef',
        displayName: 'CODECHEF',
        url: 'https://codechef.com/users/yourusername',
        color: '#b07540',
        darkBg: false,
        icon: <SiCodechef color="#6b4f2f" />,
    },
    {
        id: 'geeksforgeeks',
        displayName: 'GEEKSFORGEEKS',
        url: 'https://auth.geeksforgeeks.org/user/yourusername',
        color: '#2f8d46',
        darkBg: false,
        icon: <SiGeeksforgeeks color="#2f8d46" />,
    },
    {
        id: 'interviewbit',
        displayName: 'INTERVIEWBIT',
        url: 'https://interviewbit.com/profile/yourusername',
        color: '#1374ef',
        darkBg: false,
        icon: (
            <svg viewBox="0 0 40 40" fill="none" style={{ display: 'block' }}>
                <circle cx="12" cy="12" r="3.5" fill="#1374ef" />
                <circle cx="20" cy="12" r="3.5" fill="#1374ef" opacity="0.7" />
                <circle cx="28" cy="12" r="3.5" fill="#1374ef" opacity="0.4" />
                <circle cx="12" cy="20" r="3.5" fill="#1374ef" opacity="0.7" />
                <circle cx="20" cy="20" r="3.5" fill="#1374ef" />
                <circle cx="28" cy="20" r="3.5" fill="#1374ef" opacity="0.7" />
                <circle cx="12" cy="28" r="3.5" fill="#1374ef" opacity="0.4" />
                <circle cx="20" cy="28" r="3.5" fill="#1374ef" opacity="0.7" />
                <circle cx="28" cy="28" r="3.5" fill="#1374ef" />
            </svg>
        ),
    },
    {
        id: 'hackerrank',
        displayName: 'HACKERRANK',
        url: 'https://hackerrank.com/yourusername',
        color: '#00ea64',
        darkBg: true,
        icon: <SiHackerrank color="#00ea64" />,
    },
    {
        id: 'codolio',
        displayName: 'CODOLIO',
        url: 'https://codolio.com/profile/yourusername',
        color: '#f97316',
        darkBg: true,
        icon: (
            <svg viewBox="0 0 40 40" fill="none" style={{ display: 'block' }}>
                <circle cx="14" cy="18" r="6" fill="#f97316" opacity="0.9" />
                <circle cx="26" cy="18" r="6" fill="#f97316" opacity="0.9" />
                <circle cx="14" cy="18" r="3" fill="#1a0a00" />
                <circle cx="26" cy="18" r="3" fill="#1a0a00" />
                <circle cx="15" cy="17" r="1" fill="white" />
                <circle cx="27" cy="17" r="1" fill="white" />
                <path d="M16 27 Q20 30 24 27" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 11 L6 7 M31 11 L34 7" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
];

const CIRCLE_SIZE = 80;
const ICON_SIZE = 36;
const LINE_COUNT = 9;

export default function CodingProfiles() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [hovered, setHovered] = useState<string | null>(null);

    const hoveredPlatform = platforms.find(p => p.id === hovered);

    return (
        <section id="profiles" ref={ref} className="relative overflow-hidden py-8 px-20">

            {/* Hidden SVG defs for rocky noise filter */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <filter id="rocky-noise" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.65"
                            numOctaves="4"
                            stitchTiles="stitch"
                            result="noise"
                        />
                        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                        <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended" />
                        <feComposite in="blended" in2="SourceGraphic" operator="in" />
                    </filter>
                    <filter id="glow-beam">
                        <feGaussianBlur stdDeviation="12" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
            </svg>

            {/* Main panel */}
            <div
                className="relative rounded-2xl overflow-hidden py-16 px-8"
                style={{
                    background: 'linear-gradient(160deg, #060c1a 0%, #091020 40%, #0a1428 100%)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.6)',
                }}
            >
                {/* ── Rock texture overlay ── */}
                {/* Noise grain via CSS */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
                        backgroundSize: '300px 300px',
                        mixBlendMode: 'overlay',
                        opacity: 0.6,
                    }}
                />

                {/* Rough crack lines (simulate rock face fractures) */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    preserveAspectRatio="none"
                    style={{ opacity: 0.06 }}
                >
                    <path d="M120 0 L115 80 L130 160 L118 300" stroke="white" strokeWidth="0.8" fill="none" />
                    <path d="M320 0 L330 60 L310 140 L325 300" stroke="white" strokeWidth="0.6" fill="none" />
                    <path d="M550 10 L540 90 L560 170 L545 300" stroke="white" strokeWidth="0.7" fill="none" />
                    <path d="M780 0 L795 70 L775 150 L790 300" stroke="white" strokeWidth="0.5" fill="none" />
                    <path d="M1000 5 L995 85 L1010 165 L1000 300" stroke="white" strokeWidth="0.6" fill="none" />
                    <path d="M1200 0 L1210 60 L1195 140 L1205 300" stroke="white" strokeWidth="0.7" fill="none" />
                    <path d="M0 100 L200 105 L400 98 L600 103" stroke="white" strokeWidth="0.4" fill="none" />
                    <path d="M200 180 L450 175 L700 183 L900 178" stroke="white" strokeWidth="0.4" fill="none" />
                </svg>

                {/* Vertical grid lines */}
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: LINE_COUNT }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-0 bottom-0 w-px"
                            style={{
                                left: `${(i + 1) * (100 / (LINE_COUNT + 1))}%`,
                                background: 'rgba(255,255,255,0.04)',
                            }}
                        />
                    ))}
                </div>

                {/* ── Hover light beam column ── */}
                {hovered && (
                    <motion.div
                        key={hovered}
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="absolute inset-y-0 pointer-events-none"
                        style={{
                            left: `${(platforms.findIndex(p => p.id === hovered) / (platforms.length - 1)) * 78 + 11}%`,
                            width: '160px',
                            transform: 'translateX(-50%)',
                            transformOrigin: 'bottom center',
                            background: `linear-gradient(180deg,
                transparent 0%,
                ${hoveredPlatform?.color ?? '#22d3ee'}08 20%,
                ${hoveredPlatform?.color ?? '#22d3ee'}28 50%,
                ${hoveredPlatform?.color ?? '#22d3ee'}18 70%,
                ${hoveredPlatform?.color ?? '#22d3ee'}05 90%,
                transparent 100%
              )`,
                            filter: 'blur(8px)',
                        }}
                    />
                )}

                {/* Sharper bright beam center */}
                {hovered && (
                    <motion.div
                        key={`beam-${hovered}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-y-0 pointer-events-none"
                        style={{
                            left: `${(platforms.findIndex(p => p.id === hovered) / (platforms.length - 1)) * 78 + 11}%`,
                            width: '40px',
                            transform: 'translateX(-50%)',
                            background: `linear-gradient(180deg,
                transparent 0%,
                ${hoveredPlatform?.color ?? '#22d3ee'}15 30%,
                ${hoveredPlatform?.color ?? '#22d3ee'}55 50%,
                ${hoveredPlatform?.color ?? '#22d3ee'}15 70%,
                transparent 100%
              )`,
                            filter: 'blur(3px)',
                        }}
                    />
                )}

                <div className="relative max-w-5xl mx-auto flex flex-col items-center gap-12">
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl font-black text-white mb-3">Profiles</h2>
                        <p className="text-slate-500 text-sm max-w-sm leading-relaxed mx-auto">
                            Active participation in competitive programming and continuous learning through various coding platforms.
                        </p>
                    </motion.div>

                    {/* Platform circles row */}
                    <div className="flex items-center justify-center gap-10 md:gap-14">
                        {platforms.map((platform, idx) => {
                            const isHovered = hovered === platform.id;

                            return (
                                <motion.a
                                    key={platform.id}
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    id={`profile-${platform.id}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: idx * 0.07 + 0.3, duration: 0.45, ease: 'backOut' }}
                                    className="flex flex-col items-center gap-3 cursor-pointer select-none no-underline"
                                    onMouseEnter={() => setHovered(platform.id)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    {/* Circle — rotate + scale on hover (no layout shift) */}
                                    <motion.div
                                        animate={{
                                            rotate: isHovered ? -8 : 0,
                                            scale: isHovered ? 1.15 : 1,
                                        }}
                                        transition={{ duration: 0.25, ease: 'easeOut' }}
                                        className="rounded-full flex items-center justify-center flex-shrink-0 relative"
                                        style={{
                                            width: CIRCLE_SIZE,
                                            height: CIRCLE_SIZE,
                                            background: platform.darkBg ? '#111111' : '#f0f0f0',
                                            border: isHovered
                                                ? `2px solid ${platform.color}80`
                                                : '2px solid rgba(255,255,255,0.10)',
                                            boxShadow: isHovered
                                                ? `0 0 20px ${platform.color}50, 0 8px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)`
                                                : '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                                        }}
                                    >
                                        {/* Rocky inset texture on the circle itself */}
                                        <div
                                            className="absolute inset-0 rounded-full pointer-events-none"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
                                                mixBlendMode: 'overlay',
                                                opacity: 0.5,
                                            }}
                                        />
                                        <div
                                            className="flex items-center justify-center"
                                            style={{ width: ICON_SIZE, height: ICON_SIZE }}
                                        >
                                            {React.cloneElement(
                                                platform.icon as React.ReactElement<{ width?: number; height?: number; size?: number }>,
                                                { width: ICON_SIZE, height: ICON_SIZE, size: ICON_SIZE }
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* Label */}
                                    <motion.span
                                        animate={{
                                            color: isHovered ? platform.color : 'rgba(100,116,139,0.65)',
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="text-xs font-black tracking-widest whitespace-nowrap"
                                        style={{ letterSpacing: '0.1em' }}
                                    >
                                        {platform.displayName}
                                    </motion.span>
                                </motion.a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
