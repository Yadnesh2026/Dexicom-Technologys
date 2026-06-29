import React, { useEffect, useState } from 'react';
import {
  FaAws,
  FaBars,
  FaBrain,
  FaCloud,
  FaCode,
  FaDocker,
  FaGithub,
  FaLinkedin,
  FaMobileAlt,
  FaMoon,
  FaNodeJs,
  FaPaintBrush,
  FaReact,
  FaRocket,
  FaShieldAlt,
  FaSun,
  FaTimes,
  FaUsers
} from 'react-icons/fa';
import { SiExpress, SiMongodb } from 'react-icons/si';
import { motion } from 'framer-motion';

const companyName = 'Dexmap Technologies';
const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://dexicom-technologys.onrender.com' : 'http://localhost:5000');

const services = [
  ['Website Development', 'Fast, responsive websites designed to turn visitors into customers.', FaCode],
  ['Web Application Development', 'Custom business applications with clean interfaces and reliable workflows.', FaRocket],
  ['Mobile App Development', 'Mobile-first app experiences for startups and modern teams.', FaMobileAlt],
  ['AI Solutions', 'Smart automation and AI features that make your product more powerful.', FaBrain],
  ['Cloud Services', 'Cloud setup, deployment, scaling, and infrastructure guidance.', FaCloud],
  ['UI/UX Design', 'Clear user journeys, modern visuals, and conversion-focused product design.', FaPaintBrush],
  ['Technology Consulting', 'Practical technology advice for planning, building, and growing.', FaUsers]
];

const features = [
  ['Experienced Team', 'Practical knowledge across web, software, cloud, and product delivery.'],
  ['Modern Technologies', 'We use reliable, current tools that keep projects maintainable.'],
  ['Fast Delivery', 'Focused planning and execution help your idea reach users quickly.'],
  ['Affordable Pricing', 'Flexible project scopes built for startups and small businesses.'],
  ['Secure Solutions', 'Security-aware development for stronger digital products.'],
  ['Long-Term Support', 'Ongoing support after launch so your platform keeps improving.']
];

const processSteps = [
  'Discovery Call',
  'Requirement Analysis',
  'Planning',
  'Design',
  'Development',
  'Testing',
  'Deployment',
  'Support'
];

const techStack = [
  ['React.js', FaReact],
  ['Node.js', FaNodeJs],
  ['Express.js', SiExpress],
  ['MongoDB', SiMongodb],
  ['Plain CSS', FaPaintBrush],
  ['AWS', FaAws],
  ['GitHub', FaGithub],
  ['Docker', FaDocker]
];

