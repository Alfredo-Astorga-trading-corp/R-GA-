import { useMemo, useState } from 'react'

const MEMBERSHIP_LEVELS = [
  { id: 'base', name: 'Base', minimumFund: 100, dailyProjection: 0.5, accent: '#94a3b8' },
  { id: 'plata', name: 'Plata', minimumFund: 500, dailyProjection: 3, accent: '#cbd5e1' },
  { id: 'oro', name: 'Oro', minimumFund: 1500, dailyProjection: 12, accent: '#fbbf24' },
  { id: 'premium', name: 'Premium', minimumFund: 5000, dailyProjection: 50, accent: '#22d3ee' },
]

function getMembership(balance) {
  return [...MEMBERSHIP_LEVELS]
    .reverse()
    .find((level) => balance >= level.minimumFund) ?? MEMBERSHIP_LEVELS[0]
}

function formatMoney(value) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)
}

export default function App() {
  const [balance, setBalance] = useState(100)
  const [inputValue, setInputValue] = useState('100')

  const membership = useMemo(() => getMembership(balance), [balance])
  const nextLevel = MEMBERSHIP_LEVELS.find((level) => level.minimumFund > balance)
  const progress = nextLevel
    ? Math.min(100, Math.round((balance / nextLevel.minimumFund) * 100))
    : 100

  function updateBalance(event) {
    event.preventDefault()
    const amount = Number(inputValue)
    if (Number.isFinite(amount) && amount >= 0) setBalance(amount)
  }

  return (
    <main className="hero">
      <section className="glass" style={{ maxWidth: 1200, margin: '0 auto', borderRadius: 28, padding: 32 }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 800, letterSpacing: 1 }}>RGA</div>
          <div style={{ display: 'flex', gap: 20, color: '#cbd5e1', flexWrap: 'wrap' }}>
            <a href="#cuenta">Mi cuenta</a>
            <a href="#niveles">Niveles</a>
            <a href="#riesgos">Información</a>
          </div>
          <button className="button-primary" onClick={() => document.querySelector('#cuenta')?.scrollIntoView({ behavior: 'smooth' })}>
            Ver cuenta
          </button>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 28, marginTop: 50, alignItems: 'center' }}>
          <div>
            <p style={{ color: '#67e8f9', fontWeight: 700, letterSpacing: 1 }}>MEMBRESÍAS RGA</p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.05, margin: '12px 0' }}>
              Sube de nivel de forma clara y progresiva.
            </h1>
            <p style={{ color: '#9fb3d9', fontSize: 18, lineHeight: 1.7 }}>
              Mantén un fondo mínimo en tu cuenta base y consulta qué nivel se alcanza según el saldo registrado.
            </p>
            <a className="button-primary" href="#niveles" style={{ display: 'inline-block', textDecoration: 'none', marginTop: 12 }}>
              Consultar niveles
            </a>
          </div>

          <div className="card" style={{ minHeight: 300 }}>
            <p style={{ color: '#9fb3d9', marginTop: 0 }}>Nivel actual</p>
            <h2 style={{ fontSize: 42, margin: '8px 0', color: membership.accent }}>{membership.name}</h2>
            <p style={{ color: '#cbd5e1' }}>Fondo registrado: <strong>{formatMoney(balance)}</strong></p>
            <div style={{ marginTop: 28, height: 10, borderRadius: 99, background: 'rgba(148,163,184,.2)' }}>
              <div style={{ width: `${progress}%`, height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #7c3aed, #22d3ee)' }} />
            </div>
            <p style={{ color: '#9fb3d9', fontSize: 14 }}>
              {nextLevel ? `Faltan ${formatMoney(Math.max(0, nextLevel.minimumFund - balance))} para ${nextLevel.name}` : 'Has alcanzado el nivel máximo configurado.'}
            </p>
          </div>
        </div>

        <section id="cuenta" style={{ marginTop: 44 }}>
          <div className="card">
            <h2>Simulador de cuenta</h2>
            <p style={{ color: '#9fb3d9' }}>Esta demostración recalcula el nivel automáticamente. En producción, el saldo debe validarse exclusivamente en el servidor.</p>
            <form onSubmit={updateBalance} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
              <label htmlFor="balance" style={{ display: 'grid', gap: 8, flex: '1 1 240px' }}>
                Fondo registrado (USD)
                <input id="balance" type="number" min="0" step="0.01" value={inputValue} onChange={(event) => setInputValue(event.target.value)} style={{ padding: 14, borderRadius: 10, border: '1px solid rgba(148,163,184,.3)', background: '#0f172a', color: 'white' }} />
              </label>
              <button className="button-primary" type="submit" style={{ alignSelf: 'end' }}>Actualizar nivel</button>
            </form>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginTop: 24 }}>
              <div><small style={{ color: '#9fb3d9' }}>Fondo mínimo base</small><h3>{formatMoney(MEMBERSHIP_LEVELS[0].minimumFund)}</h3></div>
              <div><small style={{ color: '#9fb3d9' }}>Proyección diaria del nivel</small><h3>{formatMoney(membership.dailyProjection)}</h3></div>
              <div><small style={{ color: '#9fb3d9' }}>Estado</small><h3 style={{ color: '#86efac' }}>Activo</h3></div>
            </div>
          </div>
        </section>

        <section id="niveles" style={{ marginTop: 44 }}>
          <h2>Niveles de membresía</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
            {MEMBERSHIP_LEVELS.map((level) => (
              <article className="card" key={level.id} style={{ borderColor: membership.id === level.id ? level.accent : undefined }}>
                <h3 style={{ color: level.accent }}>{level.name}</h3>
                <p style={{ color: '#9fb3d9' }}>Fondo mínimo</p>
                <strong>{formatMoney(level.minimumFund)}</strong>
                <p style={{ color: '#9fb3d9' }}>Proyección diaria configurada</p>
                <strong>{formatMoney(level.dailyProjection)}</strong>
              </article>
            ))}
          </div>
        </section>

        <aside id="riesgos" className="card" style={{ marginTop: 44, borderColor: 'rgba(251,191,36,.4)' }}>
          <strong>Importante:</strong> los valores mostrados son únicamente una proyección ilustrativa, no una promesa ni una garantía de rendimiento. Las inversiones y el trading pueden generar pérdidas. Antes de activar depósitos, retiros o pagos reales deben implementarse autenticación, validación de fondos, registros auditables, controles antifraude y revisión legal/regulatoria.
        </aside>
      </section>
    </main>
  )
}
