import ContactForm from './ContactForm';

export default function Contact({ copy }) {
  return (
    <section id="contact" className="site-section" aria-labelledby="contact-title">
      <div className="container section-split">
        <div className="section-heading">
          <h2 id="contact-title" className="section-title">{copy.heading}</h2>
          <p className="section-description">{copy.intro}</p>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/rodrigojnmorais/" target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a href="https://github.com/Rmorais03" target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="contact-panel">
          <ContactForm copy={copy} />
        </div>
      </div>
    </section>
  );
}