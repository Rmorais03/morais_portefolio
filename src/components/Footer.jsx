export default function Footer({ copy, role }) {
  return (
    <footer className="footer-section">
      <div className="container footer-content">
        <div>
          <p className="footer-name">Rodrigo <span>Morais</span></p>
          <p className="footer-role">{role} · {copy.location}</p>
        </div>
        <p className="footer-copyright">© 2026 {copy.copyright}</p>
      </div>
    </footer>
  );
}