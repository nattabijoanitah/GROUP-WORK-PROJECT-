import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Quote, Mic, ArrowRight } from 'lucide-react';
import pastorImg from '../assets/prayer-ministry.jpg';
import heroImg from '../assets/about-ihema.jpg';

const messages = [
  {
    month: 'July 2026',
    title: 'The Season Has Shifted',
    scripture: 'Ecclesiastes 3:1',
    excerpt:
      'Beloved, God is orchestrating a divine time-shift in the lives of His people. What once felt stagnant is now being infused with fresh momentum by the Holy Spirit. Position yourself to receive.'
  },
  {
    month: 'June 2026',
    title: 'From the Wilderness to the Promised Land',
    scripture: 'Deuteronomy 11:24',
    excerpt:
      'Every wilderness experience has an expiry date. God designed the wilderness not as a punishment but as a preparation. Every step you took through the dry season was building spiritual muscle for the abundant land ahead.'
  },
  {
    month: 'May 2026',
    title: 'Securing Your Covenant Blessings',
    scripture: 'Genesis 26:24',
    excerpt:
      'The covenants God made with Abraham are passed down generationally. You are not starting from scratch — you are building on an eternal foundation already laid by the blood of Jesus.'
  }
];

export default function PastorMessage() {
  return (
    <div className="fade-in" style={{ paddingTop: '116px' }}>
      {/* 1. Hero */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(11, 17, 32, 0.8), rgba(11, 17, 32, 0.85)), url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '6rem 0 5rem 0',
          textAlign: 'center',
          color: 'var(--text-light)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
            MUMMY'S MESSAGE
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 300 }}>
            Monthly spiritual direction and encouragement from Mummy Evas Kemirembe Mugarura of Ihema Christian Fellowship International.
          </p>
        </div>
      </section>

      {/* 2. Featured Message + Pastor Bio Side by Side */}
      <section className="dark-section section-padding">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'flex-start', gap: '4rem' }}>
            {/* Pastor Photo & Bio */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '-1rem',
                    left: '-1rem',
                    right: '1rem',
                    bottom: '1rem',
                    border: '2px solid var(--accent-gold)',
                    borderRadius: '8px'
                  }}
                />
                <img
                  src={pastorImg}
                  alt="Senior Mummy Evas Kemirembe Mugarura"
                  style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 2, borderRadius: '8px', boxShadow: 'var(--shadow-lg)' }}
                />
              </div>

              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', marginBottom: '0.25rem' }}>
                  Mummy Evas Kemirembe Mugarura
                </h3>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: '1rem' }}>
                  Senior Mummy & Founder
                </span>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  Mummy is a lady of integrity, wisdom, and unwavering faith whose life reflects the love and character of Jesus Christ. She is a devoted servant of God, a compassionate spiritual mother, and a humble leader who has dedicated her life to serving the Lord and caring for His people.
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '1rem' }}>
                  As a mother in the faith, Mummy lovingly nurtures believers, encourages the broken-hearted, strengthens the weak, and inspires many to grow in their relationship with God. She leads by example through prayer, humility, compassion, and obedience to God's Word. Her home and ministry have become a place of refuge where people find hope, healing, comfort, and restoration.
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '1rem' }}>
                  Mummy is passionate about preaching the Gospel, raising faithful disciples, mentoring young people, supporting families, and guiding couples into godly marriages. She believes that every person has a purpose in Christ and works tirelessly to help individuals discover and fulfil God's calling upon their lives.
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '1rem' }}>
                  Known for her kindness, patience, generosity, and genuine concern for others, she serves as a source of encouragement to widows, orphans, children, youth, women, men, and the elderly alike. Her heart is to see lives transformed by the power of the Holy Spirit and communities changed through the message of salvation.
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '1rem' }}>
                  Through her faithful leadership, prayerful guidance, and motherly care, Mummy continues to build a Christ-centred family of believers founded on love, faith, unity, holiness, and service. Her greatest desire is to glorify God, lead many souls to Christ, and leave a lasting legacy of faith for generations to come.
                </p>

                
              </div>
            </div>

            {/* Featured Current Month Message */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <span
                  className="text-gold"
                  style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}
                >
                  Mummy's Message
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>
                  LET US ABIDE IN LOVE
                </h2>
              </div>

              <div style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-gold)', backgroundColor: 'var(--bg-card-dark)', borderRadius: '0 4px 4px 0' }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 600 }}>Scripture Focus</span>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                  "God is love, and whoever lives in love lives in God, and God in them." — 1 John 4:16
                </p>
              </div>

              <div style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>
                <p style={{ marginBottom: '1.25rem' }}>
                  My beloved children, if we truly abide in God, His love must be seen in the way we treat others.
                </p>
                <p style={{ marginBottom: '1.25rem' }}>
                  To married couples: Love, respect, forgive, and support your spouses. Do not let anger or misunderstandings destroy your marriage.
                </p>
                <p style={{ marginBottom: '1.25rem' }}>
                  To children: Honor and obey your parents, for this pleases God.
                </p>
                <p style={{ marginBottom: '1.25rem' }}>
                  To workers: Respect your bosses and fellow workers, and do your work faithfully and with a good heart.
                </p>
                <p style={{ marginBottom: '1.25rem' }}>
                  And to everyone, let us remember that love is not just spoken; it is demonstrated through kindness, patience, forgiveness, respect, and humility.
                </p>
                <p style={{ marginBottom: '1.25rem' }}>
                  Let the love of God be seen in our homes, marriages, families, and workplaces. Where there is love, God is present.
                </p>
                <p style={{ fontStyle: 'italic', color: 'var(--text-light)', fontWeight: 500 }}>
                  God bless you richly,
                </p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--accent-gold)', marginTop: '0.5rem' }}>
                  — Mummy Evas Kemirembe Mugarura
                </p>
              </div>

              <Link
                to="/sermons"
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-start' }}
              >
                <Mic size={16} /> Listen to Recent Sermons <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Archive of Past Monthly Messages */}
      <section className="light-section section-padding" style={{ borderTop: '1px solid #e5e7eb' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span
              className="text-gold"
              style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}
            >
              Archive
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-dark)' }}>
              PREVIOUS LETTERS FROM MUMMY
            </h2>
          </div>

          <div className="grid-3">
            {messages.map((msg, idx) => (
              <div key={idx} className="light-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(230, 200, 117, 0.1)',
                    border: '1px solid rgba(230, 200, 117, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <BookOpen size={18} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>
                  {msg.month}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', fontSize: '1.35rem' }}>
                  {msg.title}
                </h3>
                <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>
                  {msg.excerpt}
                </p>
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-dark-muted)' }}>
                  Scripture: <em>{msg.scripture}</em>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Personal Prayer Request CTA */}
      <section
        className="dark-section section-padding"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}
      >
        <div className="container" style={{ maxWidth: '700px' }}>
          <span style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.75rem' }}>
            <Quote size={32} style={{ margin: '0 auto' }} />
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>
            WRITE TO MUMMY
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
            Do you have a personal testimony to share, or would you like Mummy to pray over a specific situation in your life? Use the Connect form to reach Mummy's office directly.
          </p>
          <Link to="/join" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Contact Mummy's Office <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
