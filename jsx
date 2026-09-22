export default function App() {
  return (
    <main className="hero">
      <section className="glass" style={{ maxWidth: 1200, margin: '0 auto', borderRadius: 28, padding: 32 }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, letterSpacing: 1 }}>NEXA</div>
          <div style={{ display: 'flex', gap: 20, color: '#cbd5e1' }}>
            <span>Inicio</span>
            <span>Proyectos</span>
            <span>Precio</span>
            <span>Contacto</span>
          </div>
          <button className="button-primary">Comenzar</button>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 28, marginTop: 50, alignItems: 'center' }}>
          <div>
            <p style={{ color: '#67e8f9', fontWeight: 700, letterSpacing: 1 }}>DISEÑO MODERNO</p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.05, margin: '12px 0' }}>
              Haz que tu producto se vea imposible de ignorar.
            </h1>
            <p style={{ color: '#9fb3d9', fontSize: 18, lineHeight: 1.7 }}>
              Construimos experiencias digitales con impacto visual, confianza y claridad.
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              <button className="button-primary">Ver demo</button>
              <button style={{ background: 'transparent', color: '#e2e8f0', border: '1px solid rgba(148,163,184,0.3)', borderRadius: 999, padding: '0.95rem 1.5rem', fontWeight: 700 }}>
                Más información
              </button>
            </div>
          </div>

          <div className="card" style={{ minHeight: 420 }}>
            <div style={{ height: 230, borderRadius: 18, background: 'linear-gradient(135deg, #7c3aed, #22d3ee)', boxShadow: '0 20px 50px rgba(124, 58, 237, 0.35)' }} />
            <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
              <div className="card" style={{ padding: '1rem 1.1rem' }}>
                <strong>+3.2x</strong> engagement visual
              </div>
              <div className="card" style={{ padding: '1rem 1.1rem' }}>
                <strong>99.9%</strong> enfoque premium
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
              }
