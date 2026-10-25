import React, { useState } from 'react';
import { createContactMessage } from '../api/api';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import logoImg from '../assets/ark2-removebg-preview.png';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribeError('');
    try {
      await createContactMessage({
        name: 'Newsletter Subscriber',
        email,
        details: '[NEWSLETTER SIGNUP] Please add this email to the newsletter list.'
      });
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setSubscribeError('Could not subscribe right now. Please try again.');
    }
  };

  return (
    <footer style={{ backgroundColor: '#070b16', borderTop: '1px solid var(--border-color)', color: 'var(--text-light)', padding: '5rem 0 2rem 0' }}>
      <div className="container">
        <div className="grid-3" style={{ gap: '3rem', marginBottom: '4rem' }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <img src={logoImg} alt="Ihema Logo" style={{ height: '40px', width: 'auto' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-gold)', letterSpacing: '0.05em' }}>
                  IHEMA
                </span>
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Christian Fellowship
                </span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Experiencing the power of God, changing lives, restoring families, and building communities of hope, faith, and love.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://www.youtube.com/@ihemachristianfellowship2308" className="social-icon" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="https://www.tiktok.com/@evas1970" className="social-icon" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', letterSpacing: '0.05em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li><Link to="/" className="footer-link">Home</Link></li>
                <li><Link to="/about" className="footer-link">About Us</Link></li>
                <li><Link to="/ministries" className="footer-link">Ministries</Link></li>
                <li><Link to="/services" className="footer-link">Church Services</Link></li>
                <li><Link to="/pastor" className="footer-link">Mummy's Message</Link></li>
                <li><Link to="/sermons" className="footer-link">Sermons</Link></li>
                <li><Link to="/events" className="footer-link">Events</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', letterSpacing: '0.05em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
                Get Involved
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li><Link to="/join" className="footer-link">Join Us</Link></li>
                <li><Link to="/give" className="footer-link">Give / Tithe</Link></li>
                <li><Link to="/gallery" className="footer-link">Gallery</Link></li>
                <li><Link to="/testimonies" className="footer-link">Testimonies</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', letterSpacing: '0.05em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin size={18} className="text-gold" style={{ flexShrink: 0 }} />
                <span>Ntebetebe, Bweyogerere, Wakiso District, Uganda</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} className="text-gold" style={{ flexShrink: 0 }} />
                <span>+256392548676</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} className="text-gold" style={{ flexShrink: 0 }} />
                <span>ihemacfl018@gmail.com</span>
              </div>
            </div>

            {/* Newsletter form */}
            <h4 style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', letterSpacing: '0.05em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Newsletter
            </h4>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', position: 'relative' }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 3rem 0.75rem 1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-light)',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-gold)',
                  cursor: 'pointer',
                  padding: '0 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Subscribe"
              >
                <Send size={16} />
              </button>
            </form>
            {submitted && (
              <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-gold)', marginTop: '0.5rem' }}>
                Thank you for subscribing!
              </span>
            )}
            {subscribeError && (
              <span style={{ display: 'block', fontSize: '0.8rem', color: '#ff6b6b', marginTop: '0.5rem' }}>
                {subscribeError}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }} className="footer-bottom">
          <p>© {new Date().getFullYear()} Ihema Christian Fellowship International. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/join" className="footer-link">Privacy Policy</Link>
            <Link to="/join" className="footer-link">Terms of Service</Link>
            <Link to="/join" className="footer-link">Contact Support</Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: var(--accent-gold);
        }
        .social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          color: var(--text-light);
          transition: all 0.2s;
        }
        .social-icon:hover {
          background-color: var(--accent-gold);
          color: var(--bg-dark);
          transform: translateY(-2px);
        }
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row !important;
          }
        }
      `}</style>
    </footer>
  );
}