const faqs = [
  ['What services do you provide?', 'We provide website development, web apps, mobile apps, AI solutions, cloud services, UI/UX design, and technology consulting.'],
  ['How long does a project take?', 'A small website can take 1-3 weeks, while larger software projects depend on scope and features.'],
  ['Do you provide support after delivery?', 'Yes. We provide post-launch support, maintenance, improvements, and technical guidance.'],
  ['How can I request a quote?', 'Send your details through the contact form and we will respond with the next steps.'],
  ['Do you work with startups?', 'Yes. We work with startups, small businesses, entrepreneurs, and growing organizations.']
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function SectionHeading({ eyebrow, title, text }) {
  return (
    <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.div>
  );
}

function Navbar({ isDark, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const links = ['Home', 'About', 'Services', 'FAQ', 'Contact'];

  return (
    <header className="navbar">
      <a className="logo" href="#home" onClick={() => setOpen(false)}>
        <img src="/default.png" alt={`${companyName} logo`} className="logo-image" />
        {companyName}
      </a>
      <nav className={open ? 'nav-links active' : 'nav-links'}>
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
            {link}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
          Get Started
        </a>
      </nav>
      <div className="nav-actions">
        <button className="icon-button" type="button" onClick={onToggleTheme} aria-label="Toggle dark mode">
          {isDark ? <FaSun /> : <FaMoon />}
        </button>
        <button className="icon-button menu-button" type="button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <motion.p className="tagline" variants={fadeUp} initial="hidden" animate="show">
          Turning Ideas Into Digital Solutions
        </motion.p>
        <motion.h1 variants={fadeUp} initial="hidden" animate="show">
          Building Smart Digital Solutions For Growing Businesses
        </motion.h1>
        <motion.p className="hero-text" variants={fadeUp} initial="hidden" animate="show">
          We help businesses scale with modern web development, software solutions, and technology consulting.
        </motion.p>
        <motion.div className="hero-buttons" variants={fadeUp} initial="hidden" animate="show">
          <a className="primary-button" href="#contact">Get Started</a>
          <a className="secondary-button" href="#contact">Contact Us</a>
        </motion.div>
      </div>
      <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <div className="dashboard-card">
          <div className="dashboard-top">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="dashboard-grid">
            <div className="metric large">
              <strong>100%</strong>
              <small>Commitment</small>
            </div>
            <div className="metric">
              <strong>24/7</strong>
              <small>Support</small>
            </div>
            <div className="chart">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div className="task-list">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <motion.div className="float-chip chip-one" animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
          Web Apps
        </motion.div>
        <motion.div className="float-chip chip-two" animate={{ y: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}>
          Cloud Ready
        </motion.div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <SectionHeading eyebrow="Who We Are" title="A technology partner for ambitious businesses" text="Dexmap Technologies helps startups and businesses design, build, and launch digital products with clarity." />
      <div className="about-grid">
        <motion.article className="info-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3>Mission</h3>
          <p>Helping businesses leverage technology to grow faster.</p>
        </motion.article>
        <motion.article className="info-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3>Vision</h3>
          <p>To become a trusted technology partner for startups and businesses worldwide.</p>
        </motion.article>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section section-muted">
      <SectionHeading eyebrow="Services" title="Digital services built around your goals" text="From first website to custom software, we build clean solutions that help your business move faster." />
      <div className="card-grid services-grid">
        {services.map(([title, text, Icon]) => (
          <motion.article className="service-card" key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="section">
      <SectionHeading eyebrow="Why Choose Us" title="Reliable delivery with a practical mindset" />
      <div className="stats-row">
        <div><strong>100%</strong><span>Commitment</span></div>
        <div><strong>24/7</strong><span>Support</span></div>
        <div><strong>Quality</strong><span>Focused</span></div>
      </div>
      <div className="card-grid">
        {features.map(([title, text]) => (
          <motion.article className="feature-card" key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <FaShieldAlt />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function WorkProcess() {
  return (
    <section className="section section-muted">
      <SectionHeading eyebrow="Work Process" title="A clear path from idea to launch" />
      <div className="timeline">
        {processSteps.map((step, index) => (
          <motion.div className="timeline-step" key={step} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span>{index + 1}</span>
            <p>{step}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TechnologyStack() {
  return (
    <section className="section">
      <SectionHeading eyebrow="Technology Stack" title="Tools we use to build strong products" />
      <div className="tech-grid">
        {techStack.map(([name, Icon]) => (
          <motion.div className="tech-card" key={name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Icon />
            <span>{name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section id="faq" className="section">
      <SectionHeading eyebrow="FAQ" title="Common questions" />
      <div className="faq-list">
        {faqs.map(([question, answer], index) => (
          <div className="faq-item" key={question}>
            <button type="button" onClick={() => setActive(active === index ? -1 : index)}>
              {question}
              <span>{active === index ? '-' : '+'}</span>
            </button>
            {active === index && <p>{answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [status, setStatus] = useState('');

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      setStatus(data.message || 'Thank you. We will contact you soon.');
      if (response.ok) {
        setForm({ name: '', email: '', phone: '', company: '', message: '' });
      }
    } catch (error) {
      setStatus('Backend is not running yet. Please start the server and try again.');
    }
  };



  
  return (
    <section id="contact" className="section contact-section">
      <SectionHeading eyebrow="Contact" title="Start your next digital project" text="Share your idea and Dexmap Technologies will help you plan the next step." />
      <div className="contact-grid">
        <form className="contact-form" onSubmit={submitForm}>
          <input name="name" placeholder="Name" value={form.name} onChange={updateField} required minLength="2" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={updateField} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={updateField} required />
          <input name="company" placeholder="Company" value={form.company} onChange={updateField} />
          <textarea name="message" placeholder="Message" rows="5" value={form.message} onChange={updateField} required minLength="10"></textarea>
          <button className="primary-button" type="submit">Send Message</button>
          {status && <p className="form-status">{status}</p>}
        </form>
        <div className="contact-info">
          <h3>Dexmap Technologies</h3>
          <p>Email: info@DexmapTechnologies.com</p>
          <p>Phone: +91 98765 43210</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://github.com/" aria-label="GitHub"><FaGithub /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <a className="logo" href="#home">
          <img src="/default.png" alt={`${companyName} logo`} className="logo-image" />
          {companyName}
        </a>
        <p>Turning Ideas Into Digital Solutions</p>
      </div>
      <div>
        <h4>Quick Links</h4>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>
      <div>
        <h4>Services</h4>
        <a href="#services">Website Development</a>
        <a href="#services">AI Solutions</a>
        <a href="#services">Cloud Services</a>
      </div>
      <div>
        <h4>Legal</h4>
        <a href="#home">Privacy Policy</a>
        <a href="#home">Terms & Conditions</a>
        <p>Copyright © 2026 Dexmap Technologies</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
  }, [isDark]);

  return (
    <>
      <Navbar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <WorkProcess />
        <TechnologyStack />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
