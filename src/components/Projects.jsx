import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

const motionPreference = '(prefers-reduced-motion: reduce)';
const carouselOptions = { loop: true, align: 'start', dragFree: true };
const resumeDelay = 1100;

const projects = [
  {
    id: 'ubiwhere',
    // Illustrative server photograph by Taylor Vick: https://unsplash.com/photos/M5tzZtFCOfs
    image: '/ubiwhere-cover.jpg',
    imageLabel: 'Ubiwhere',
    tags: ['React', 'KrakenD', 'Keycloak', 'Kubernetes'],
  },
  {
    id: 'cybersecurity',
    // Original cover photograph by Adi Goldstein: https://unsplash.com/photos/EUsVwEOsblE
    image: '/cybersecurity-cover.jpg',
    tags: ['React', 'Node.js', 'PostgreSQL', 'NIS2'],
  },
  {
    id: 'portfolio',
    image: '/portefolio.png',
    tags: ['React', 'CSS', 'Bootstrap', 'Figma'],
    codeLink: 'https://github.com/Rmorais03/morais_portefolio',
  },
  {
    id: 'plantify',
    image: '/plantify.jpg',
    tags: ['HTML5', 'JavaScript', 'CSS3', 'Figma'],
    demoLink: 'https://plantifyoficial.vercel.app/',
    codeLink: 'https://github.com/Rmorais03/Plantify-Oficial',
  },
];

function navigateCarousel(carousel, move) {
  if (!carousel) return;
  const autoScroll = carousel.plugins().autoScroll;
  const wasPlaying = autoScroll.isPlaying();
  autoScroll.stop();
  move(carousel);
  if (wasPlaying) autoScroll.play(2500);
}

