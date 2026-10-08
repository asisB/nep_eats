import { useState } from 'react'

// ====== EDIT THESE CONTACT DETAILS ======
const CONTACT = {
  phone: '+977-9800000000',
  whatsapp: '9779800000000', // country code + number, no + or spaces
  email: 'hello@nepeats.com',
  area: 'Pokhara, Gandaki Province, Nepal',
}

const MENU = [
  { id: 1, cat: 'Momo', name: 'Steamed Chicken Momo', price: 220, desc: '10 pcs with spicy achar' },
  { id: 2, cat: 'Momo', name: 'Buff Jhol Momo', price: 200, desc: '10 pcs in tangy sesame soup' },
  { id: 3, cat: 'Momo', name: 'Veg Fried Momo', price: 180, desc: '10 pcs, crispy and golden' },
  { id: 4, cat: 'Meals', name: 'Nepali Dal Bhat Set', price: 350, desc: 'Dal, rice, tarkari, saag, pickle' },
  { id: 5, cat: 'Meals', name: 'Chicken Fried Rice', price: 280, desc: 'Wok-tossed with egg and veggies' },
  { id: 6, cat: 'Meals', name: 'Chicken Chowmein', price: 240, desc: 'Street-style stir-fried noodles' },
  { id: 7, cat: 'Snacks', name: 'Chicken Choila', price: 320, desc: 'Newari spiced grilled chicken' },
  { id: 8, cat: 'Snacks', name: 'Buff Sekuwa', price: 300, desc: 'Charcoal-style skewers' },
  { id: 9, cat: 'Snacks', name: 'Chatamari', price: 200, desc: 'Newari rice crepe with toppings' },
  { id: 10, cat: 'Soups', name: 'Chicken Thukpa', price: 260, desc: 'Himalayan noodle soup' },
  { id: 11, cat: 'Drinks', name: 'Masala Tea', price: 60, desc: 'Hot and freshly brewed' },
  { id: 12, cat: 'Drinks', name: 'Sel Roti (3 pcs)', price: 120, desc: 'Sweet traditional rice bread' },
]
const CATS = ['All', ...new Set(MENU.map((m) => m.cat))]

export default function App() {
  const [cat, setCat] = useState('All')
  const [cart, setCart] = useState({})

  const add = (id, d) =>
    setCart((c) => {
      const q = Math.max(0, (c[id] || 0) + d)
      const n = { ...c }
      q ? (n[id] = q) : delete n[id]
      return n
    })

  const items = MENU.filter((m) => cart[m.id])
  const total = items.reduce((s, m) => s + m.price * cart[m.id], 0)
  const count = items.reduce((s, m) => s + cart[m.id], 0)

  const orderLink = () => {
    const lines = items.map((m) => `${cart[m.id]} x ${m.name} - Rs ${m.price * cart[m.id]}`)
    const msg = `Hello Nep Eats! I'd like to order:\n${lines.join('\n')}\nTotal: Rs ${total}\nDelivery address: `
    return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`
  }

  return (
    <>
      <header className="nav">
        <img src="/logo.png" alt="Nep Eats logo" />
        <nav>
          <a href="#menu">Menu</a>
          <a href="#about">Why Us</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <img className="hero-logo" src="/logo.png" alt="Nep Eats" />
        <h1>Fresh food at your door in <span>30 minutes</span></h1>
        <p>Cloud kitchen delivering across Pokhara, open 24 hours a day.</p>
        <div className="btns">
          <a className="btn" href="#menu">Order Now</a>
          <a className="btn ghost" href={`tel:${CONTACT.phone}`}>Call {CONTACT.phone}</a>
        </div>
      </section>

      <section id="about" className="features">
        {[
          ['⏱️', '30-Minute Delivery', 'Hot and fresh, or we make it right.'],
          ['🌙', 'Open 24/7', 'Late-night cravings or early mornings, we are ready.'],
          ['👨‍🍳', 'Cooked Fresh', 'Every order is prepared after you place it.'],
          ['📍', 'All of Pokhara', 'Lakeside, Chipledhunga, Bagar and beyond.'],
        ].map(([i, t, d]) => (
          <div className="card" key={t}><div className="icon">{i}</div><h3>{t}</h3><p>{d}</p></div>
        ))}
      </section>

      <section id="menu" className="section">
        <h2>Our Menu</h2>
        <div className="tabs">
          {CATS.map((c) => (
            <button key={c} className={c === cat ? 'tab on' : 'tab'} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="grid">
          {MENU.filter((m) => cat === 'All' || m.cat === cat).map((m) => (
            <div className="dish" key={m.id}>
              <div>
                <h3>{m.name}</h3>
                <p>{m.desc}</p>
                <strong>Rs {m.price}</strong>
              </div>
              <div className="qty">
                {cart[m.id] ? (
                  <>
                    <button onClick={() => add(m.id, -1)}>−</button>
                    <span>{cart[m.id]}</span>
                    <button onClick={() => add(m.id, 1)}>+</button>
                  </>
                ) : (
                  <button className="addbtn" onClick={() => add(m.id, 1)}>Add</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {count > 0 && (
        <div className="cartbar">
          <span>{count} item{count > 1 ? 's' : ''} · Rs {total}</span>
          <a className="btn" href={orderLink()} target="_blank" rel="noreferrer">Order on WhatsApp</a>
        </div>
      )}

      <section id="contact" className="section contact">
        <h2>Contact Us</h2>
        <p>📞 <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a></p>
        <p>✉️ <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
        <p>📍 {CONTACT.area}</p>
        <p>🕒 Open 24 hours · 7 days a week</p>
      </section>

      <footer>© {new Date().getFullYear()} Nep Eats. Cooked fresh, delivered fast.</footer>
    </>
  )
}
