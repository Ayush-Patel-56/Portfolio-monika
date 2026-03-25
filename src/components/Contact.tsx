import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiMail, FiMapPin } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real scenario, send to a backend or Formspree
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" ref={ref} className="py-24 px-20 max-w-6xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="section-title text-white mb-4"
            >
                Get In{' '}
                <span className="text-cyan-400">Touch</span>
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-sm mb-12"
            >
                Have a project in mind or want to collaborate? Feel free to reach out!
            </motion.p>

            <div className="grid grid-cols-2 gap-12">
                {/* Left — Info */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-col gap-6"
                >
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-4">
                            <div className="glass-card p-3 text-cyan-400">
                                <FiMail size={20} />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs">Email</p>
                                <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-cyan-400 transition-colors text-sm">
                                    {personalInfo.email}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="glass-card p-3 text-cyan-400">
                                <FiMapPin size={20} />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs">Location</p>
                                <p className="text-white text-sm">India 🇮🇳</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative terminal snippet */}
                    <div
                        className="rounded-xl p-5 font-mono text-xs mt-4"
                        style={{
                            background: 'rgba(5, 8, 18, 0.95)',
                            border: '1px solid rgba(34,211,238,0.15)',
                        }}
                    >
                        <p className="text-slate-500">// Let's build something amazing</p>
                        <p className="text-cyan-400 mt-2">const collaborate = {'{'}</p>
                        <p className="text-slate-300 pl-4">status: <span className="text-green-400">"Available"</span>,</p>
                        <p className="text-slate-300 pl-4">response: <span className="text-yellow-400">"&lt; 24 hours"</span>,</p>
                        <p className="text-slate-300 pl-4">passion: <span className="text-purple-400">"100%"</span></p>
                        <p className="text-cyan-400">{'}'}</p>
                    </div>
                </motion.div>

                {/* Right — Form */}
                <motion.form
                    initial={{ opacity: 0, x: 40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    onSubmit={handleSubmit}
                    className="glass-card p-6 flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-name" className="text-slate-400 text-xs">Name</label>
                        <input
                            id="contact-name"
                            type="text"
                            required
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="Your Name"
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-200 placeholder-slate-600"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-email" className="text-slate-400 text-xs">Email</label>
                        <input
                            id="contact-email"
                            type="email"
                            required
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            placeholder="your@email.com"
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-200 placeholder-slate-600"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="contact-message" className="text-slate-400 text-xs">Message</label>
                        <textarea
                            id="contact-message"
                            required
                            rows={5}
                            value={form.message}
                            onChange={e => setForm({ ...form, message: e.target.value })}
                            placeholder="Tell me about your project or idea..."
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-200 resize-none placeholder-slate-600"
                        />
                    </div>
                    <button
                        id="contact-submit"
                        type="submit"
                        className="flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-cyan-md hover:-translate-y-0.5"
                        style={{
                            background: submitted
                                ? 'linear-gradient(135deg, #22d3ee, #22c55e)'
                                : 'linear-gradient(135deg, #22d3ee, #6366f1)',
                            color: '#070b14',
                        }}
                    >
                        {submitted ? '✓ Message Sent!' : (<><FiSend size={14} /> Send Message</>)}
                    </button>
                </motion.form>
            </div>
        </section>
    );
}
