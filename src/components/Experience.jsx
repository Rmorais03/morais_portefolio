export default function Experience({ copy }) {
  return (
    <section id="experience" className="site-section" aria-labelledby="experience-title">
      <div className="container">
        <div className="section-heading">
          <h2 id="experience-title" className="section-title">
            {copy.heading} <span className="section-accent">{copy.highlight}</span>
          </h2>
        </div>

        <article className="experience-panel">
          <div className="experience-details">
            <h3 className="experience-title">
              <span className="experience-company">Ubiwhere</span>{' '}
              <span className="experience-role">{copy.role}</span>
            </h3>
            <p className="experience-meta">
              <time dateTime="2026-07">{copy.start}</time>–<time dateTime="2026-08">{copy.end}</time> · Aveiro, Portugal
            </p>
          </div>
          <ul className="experience-contributions">
            {copy.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
          </ul>
        </article>
      </div>
    </section>
  );
}
