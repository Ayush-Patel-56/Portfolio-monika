import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiHome, FiBriefcase, FiAward, FiCode, FiFolder, FiUser
} from 'react-icons/fi';
import {
    FaGithub, FaLinkedin, FaInstagram, FaTwitter
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { personalInfo } from '../data/portfolioData';

const navItems = [
    { id: 'home', icon: FiHome, label: 'Home' },
    { id: 'about', icon: FiUser, label: 'About' },
    { id: 'skills', icon: FiCode, label: 'Skills' },
    { id: 'projects', icon: FiFolder, label: 'Projects' },
    { id: 'profiles', icon: FiAward, label: 'Profiles' },
    { id: 'contact', icon: FiBriefcase, label: 'Contact' },
];

const socialLinks = [
    { icon: FaGithub, url: personalInfo.github, label: 'GitHub' },
    { icon: FaLinkedin, url: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: FaInstagram, url: personalInfo.instagram, label: 'Instagram' },
    { icon: FaTwitter, url: personalInfo.twitter, label: 'Twitter' },
    { icon: MdEmail, url: `mailto:${personalInfo.email}`, label: 'Email' },
];

export default function Sidebar() {
    const [active, setActive] = useState('home');
    const [tooltip, setTooltip] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(n => document.getElementById(n.id));
            const scrollY = window.scrollY + 200;
            for (let i = sections.length - 1; i >= 0; i--) {
                const sec = sections[i];
                if (sec && sec.offsetTop <= scrollY) {
                    setActive(navItems[i].id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        setIsMobileMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden fixed top-6 right-6 z-50 glass-card p-3 rounded-full flex items-center justify-center text-slate-300 hover:text-cyan-400 border border-slate-700/50 bg-[#0B1121]/80 backdrop-blur-md"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? (
                   <span className="text-xl leading-none px-1">✕</span>
                ) : (
                   <span className="text-xl leading-none">☰</span>
                )}
            </button>

            {/* Mobile Full-Screen Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-[#0B1121]/95 backdrop-blur-lg flex flex-col items-center justify-center lg:hidden"
                    >
                        <div className="flex flex-col gap-8 w-full max-w-sm px-8">
                            {navItems.map(({ id, icon: Icon, label }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollTo(id)}
                                    className={`flex items-center gap-6 text-2xl font-bold tracking-wider py-2 transition-colors duration-300 ${
                                        active === id ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-300'
                                    }`}
                                >
                                    <Icon className={active === id ? 'text-cyan-400' : 'text-cyan-600'} size={28} />
                                    {label}
                                </button>
                            ))}
                        </div>
                        
                        {/* Mobile Social Links */}
                        <div className="flex gap-6 mt-16 mt-auto mb-12">
                            {socialLinks.map(({ icon: Icon, url, label }) => (
                                <a
                                    key={label}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-cyan-400 bg-slate-800/50 p-3 rounded-full border border-slate-700/50"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Left Sidebar — Navigation (Desktop Only) */}
            <motion.aside
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex fixed left-0 top-0 h-full w-16 flex-col items-center justify-center gap-4 z-50"
            >
                <div className="glass-card px-2 py-6 flex flex-col items-center gap-4">
                    {navItems.map(({ id, icon: Icon, label }) => (
                        <div
                            key={id}
                            className="relative"
                            onMouseEnter={() => setTooltip(label)}
                            onMouseLeave={() => setTooltip('')}
                        >
                            <button
                                id={`nav-${id}`}
                                onClick={() => scrollTo(id)}
                                className={`nav-icon ${active === id ? 'text-cyan-400 bg-cyan-400/10 shadow-cyan-sm' : ''}`}
                            >
                                <Icon size={18} />
                            </button>
                            <AnimatePresence>
                                {tooltip === label && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute left-12 top-1/2 -translate-y-1/2 bg-bg-card border border-cyan-400/20 text-cyan-400 text-xs px-2 py-1 rounded whitespace-nowrap z-50"
                                    >
                                        {label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </motion.aside>

            {/* Right Sidebar — Social Links (Desktop Only) */}
            <motion.aside
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex fixed right-0 top-0 h-full w-16 flex-col items-center justify-center gap-4 z-50"
            >
                <div className="glass-card px-2 py-6 flex flex-col items-center gap-4">
                    {socialLinks.map(({ icon: Icon, url, label }) => (
                        <a
                            key={label}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="nav-icon"
                        >
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
            </motion.aside>
        </>
    );
}
