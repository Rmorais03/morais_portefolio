export default function ContactForm({ copy }) {
  return (
    <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">

      <input type="hidden" name="access_key" value="eda83cd0-2046-49c2-960c-3893a9f64256" />

      <div className="mb-3 text-start">
        <label htmlFor="contact-name" className="form-label fw-semibold">{copy.name}</label>
        <input id="contact-name" type="text" name="name" autoComplete="name" className="form-control custom-input" placeholder={copy.namePlaceholder} required />
      </div>

      <div className="mb-3 text-start">
        <label htmlFor="contact-email" className="form-label fw-semibold">{copy.email}</label>
        <input id="contact-email" type="email" name="email" autoComplete="email" className="form-control custom-input" placeholder={copy.emailPlaceholder} required />
      </div>

      <div className="mb-4 text-start">
        <label htmlFor="contact-message" className="form-label fw-semibold">{copy.message}</label>
        <textarea id="contact-message" name="message" className="form-control custom-input" rows="4" placeholder={copy.messagePlaceholder} required></textarea>
      </div>

      <button type="submit" className="site-button">
        {copy.send}
      </button>
    </form>
  );
}