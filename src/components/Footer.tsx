import { personalInfo } from '../data/portfolioData';

export default function Footer() {
    return (
        <footer className="py-8 px-20 border-t border-white/5">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <p className="text-slate-500 text-sm">
                    Designed & Built by{' '}
                    <span className="text-cyan-400">{personalInfo.name}</span>
                </p>
                <p className="text-slate-600 text-xs font-mono">
                    © {new Date().getFullYear()} • Built with React + Tailwind + Framer Motion
                </p>
            </div>
        </footer>
    );
}
