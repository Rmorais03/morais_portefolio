import { useState } from 'react';
import ThemeControl from './ThemeControl';

export default function Navbar({ copy, language, onLanguageChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const links = [
    ['projects', copy.projects],
    ['experience', copy.experience],
    ['about', copy.about],
    ['contact', copy.contact],
  ];

  return (
    <header className="site-header sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#" onClick={() => setIsExpanded(false)}>
            Rodrigo <span>Morais</span>
          </a>

          <div className="language-switcher ms-auto ms-lg-0" role="group" aria-label={copy.language}>
            <button
              type="button"
              lang="en"
              aria-label="English"
              aria-pressed={language === 'en'}
              onClick={() => onLanguageChange('en')}
            >
              EN
            </button>
            <button
              type="button"
              lang="pt-PT"
              aria-label="Português de Portugal"
              aria-pressed={language === 'pt-PT'}
              onClick={() => onLanguageChange('pt-PT')}
            >
              PT
            </button>
          </div>

          <ThemeControl copy={copy.theme} />

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsExpanded(expanded => !expanded)}
            aria-controls="navbarNav"
            aria-expanded={isExpanded}
            aria-label={copy.toggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse justify-content-end${isExpanded ? ' show' : ''}`} id="navbarNav">
            <ul className="navbar-nav">
              {links.map(([id, label]) => (
                <li className="nav-item" key={id}>
                  <a className="nav-link" href={`#${id}`} onClick={() => setIsExpanded(false)}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}