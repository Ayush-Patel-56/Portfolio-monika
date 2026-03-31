import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiStar, FiGitPullRequest, FiFolder, FiUsers, FiGithub, FiActivity } from 'react-icons/fi';

// ── Monika's real GitHub stats (jakharmonika364) ─────────────────────────────
const GITHUB_USERNAME = 'jakharmonika364';
const FALLBACK_STATS = [
    { icon: <FiStar size={20} />, value: '2+', label: 'Total Stars', color: '#facc15' },
    { icon: <FiGitPullRequest size={20} />, value: '9+', label: 'PRs Merged', color: '#a78bfa' },
    { icon: <FiFolder size={20} />, value: '20', label: 'Repositories', color: '#22d3ee' },
    { icon: <FiUsers size={20} />, value: '80+', label: 'Contributions', color: '#4ade80' },
];

// Contribution activity sequence matching the requested aesthetic (Last 30 days)
const FALLBACK_CONTRIBUTIONS = [
    { day: '23', count: 1 },
    { day: '24', count: 2 },
    { day: '25', count: 9 },
    { day: '26', count: 0 },
    { day: '27', count: 14 },
    { day: '28', count: 7 },
    { day: '1', count: 6 },
    { day: '2', count: 23 },
    { day: '3', count: 1 },
    { day: '4', count: 4 },
    { day: '5', count: 3 },
    { day: '6', count: 8 },
    { day: '7', count: 4 },
    { day: '8', count: 2 },
    { day: '9', count: 5 },
    { day: '10', count: 0 },
    { day: '11', count: 1 },
    { day: '12', count: 2 },
    { day: '13', count: 0 },
    { day: '14', count: 10 },
    { day: '15', count: 5 },
    { day: '16', count: 9 },
    { day: '17', count: 16 },
    { day: '18', count: 8 },
    { day: '19', count: 7 },
    { day: '20', count: 1 },
    { day: '21', count: 6 },
    { day: '22', count: 7 },
    { day: '23', count: 4 },
    { day: '24', count: 12 },
    { day: '25', count: 1 },
];

// ── SVG Line Chart ───────────────────────────────────────────────────────────
const CHART_W = 900;
const CHART_H = 240;
const PAD_L = 48;
const PAD_R = 20;
const PAD_T = 30;
const PAD_B = 44;

