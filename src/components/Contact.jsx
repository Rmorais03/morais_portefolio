import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

function Contact() {
  return (
    <section id="contact" className="py-5 container">
      <motion.div
        className="cta-banner" // Removi o 'mx-auto' e 'text-center' daqui para as colunas mandarem
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="row align-items-center gy-5">
          {/* COLUNA ESQUERDA: Texto */}
          <div className="col-lg-6 text-center text-lg-start">
            <h2 className="display-4 fw-bold text-white mb-3">
              Available for Summer
            </h2>
            <h2 className="display-4 fw-bold text-neon mb-4 glow-text">
              Internship 2026
            </h2>
            <p className="text-muted-light fs-5 mb-0">
              Looking for opportunities in <span className="text-white fw-bold">Aveiro, Coimbra, Viseu</span>, or <span className="text-white fw-bold">Remote (PT/EN)</span>
            </p>
          </div>

          {/* COLUNA DIREITA: Formulário */}
          <div className="col-lg-6">
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;