import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

interface Line {
    type: 'command' | 'output' | 'prompt';
    text: string;
}

const script: Line[] = [
    { type: 'prompt', text: '$ npm run intro' },
    { type: 'output', text: `Software Developer • Open Source Contributor • Full-Stack Developer ` },
    { type: 'prompt', text: '$ flutter pub get skills' },
];

const roles = ['Frontend Developer', 'Open Source Contributor', 'Full-Stack Developer', 'Software Developer'];

export default function TerminalWindow() {
    const [visibleLines, setVisibleLines] = useState<Line[]>([]);
    const [currentChar, setCurrentChar] = useState(0);
    const [lineIndex, setLineIndex] = useState(0);

    // Dynamic role cycling
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayedRole, setDisplayedRole] = useState('');
    const [typingRole, setTypingRole] = useState(true);
    const [introCompleted, setIntroCompleted] = useState(false);

    // Intro Typing Effect
    useEffect(() => {
        if (lineIndex >= script.length) {
            setIntroCompleted(true);
            return;
        }
        const line = script[lineIndex];

        if (currentChar < line.text.length) {
            const speed = line.type === 'prompt' ? 60 : 30;
            const t = setTimeout(() => {
                setCurrentChar(c => c + 1);
            }, speed);
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => {
                setVisibleLines(prev => [...prev, line]);
                setLineIndex(i => i + 1);
                setCurrentChar(0);
            }, 600);
            return () => clearTimeout(t);
        }
    }, [lineIndex, currentChar]);

    // Cycling Role Effect (after intro)
    useEffect(() => {
        if (!introCompleted) return;

        const role = roles[roleIndex];
        if (typingRole) {
            if (displayedRole.length < role.length) {
                const t = setTimeout(() => setDisplayedRole(role.slice(0, displayedRole.length + 1)), 80);
                return () => clearTimeout(t);
            } else {
                const t = setTimeout(() => setTypingRole(false), 2000);
                return () => clearTimeout(t);
            }
        } else {
            if (displayedRole.length > 0) {
                const t = setTimeout(() => setDisplayedRole(displayedRole.slice(0, -1)), 40);
                return () => clearTimeout(t);
            } else {
                setRoleIndex((roleIndex + 1) % roles.length);
                setTypingRole(true);
            }
        }
    }, [displayedRole, typingRole, roleIndex, introCompleted]);

    const currentLine = lineIndex < script.length ? script[lineIndex] : null;
    const partial = currentLine ? currentLine.text.slice(0, currentChar) : '';

    return (
        <div
            className="rounded-xl overflow-hidden font-mono text-[11px]"
            style={{
                background: '#000000',
                border: '1px solid rgba(34,211,238,0.2)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.02)',
            }}
        >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                </div>
                <span className="text-slate-500 text-[10px] tracking-widest uppercase opacity-70">bash</span>
            </div>

            {/* Terminal body */}
            <div className="p-4 space-y-1.5 min-h-[160px]">
                {visibleLines.map((line, i) => (
                    <p
                        key={i}
                        className={
                            line.type === 'prompt'
                                ? 'text-cyan-400 font-semibold'
                                : 'text-white pl-2'
                        }
                    >
                        {line.type === 'prompt' && (
                            <span className="text-green-400 mr-2">$</span>
                        )}
                        {line.type === 'prompt' ? line.text.slice(2) : line.text}
                    </p>
                ))}

                {/* Static Intro Line (typing) */}
                {!introCompleted && currentLine && (
                    <p className={currentLine.type === 'prompt' ? 'text-cyan-400 font-semibold' : 'text-white pl-2'}>
                        {currentLine.type === 'prompt' && <span className="text-green-400 mr-2">$</span>}
                        {currentLine.type === 'prompt' ? partial.slice(2) : partial}
                        <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-0.5 animate-pulse" />
                    </p>
                )}

                {/* Dynamic Cycling Role Line */}
                {introCompleted && (
                    <p className="text-white pl-2">
                        <span className="font-bold">{displayedRole}</span>
                        <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-0.5 animate-pulse" />
                    </p>
                )}
            </div>
        </div>
    );
}
