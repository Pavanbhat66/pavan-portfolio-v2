import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './landing.css'
import './redesign.css'

const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>
const SkillSymbol = ({ skill }) => {
  const marks = { JAVA: '☕', DBMS: '▤', OS: '⚙', 'DSA LEARNING': '⌘' }
  return <span aria-hidden="true">{marks[skill] || '⌁'}</span>
}
const TechSymbol = ({ tag }) => {
  const marks = { HTML: '</>', CSS: '#', JavaScript: 'JS', Java: '☕', DBMS: '▤', OS: '⚙', DSA: '⌘' }
  return <span className="tech-symbol" aria-hidden="true">{marks[tag] || '•'}</span>
}

function App() {
  const [data, setData] = React.useState(null)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [status, setStatus] = React.useState('')
  const [entered, setEntered] = React.useState(false)
  const [cursor, setCursor] = React.useState({ x: -100, y: -100 })

  React.useEffect(() => { fetch('/api/portfolio').then(r => r.json()).then(setData).catch(() => setStatus('The portfolio data could not be loaded.')) }, [])
  const sendMessage = async event => {
    event.preventDefault(); setStatus('Sending…')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(form)) })
    const result = await response.json()
    setStatus(result.message || result.error); if (response.ok) event.currentTarget.reset()
  }
  if (!data) return <main className="loading">Loading Pavan’s portfolio<span>.</span><span>.</span><span>.</span></main>
  if (!entered) return <main className="landing" onMouseMove={event => setCursor({ x: event.clientX, y: event.clientY })}><div className="custom-cursor" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}><span></span></div><p className="landing-index">01 — PORTFOLIO / 2026</p><div className="landing-copy"><p>HOSDURG PAVAN BHAT</p><h1>BUILDING<br/><em>with</em> purpose.</h1><p className="landing-note">Computer Science & Engineering<br/>Mangalore, India</p></div><button className="enter" onClick={() => setEntered(true)}>Enter portfolio <Arrow/></button><div className="landing-orbit">JAVA • WEB • SYSTEMS • IDEAS •</div></main>
  const scrollTo = id => { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }
  return <div className="app-shell" onMouseMove={event => setCursor({ x: event.clientX, y: event.clientY })}>
    <div className="custom-cursor" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}><span></span></div>
    <header className="topbar"><button className="wordmark" onClick={() => scrollTo('#home')}>PAVAN<span>®</span></button><button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>{menuOpen ? 'Close' : 'Menu'} <i></i></button><nav className={menuOpen ? 'open' : ''}>{[['Skills','#skills'],['About','#about'],['Projects','#work'],['Experience','#experience'],['Contact','#contact']].map(([label,id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</nav></header>
    <main>
      <section className="hero" id="home"><div className="eyebrow"><span></span>{data.availability}</div><div className="hero-grid"><div className="hero-copy"><p className="kicker">Hi, I’m</p><h1>{data.name}.<br/><em>Full-stack</em><br/>developer.</h1><p className="intro">{data.intro}</p><div className="hero-actions"><button className="round-link" onClick={() => scrollTo('#work')}>Explore my work <Arrow/></button><button className="text-link" onClick={() => scrollTo('#contact')}>Let’s connect ↓</button></div></div><div className="portrait-wrap"><div className="portrait-note">DESIGN × DEVELOPMENT<br/><b>MADE WITH CARE</b></div><img src="/pavan.png" alt="Pavan in a suit" /><div className="orbit">SCROLL TO EXPLORE • SCROLL TO EXPLORE •</div></div></div></section>
      <section className="skills-panel" id="skills"><div className="skills-heading"><p className="section-label">01 / SKILLSET</p><h2>Tools I’m<br/><em>growing with.</em></h2><p>Hover over a skill to bring it to life.</p></div><div className="logo-stage">{data.skills.concat(data.skills).map((skill, index) => <div className="skill-logo" key={`${skill}-${index}`}><b>{skill === 'DSA LEARNING' ? 'DSA' : skill}</b><SkillSymbol skill={skill}/></div>)}</div></section>
      <section className="about section" id="about"><p className="section-label">02 / ABOUT</p><div><h2>A practical mind<br/>with a <em>creative</em> pulse.</h2><p className="body-copy">{data.role} I enjoy the space where clear systems, considerate design, and real human needs meet. Every project is a chance to learn, simplify, and make something that matters.</p><div className="stats">{data.stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div></section>
      <section className="work section" id="work"><div className="work-head"><p className="section-label">03 / PROJECTS</p><h2>Things I’ve<br/><em>brought to life.</em></h2></div><div className="project-list">{data.projects.map((project, index) => <article className="project" key={project.id}><div className={'project-art '+project.color}><span>0{index + 1}</span><div className="project-shape"></div><p>{project.category}<br/>{project.year}</p></div><div className="project-copy"><p className="project-number">(0{index + 1})</p><h3>{project.title}</h3><p>{project.description}</p><div>{project.tags.map(tag => <span key={tag}><TechSymbol tag={tag}/>{tag}</span>)}</div></div><button aria-label={`View ${project.title}`} className="project-go"><Arrow/></button></article>)}</div></section>
      <section className="experience section" id="experience"><p className="section-label">04 / EXPERIENCE</p><div><h2>What I’m<br/><em>building toward.</em></h2><div className="experience-list">{data.experience.map(item => <article key={item.company} className="experience-card"><p>{item.period}</p><h3>{item.company}</h3><strong>{item.role}</strong><p>{item.detail}</p><div>{item.skills.map(skill => <span key={skill}>{skill}</span>)}</div></article>)}</div></div></section>
      <section className="education section"><p className="section-label">05 / EDUCATION & HIGHLIGHTS</p><div className="education-content"><h2>Always<br/><em>learning.</em></h2><div className="timeline">{data.education.map(item => <article key={item.period}><span>{item.period}</span><div><h3>{item.school}</h3><p>{item.course}</p></div></article>)}</div><div className="highlight-box"><p>HIGHLIGHTS</p>{data.highlights.map((highlight, index) => <div key={highlight}><b>0{index + 1}</b><span>{highlight}</span></div>)}</div></div></section>
      <section className="contact" id="contact"><div><p className="section-label">06 / CONTACT</p><h2>Let’s make<br/>something <em>good.</em></h2><p>Have an idea, a question, or just want to say hello? I’d be glad to hear from you.</p><div className="contact-links"><a href={`mailto:${data.contact.email}`}>{data.contact.email}</a><a href={data.contact.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={data.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div><form onSubmit={sendMessage}><label>Your name<input name="name" required placeholder="Jane Smith"/></label><label>Email address<input name="email" type="email" required placeholder="jane@example.com"/></label><label>What’s on your mind?<textarea name="message" required placeholder="Tell me a little about it…" rows="3"/></label><button className="send" type="submit">Send a message <Arrow/></button>{status && <p className="form-status" role="status">{status}</p>}</form></section>
    </main><footer><span>© {new Date().getFullYear()} Pavan</span><span>Built with intent.</span><button onClick={() => scrollTo('#home')}>Back to top ↑</button></footer>
  </div>
}
createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
