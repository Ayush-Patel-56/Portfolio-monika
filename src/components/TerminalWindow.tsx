import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

interface Line {
    type: 'command' | 'output' | 'prompt';
    text: string;
}

const script: Line[] = [
    { type: 'prompt', text: '$ cat README.md' },
    { type: 'output', text: `Hi 👋, I'm ${personalInfo.name}` },
    { type: 'output', text: `Based in India 🇮🇳` },
    { type: 'prompt', text: '$ git status --short' },
    { type: 'output', text: 'Committed to clean, scalable code' },
    { type: 'output', text: 'Focused on problem-solving and robust logic' },
    { type: 'prompt', text: '$ ls -l contributions/' },
    { type: 'output', text: 'Kyverno • Fluid' },
];

export default function TerminalWindow() {
    const [visibleLines, setVisibleLines] = useState<Line[]>([]);
    const [currentChar, setCurrentChar] = useState(0);
    const [lineIndex, setLineIndex] = useState(0);

    useEffect(() => {
        if (lineIndex >= script.length) return;
        const line = script[lineIndex];

        if (currentChar < line.text.length) {
            const speed = line.type === 'prompt' ? 60 : 25;
            const t = setTimeout(() => {
                setCurrentChar(c => c + 1);
            }, speed);
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => {
                setVisibleLines(prev => [...prev, line]);
                setLineIndex(i => i + 1);
                setCurrentChar(0);
            }, 400);
            return () => clearTimeout(t);
        }
    }, [lineIndex, currentChar]);

    const currentLine = lineIndex < script.length ? script[lineIndex] : null;
    const partial = currentLine ? currentLine.text.slice(0, currentChar) : '';

    return (
        <div
            className="rounded-xl overflow-hidden font-mono text-xs"
            style={{
                background: 'rgba(5, 8, 18, 0.95)',
                border: '1px solid rgba(34,211,238,0.15)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)',
            }}
        >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-slate-500 text-xs">bash</span>
            </div>

            {/* Terminal body */}
            <div className="p-4 space-y-1 min-h-[140px]">
                {visibleLines.map((line, i) => (
                    <p
                        key={i}
                        className={
                            line.type === 'prompt'
                                ? 'text-cyan-400 font-semibold'
                                : 'text-slate-300 pl-2'
                        }
                    >
                        {line.type === 'prompt' && (
                            <span className="text-green-400 mr-1">$</span>
                        )}
                        {line.type === 'prompt' ? line.text.slice(2) : line.text}
                    </p>
                ))}

                {/* Currently typing line */}
                {currentLine && (
                    <p className={currentLine.type === 'prompt' ? 'text-cyan-400 font-semibold' : 'text-slate-300 pl-2'}>
                        {currentLine.type === 'prompt' && <span className="text-green-400 mr-1">$</span>}
                        {currentLine.type === 'prompt' ? partial.slice(2) : partial}
                        <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-0.5 animate-blink" />
                    </p>
                )}
            </div>
        </div>
    );
}
