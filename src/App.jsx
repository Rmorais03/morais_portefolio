import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { translations } from './translations';

export default function App() {
  const [language, setLanguage] = useState(() =>
    new URLSearchParams(window.location.search).get('lang') === 'pt-PT' ? 'pt-PT' : 'en'
  );
  const copy = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `Rodrigo Morais | ${copy.role}`;
  }, [language, copy.role]);

  function changeLanguage(nextLanguage) {
    const url = new URL(window.location.href);
    if (nextLanguage === 'pt-PT') {
      url.searchParams.set('lang', nextLanguage);
    } else {
      url.searchParams.delete('lang');
    }
    window.history.replaceState(window.history.state, '', url);
    setLanguage(nextLanguage);
  }

  return (
    <div className="site">
      <a className="skip-link" href="#main-content">{copy.navigation.skip}</a>
      <Navbar copy={copy.navigation} language={language} onLanguageChange={changeLanguage} />
      <main id="main-content" tabIndex={-1}>
        <Hero copy={copy.hero} role={copy.role} featuredProject={copy.projects.cards.ubiwhere} />
        <Projects copy={copy.projects} />
        <Experience copy={copy.experience} />
        <About copy={copy.about} />
        <Contact copy={copy.contact} />
      </main>
      <Footer copy={copy.footer} role={copy.role} />
    </div>
  );
}