export default function Projects({ copy }) {
  const [plugins] = useState(() => [AutoScroll({
    speed: 0.68,
    playOnInit: false,
    stopOnFocusIn: true,
  })]);
  const [viewportRef, carousel] = useEmblaCarousel(carouselOptions, plugins);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia(motionPreference).matches);

  useEffect(() => {
    const preference = window.matchMedia(motionPreference);
    const updateMotion = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', updateMotion);
    return () => preference.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    if (!carousel) return;

    function updateArrows() {
      setCanScrollBack(carousel.canScrollPrev());
      setCanScrollForward(carousel.canScrollNext());
    }

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(carousel.rootNode());
    const startDrag = () => setIsDragging(true);
    const endDrag = () => setIsDragging(false);
    function handleResize() {
      endDrag();
      updateArrows();
    }
    carousel.on('select', updateArrows).on('reInit', handleResize);
    carousel.on('pointerDown', startDrag).on('pointerUp', endDrag);
    updateArrows();

    return () => {
      observer.disconnect();
      carousel.off('select', updateArrows).off('reInit', handleResize);
      carousel.off('pointerDown', startDrag).off('pointerUp', endDrag);
    };
  }, [carousel]);

  const shouldPlay = isVisible && !isPaused && !isHovered && !hasKeyboardFocus && !isDragging && !reducedMotion;

  useEffect(() => {
    if (!carousel) return;

    function updateAutoScroll() {
      const autoScroll = carousel.plugins().autoScroll;
      if (shouldPlay) autoScroll.play(resumeDelay);
      else autoScroll.stop();
    }

    updateAutoScroll();
    carousel.on('reInit', updateAutoScroll);
    return () => carousel.off('reInit', updateAutoScroll);
  }, [carousel, shouldPlay]);

  useEffect(() => {
    if (!carousel) return;

    function revealLinkedProject() {
      const index = carousel.slideNodes().findIndex(slide => `#${slide.id}` === window.location.hash);
      if (index >= 0) navigateCarousel(carousel, api => api.scrollTo(index, true));
    }

    // Re-select the card when its link is used again without changing the hash.
    function handleRepeatLink(event) {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href^="#project-"]');
      if (link?.hash === window.location.hash) revealLinkedProject();
    }

    revealLinkedProject();
    window.addEventListener('hashchange', revealLinkedProject);
    document.addEventListener('click', handleRepeatLink);
    return () => {
      window.removeEventListener('hashchange', revealLinkedProject);
      document.removeEventListener('click', handleRepeatLink);
    };
  }, [carousel]);

  function scrollProjects(direction) {
    navigateCarousel(carousel, api => {
      if (direction < 0) api.scrollPrev(reducedMotion);
      else api.scrollNext(reducedMotion);
    });
  }

  function handleTrackKeyDown(event) {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      scrollProjects(event.key === 'ArrowLeft' ? -1 : 1);
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const index = event.key === 'Home' ? 0 : projects.length - 1;
      navigateCarousel(carousel, api => api.scrollTo(index, reducedMotion));
    }
  }

  return (
    <section id="projects" className="site-section" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-heading project-heading">
          <h2 id="projects-title" className="section-title">
            {copy.heading} <span className="section-accent">{copy.highlight}</span>
          </h2>
          <div className="project-controls">
            {!reducedMotion && (
              <button
                type="button"
                className="project-carousel-arrow project-carousel-toggle"
                aria-label={isPaused ? copy.resume : copy.pause}
                aria-controls="project-track"
                onClick={() => setIsPaused(paused => !paused)}
              >
                <span className={isPaused ? 'project-play-icon' : 'project-pause-icon'} aria-hidden="true"></span>
              </button>
            )}
            <button
              type="button"
              className="project-carousel-arrow project-carousel-arrow--previous"
              aria-label={copy.previous}
              aria-controls="project-track"
              aria-disabled={!canScrollBack}
              onClick={() => canScrollBack && scrollProjects(-1)}
            >
              <span aria-hidden="true"></span>
            </button>
            <button
              type="button"
              className="project-carousel-arrow"
              aria-label={copy.next}
              aria-controls="project-track"
              aria-disabled={!canScrollForward}
              onClick={() => canScrollForward && scrollProjects(1)}
            >
              <span aria-hidden="true"></span>
            </button>
          </div>
        </div>
        <div
          ref={viewportRef}
          className="project-carousel-window"
          role="region"
          aria-label={copy.carousel}
          tabIndex={0}
          data-dragging={isDragging ? 'true' : undefined}
          onKeyDown={handleTrackKeyDown}
          onPointerEnter={event => {
            if (event.pointerType === 'mouse') setIsHovered(true);
          }}
          onPointerLeave={event => {
            if (event.pointerType === 'mouse') setIsHovered(false);
          }}
          onFocusCapture={event => setHasKeyboardFocus(event.target.matches(':focus-visible'))}
          onBlurCapture={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setHasKeyboardFocus(false);
          }}
        >
          <ul id="project-track" className="project-carousel list-unstyled mb-0">
            {projects.map(({ id, image, imageLabel, tags, demoLink, codeLink }) => {
              const { title, status, description } = copy.cards[id];

              return (
                <li key={id} id={`project-${id}`} className="project-carousel-item">
                  <article className="project-card">
                    <div className="project-img-wrapper">
                      <img src={image} alt="" loading="lazy" decoding="async" draggable={false} className="project-img" />
                      {imageLabel && <span className="project-image-label">{imageLabel}</span>}
                    </div>
                    <div className="project-body">
                      <span className="project-status">{status}</span>
                      <h3>{title}</h3>
                      <p>{description}</p>

                      <div className="d-flex flex-wrap gap-2">
                        {tags.map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}
                      </div>

                      {(demoLink || codeLink) && (
                        <div className="project-links">
                          {demoLink && (
                            <a href={demoLink} className="site-button site-button--outline" target="_blank" rel="noopener noreferrer">
                              {copy.demo}
                            </a>
                          )}
                          {codeLink && (
                            <a href={codeLink} className="site-button site-button--outline" target="_blank" rel="noopener noreferrer">
                              GitHub
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}