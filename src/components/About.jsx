export default function About({ copy }) {
  const skills = [
    ['react', 'React'],
    ['javascript', 'JavaScript'],
    ['api', copy.api],
    ['tailwind', 'Tailwind CSS'],
    ['figma', 'Figma'],
    ['docker', 'Docker'],
  ];

  return (
    <section id="about" className="site-section" aria-labelledby="about-title">
      <div className="container section-split">
        <div className="section-heading">
          <h2 id="about-title" className="section-title">
            {copy.heading} <span className="section-accent">{copy.highlight}</span>
          </h2>
          <p className="section-description">{copy.intro}</p>
          <p className="section-description">
            {copy.educationStart}{' '}
            <strong lang="pt-PT">Tecnologias e Design de Multimédia</strong>{' '}
            {copy.educationEnd}
          </p>
        </div>

        <div className="skills-panel">
          <h3 className="skills-title"><span className="section-accent">{copy.skills}</span> {copy.tools}</h3>
          <ul className="skills-list list-unstyled mb-0" role="list">
            {skills.map(([id, label]) => (
              <li key={id}>
                <img
                  src={`/skills/${id}.svg`}
                  className={id === 'api' ? 'skill-icon skill-icon--api' : 'skill-icon'}
                  alt=""
                  width="56"
                  height="56"
                  loading="lazy"
                  decoding="async"
                />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}