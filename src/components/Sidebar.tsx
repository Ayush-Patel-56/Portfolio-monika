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
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Left Sidebar — Navigation */}
            <motion.aside
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="fixed left-0 top-0 h-full w-16 flex flex-col items-center justify-center gap-4 z-50"
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

            {/* Right Sidebar — Social Links */}
            <motion.aside
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="fixed right-0 top-0 h-full w-16 flex flex-col items-center justify-center gap-4 z-50"
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
