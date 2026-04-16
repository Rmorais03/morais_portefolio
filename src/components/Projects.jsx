import React from 'react';
import { motion } from 'framer-motion';

function Projects() {
  // Array com os teus projetos de Dev / UI-UX
  const projectsData = [
    {
      id: 1,
      title: "Cybersecurity Management Platform",
      status: "In Progress",
      description: "Developing a robust Backoffice system for client and file management, ensuring compliance with the NIS2 directive protocols. Focused on secure data handling and administrative workflows.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop", 
      tags: ["React", "Node.js", "PostgreSQL", "NIS2 Compliance"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 2,
      title: "Creative Developer Portfolio",
      status: "Latest",
      description: "My personal portfolio featuring advanced CSS techniques, Framer Motion animations, and a focus on high-end UI/UX design. Optimized for performance and responsiveness.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      tags: ["React", "Framer Motion", "Bootstrap", "Figma"],
      demoLink: "#",
      codeLink: "https://github.com/Rmorais03/Portefolio-React-Rodrigo_Morais-2026"
    },
    {
      id: 3,
      title: "Sustainable Garden Guide",
      status: "Academic",
      description: "A minimalist, educational website about creating sustainable home gardens. Developed as a foundational project to master semantic HTML, CSS layouts, and vanilla JavaScript.",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop",
      tags: ["HTML5", "JavaScript", "CSS3", "Figma"],
      demoLink: "https://plantifyoficial-1kxtbn3tj-rmorais03s-projects.vercel.app/",
      codeLink: "https://github.com/Rmorais03/Plantify-Oficial"
    }
  ];

  // 1. Variantes para animar o Título e Texto descritivo
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // 2. Variantes da Grelha Mãe (Efeito Cascata)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Atraso de 0.2 segundos entre cada cartão
      },
    },
  };

  // 3. Variantes de Cada Cartão Filho
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', bounce: 0.3, duration: 0.8 },
    },
  };

  return (
    <section id="projects" className="projects-section pb-5 bg-darker position-relative">
      <div className="ambient-glow"></div>
      <div className="container position-relative z-1 pt-5">
        
        {/* Cabeçalho Animado */}
        <motion.div 
          className="text-center mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="display-5 fw-bold text-white mb-3">
            Featured <span className="text-neon">Projects</span>
          </h2>
          <p className="text-muted-light max-w-75 mx-auto">
            A showcase of my journey from web fundamentals to complex full-stack systems.
          </p>
        </motion.div>

        {/* Grelha de Projetos Animada */}
        <motion.div 
          className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Dispara quando 10% da grelha estiver visível
        >
          {projectsData.map((project) => (
            <motion.div className="col" key={project.id} variants={itemVariants}>
              <div className="project-card">
                
                {/* Imagem */}
                <div className="project-img-wrapper">
                  <img src={project.image} alt={project.title} className="project-img" />
                </div>
                
                {/* Conteúdo do Cartão */}
                <div className="p-4 d-flex flex-column flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge-neon py-1" style={{fontSize: '0.875rem'}}>
                      {project.status}
                    </span>
                  </div>
                  <h5 className="text-white fw-bold mb-3">{project.title}</h5>
                  <p className="text-muted-light flex-grow-1" style={{ fontSize: '0.9rem' }}>
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                  
                  {/* Botões/Links - com rel="noopener noreferrer" adicionado! */}
                  <div className="d-flex gap-3 mt-auto">
                    <a 
                      href={project.demoLink} 
                      className="btn btn-neon px-3 py-1 fw-bold" 
                      style={{ fontSize: '0.85rem' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                    <a 
                      href={project.codeLink} 
                      className="btn btn-outline-neon px-3 py-1 fw-bold" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.85rem' }}
                    >
                      GitHub
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default Projects;