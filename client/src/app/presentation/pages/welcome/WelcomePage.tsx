import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/app/presentation/components/ui/button"
import "@/app/presentation/styles/App.css"

const navigation = [
  { label: "Inicio", href: "/inicio", active: true },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contáctanos", href: "#contactanos" },
  { label: "Login", href: "/login" },
]

export function WelcomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <nav className="welcome-nav" aria-label="Navegación principal">
          <Link className="welcome-logo" to="/inicio" aria-label="JK Publicitarios, inicio">
            <img src="/img/1x/logo-tb.png" alt="" />
            <span>JK Publicitarios</span>
          </Link>

          <div className={`welcome-menu${menuOpen ? " is-open" : ""}`}>
            {menuOpen && (
              <button
                className="welcome-menu-close"
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setMenuOpen(false)}
              >
                <i className="bx bx-x" aria-hidden="true" />
              </button>
            )}
            <ul className="welcome-menu-list">
              {navigation.map(({ label, href, active }) => (
                <li key={label}>
                  {href.startsWith("#") ? (
                    <a
                      className={`welcome-nav-link${active ? " is-active" : ""}`}
                      href={href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      className={`welcome-nav-link${active ? " is-active" : ""}`}
                      to={href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="welcome-social" aria-label="Redes sociales">
            <a href="https://www.facebook.com/reel/3337963379840073" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="bx bxl-facebook" aria-hidden="true" /></a>
            <a href="https://www.instagram.com/reel/C5ornGLJyMv/?utm_source=ig_web_copy_link" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="bx bxl-instagram" aria-hidden="true" /></a>
            <a href="https://wa.me/573157217123" aria-label="WhatsApp"><i className="bx bxl-whatsapp" aria-hidden="true" /></a>
            <a href="https://www.youtube.com/watch?v=5qvmaY8Orpg" target="_blank" rel="noreferrer" aria-label="YouTube"><i className="bx bxl-youtube" aria-hidden="true" /></a>
          </div>

          <div className="welcome-contact">
            <i className="bx bx-phone" aria-hidden="true" />
            <span>Grupo GAES 1</span>
          </div>

          <button
            className="welcome-menu-open"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <i className="bx bx-menu-alt-right" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <main>
        <section className="welcome-hero" id="home" aria-label="Bienvenidos a JK Publicitarios">
          <img className="welcome-hero-image" src="/img/BG-1.jpg" alt="" />
          <div className="welcome-hero-content">
            <div className="welcome-hero-text">
              <h1 className="welcome-subtitle">SOMOS UNA EMPRESA AL ALCANCE DE TUS MANOS</h1>
              <p className="welcome-title">Somos profesionales a tu disposición</p>
            </div>
            <Button asChild className="welcome-cta">
              <a href="https://wa.me/573157217123" target="_blank" rel="noreferrer">Escríbenos</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
