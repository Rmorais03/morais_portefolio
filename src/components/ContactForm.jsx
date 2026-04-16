import React from 'react';

function ContactForm() {
  return (
    <div className="contact-form-card p-4">
      <form action="https://api.web3forms.com/submit" method="POST">
        
        <input type="hidden" name="access_key" value="eda83cd0-2046-49c2-960c-3893a9f64256" />

        <div className="mb-3 text-start">
          <label className="form-label text-white small fw-bold">NOME</label>
          <input type="text" name="name" className="form-control custom-input" placeholder="Teu nome..." required />
        </div>

        <div className="mb-3 text-start">
          <label className="form-label text-white small fw-bold">EMAIL</label>
          <input type="email" name="email" className="form-control custom-input" placeholder="teu@email.com" required />
        </div>

        <div className="mb-4 text-start">
          <label className="form-label text-white small fw-bold">MENSAGEM</label>
          <textarea name="message" className="form-control custom-input" rows="4" placeholder="Como posso ajudar?" required></textarea>
        </div>

        <button type="submit" className="btn btn-neon w-100 py-3 fw-bold">
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
}

export default ContactForm;