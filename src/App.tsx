import './index.css';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import OpenSource from './components/OpenSource';
import Projects from './components/Projects';
import CodingProfiles from './components/CodingProfiles';
import GitHubStats from './components/GitHubStats';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-bg-primary font-sans">
      {/* Fixed sidebars */}
      <Sidebar />

      {/* Main content — padded for sidebars */}
      <main>
        <Hero />
        <About />
        <Skills />
        <OpenSource />
        <Projects />
        <CodingProfiles />
        <GitHubStats />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
