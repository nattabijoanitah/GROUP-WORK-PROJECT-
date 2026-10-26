import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { eventsData } from '../data/churchData';
import { getEvents } from '../api/api';

export default function EventsMarquee() {
  const [eventsList, setEventsList] = useState(eventsData);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    getEvents()
      .then((data) => {
        if (data && Array.isArray(data.items) && data.items.length > 0) {
          const formatted = data.items.map((ev) => ({
            id: ev.id,
            title: ev.title,
            date: ev.event_date
              ? new Date(ev.event_date).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Upcoming',
            location: ev.location || 'Sanctuary',
          }));
          setEventsList(formatted);
        }
      })
      .catch(() => {});
  }, []);

  if (!eventsList || eventsList.length === 0) return null;

  // Duplicate items for a seamless continuous scroll loop
  const items = [...eventsList, ...eventsList];

  return (
    <div className={`events-marquee ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/events" className="events-marquee-label">
        <Calendar size={14} /> <span>UPCOMING EVENTS</span>
      </Link>
      <div className="events-marquee-track-wrap">
        <div className="events-marquee-track">
          {items.map((event, idx) => (
            <span className="events-marquee-item" key={`${event.id}-${idx}`}>
              <strong>{event.title}</strong>
              <span className="events-marquee-dot">•</span>
              <span className="events-marquee-date">{event.date}</span>
              {event.location && (
                <>
                  <span className="events-marquee-dot">•</span>
                  <span className="events-marquee-loc">{event.location}</span>
                </>
              )}
              <span className="events-marquee-sep">|</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .events-marquee {
          position: fixed;
          top: 96px;
          left: 0;
          right: 0;
          height: 42px;
          z-index: 998;
          display: flex;
          align-items: center;
          background: #071024;
          border-bottom: 1px solid rgba(212, 175, 55, 0.35);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          white-space: nowrap;
          transition: top 0.3s ease;
        }

        .events-marquee.scrolled {
          top: 78px;
        }

        .events-marquee-label {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          height: 100%;
          padding: 0 1.25rem;
          background: #0f1c36;
          color: #d4af37;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.09em;
          text-decoration: none;
          border-right: 1px solid rgba(212, 175, 55, 0.3);
          z-index: 3;
          box-shadow: 4px 0 12px rgba(0, 0, 0, 0.25);
          transition: background 0.2s ease, color 0.2s ease;
        }

        .events-marquee-label:hover {
          color: #ffffff;
          background: #172a50;
        }

        .events-marquee-track-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .events-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          white-space: nowrap;
          will-change: transform;
          animation: eventsMarqueeContinuous 30s linear infinite !important;
        }

        .events-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0 1.4rem;
          font-size: 0.83rem;
          color: #ffffff;
          line-height: 1;
        }

        .events-marquee-item strong {
          color: #f6e7b2;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .events-marquee-date {
          color: #e5bf4e;
          font-weight: 600;
        }

        .events-marquee-loc {
          color: rgba(255, 255, 255, 0.72);
          font-style: italic;
        }

        .events-marquee-dot {
          color: #d4af37;
          font-size: 0.95rem;
        }

        .events-marquee-sep {
          margin-left: 1.4rem;
          color: rgba(212, 175, 55, 0.28);
          font-weight: 300;
        }

        @keyframes eventsMarqueeContinuous {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 1023px) {
          .events-marquee {
            top: 76px;
          }
          .events-marquee.scrolled {
            top: 70px;
          }
        }

        @media (max-width: 640px) {
          .events-marquee {
            top: 72px;
            height: 38px;
          }
          .events-marquee.scrolled {
            top: 66px;
          }
          .events-marquee-label span {
            display: none;
          }
          .events-marquee-item {
            font-size: 0.78rem;
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
}