function ContributionChart({ name, data }: { name: string, data: { day: string, count: number }[] }) {
    const [tooltip, setTooltip] = useState<{ x: number; y: number; day: string; count: number } | null>(null);

    const gridMax = Math.max(10, ...data.map(d => d.count)) + 2;

    // Map data → SVG coords
    const points = data.map((d, i) => ({
        ...d,
        svgX: PAD_L + (i / (data.length - 1)) * (CHART_W - PAD_L - PAD_R),
        svgY: PAD_T + (1 - d.count / gridMax) * (CHART_H - PAD_T - PAD_B),
    }));

    const polyline = points.map(p => `${p.svgX},${p.svgY}`).join(' ');
    const area = `M${points[0].svgX},${CHART_H - PAD_B} ` +
        points.map(p => `L${p.svgX},${p.svgY}`).join(' ') +
        ` L${points[points.length - 1].svgX},${CHART_H - PAD_B} Z`;

    // Generate yTicks spaced evenly
    const tickStep = Math.ceil(gridMax / 5);
    const yTicks = [0, tickStep, tickStep * 2, tickStep * 3, tickStep * 4, tickStep * 5].filter(t => t <= gridMax + tickStep);

    return (
        <div className="relative w-full overflow-x-auto">
            <svg
                viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                className="w-full"
                style={{ minWidth: '800px', height: 'auto' }}
                onMouseLeave={() => setTooltip(null)}
            >
                <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>
                    <clipPath id="chartClip">
                        <rect x={PAD_L} y={PAD_T - 10} width={CHART_W - PAD_L - PAD_R} height={CHART_H - PAD_T - PAD_B + 10} />
                    </clipPath>
                </defs>

                {/* X-axis Vertical Grid Lines — subtle matte style */}
                {points.map((p, i) => (
                    <line
                        key={`grid-x-${i}`}
                        x1={p.svgX} y1={PAD_T} x2={p.svgX} y2={CHART_H - PAD_B}
                        stroke="rgba(34,197,94,0.06)"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                    />
                ))}

                {/* Y-axis Horizontal Grid Lines */}
                {yTicks.map(tick => {
                    const y = PAD_T + (1 - tick / gridMax) * (CHART_H - PAD_T - PAD_B);
                    return (
                        <g key={tick}>
                            <line
                                x1={PAD_L} y1={y} x2={CHART_W - PAD_R} y2={y}
                                stroke="rgba(34,197,94,0.08)"
                                strokeWidth="1"
                                strokeDasharray="3 3"
                            />
                            <text
                                x={PAD_L - 12} y={y + 4}
                                textAnchor="end"
                                fontSize="11"
                                fontWeight="400"
                                fill="rgba(148,163,184,0.5)"
                            >{tick}</text>
                        </g>
                    );
                })}

                {/* Y-axis label */}
                <text
                    x={14} y={(PAD_T + CHART_H - PAD_B) / 2}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="500"
                    fill="rgba(34,197,94,0.7)"
                    transform={`rotate(-90, 14, ${(PAD_T + CHART_H - PAD_B) / 2})`}
                >Contributions</text>

                {/* X-axis labels */}
                {points.map((p, i) => (
                    <text
                        key={i}
                        x={p.svgX} y={CHART_H - PAD_B + 18}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="400"
                        fill="rgba(148,163,184,0.5)"
                    >{p.day}</text>
                ))}

                {/* X-axis title */}
                <text
                    x={(CHART_W + PAD_L) / 2} y={CHART_H - 8}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="500"
                    fill="rgba(34,197,94,0.7)"
                >Days</text>

                {/* Chart title inner — clean green text */}
                <text
                    x={(CHART_W + PAD_L) / 2} y={PAD_T - 12}
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="600"
                    fill="#22c55e"
                    opacity="0.9"
                >{name}'s Contribution Graph</text>

                {/* Area fill */}
                <path d={area} fill="url(#areaGrad)" clipPath="url(#chartClip)" />

                {/* Main Line — Solid Matte Green */}
                <polyline
                    points={polyline}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    clipPath="url(#chartClip)"
                />

                {/* Data points (dots) */}
                {points.map((p, i) => (
                    <circle
                        key={i}
                        cx={p.svgX} cy={p.svgY} r="3.5"
                        fill="#050a16"
                        stroke="#22c55e"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={e => {
                            const svgEl = (e.target as SVGCircleElement).ownerSVGElement!;
                            const rect = svgEl.getBoundingClientRect();
                            const scaleX = rect.width / CHART_W;
                            const scaleY = rect.height / CHART_H;
                            setTooltip({
                                x: p.svgX * scaleX,
                                y: (p.svgY - 30) * scaleY,
                                day: p.day,
                                count: p.count,
                            });
                        }}
                    />
                ))}
            </svg>

            {/* Tooltip */}
            {tooltip && (
                <div
                    className="absolute pointer-events-none px-3 py-2 rounded-lg text-xs font-bold text-white border border-green-500/40"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y,
                        transform: 'translateX(-50%)',
                        background: 'rgba(5, 10, 20, 0.95)',
                        backdropFilter: 'blur(4px)',
                        boxShadow: '0 8px 24px rgba(34,197,94,0.3)',
                        zIndex: 100,
                    }}
                >
                    <div className="text-[10px] text-green-400/70 mb-0.5 uppercase tracking-wider">Day {tooltip.day}</div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm">{tooltip.count}</span>
                        <span className="opacity-60">contributions</span>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function GitHubStats() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const hasFetched = useRef(false);
    
    const [liveStats, setLiveStats] = useState(FALLBACK_STATS);
    const [liveData, setLiveData] = useState(FALLBACK_CONTRIBUTIONS);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchGitHubData = async () => {
            try {
                // Fetch basic user repo count
                const [userRes, prRes, reposRes, contribRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
                    fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+is:merged`),
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
                    fetch(`https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`)
                ]);

                if (userRes.ok && contribRes.ok) {
                    const userData = await userRes.json();
                    const prData = await prRes.ok ? await prRes.json() : { total_count: 0 };
                    const reposData = await reposRes.ok ? await reposRes.json() : [];
                    const contribData = await contribRes.json();

                    const totalStars = Array.isArray(reposData) ? reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0) : 0;

                    setLiveStats([
                        { icon: <FiStar size={20} />, value: totalStars.toString(), label: 'Total Stars', color: '#facc15' },
                        { icon: <FiGitPullRequest size={20} />, value: (prData.total_count || 0).toString(), label: 'PRs Merged', color: '#a78bfa' },
                        { icon: <FiFolder size={20} />, value: (userData.public_repos || 0).toString(), label: 'Repositories', color: '#22d3ee' },
                        { icon: <FiUsers size={20} />, value: (contribData.totalContributions || 0).toString(), label: 'Contributions', color: '#4ade80' },
                    ]);

                    if (contribData.contributions) {
                        const flat = contribData.contributions.flat();
                        const todayStr = new Date().toISOString().split('T')[0];
                        const past = flat.filter((x: any) => x.date <= todayStr);
                        const last31 = past.slice(-31);
                        setLiveData(last31.map((c: any) => ({
                            day: String(new Date(c.date).getDate()),
                            count: c.contributionCount
                        })));
                    }
                }
            } catch (err) {
                console.error("Failed to fetch live github stats", err);
            }
        };

        fetchGitHubData();
    }, []);

    return (
        <section id="github" ref={ref} className="py-16 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
            >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 flex items-center justify-center gap-3">
                    <span className="text-cyan-400 font-mono text-3xl">&lt;/&gt;</span>
                    GitHub Activity
                </h2>
                <p className="text-slate-500 text-sm">Contributing to open source and building projects that matter</p>
            </motion.div>

            {/* Stat cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.55 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
                {liveStats.map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: i * 0.08 + 0.2, duration: 0.45 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        className="rounded-xl p-5 flex flex-col gap-3"
                        style={{
                            background: 'rgba(13,21,38,0.85)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
                        }}
                    >
                        {/* Icon */}
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}30` }}
                        >
                            {s.icon}
                        </div>
                        {/* Value */}
                        <div>
                            <p className="text-white text-2xl font-black leading-none mb-1">{s.value}</p>
                            <p className="text-slate-500 text-xs">{s.label}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Contribution chart panel */}
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="rounded-xl overflow-hidden"
                style={{
                    background: '#0a0f1e',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                }}
            >
                {/* Chart header matching the image exactly */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <div className="flex items-center gap-2.5 text-white font-bold text-base">
                        <div className="text-green-500">
                            <FiActivity size={18} />
                        </div>
                        Contribution Activity
                    </div>
                    <a
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        View on GitHub
                        <FiGithub size={13} className="ml-0.5" />
                    </a>
                </div>

                {/* Chart Container with padding */}
                <div className="px-6 py-8">
                    <ContributionChart name="Monika Jakhar" data={liveData} />
                </div>
            </motion.div>
        </section>
    );
}
