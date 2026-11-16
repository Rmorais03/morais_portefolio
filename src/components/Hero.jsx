export default function Hero({ copy, role, featuredProject }) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="container hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-name">Rodrigo <span>Morais</span></h1>
          <p className="hero-role">{role}</p>
          <p className="hero-intro">{copy.intro}</p>

          <div className="hero-actions">
            <a href="#projects" className="site-button">{copy.projects} <span aria-hidden="true">↓</span></a>
            <a href="#contact" className="site-button site-button--outline">{copy.contact}</a>
          </div>
        </div>

        <a className="hero-feature" href="#project-ubiwhere">
          <div className="hero-feature-media">
            <img src="/ubiwhere-cover.jpg" alt="" width="1080" height="680" />
            <span className="hero-feature-label">{copy.featured}</span>
            <span className="hero-feature-arrow" aria-hidden="true">↘</span>
          </div>
          <div className="hero-feature-content">
            <p className="hero-feature-company">Ubiwhere · {copy.featuredRole}</p>
            <h2>{featuredProject.title}</h2>
            <span className="project-status">{featuredProject.status}</span>
          </div>
        </a>
      </div>
    </section>
  );
}