import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { eventsData } from '../data/churchData';
import { getEvents } from '../api/api';

export default function EventsMarquee() {
  const [eventsList, setEventsList] = useState(eventsData);

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

  // Duplicate the list so the scroll loop has no visible seam
  const items = [...eventsList, ...eventsList, ...eventsList];

  return (
    <div className="events-marquee">
      <Link to="/events" className="events-marquee-label">
        <Calendar size={14} /> UPCOMING EVENTS
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
          top: 92px;
          left: 0;
          right: 0;
          height: 42px;
          z-index: 998;
          display: flex;
          align-items: center;
          background: #091326;
          border-bottom: 1px solid rgba(212, 175, 55, 0.35);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          white-space: nowrap;
        }
        .events-marquee-label {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          height: 100%;
          padding: 0 1.1rem;
          background: #111f38;
          color: #d4af37;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-decoration: none;
          border-right: 1px solid rgba(212, 175, 55, 0.3);
          z-index: 2;
        }
        .events-marquee-label:hover {
          color: #ffffff;
          background: #182a4a;
        }
        .events-marquee-track-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
          width: 100%;
        }
        .events-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          white-space: nowrap;
          will-change: transform;
          animation: eventsMarqueeScroll 25s linear infinite;
        }
        .events-marquee-track:hover {
          animation-play-state: paused;
        }
        .events-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 1.25rem;
          font-size: 0.82rem;
          color: #ffffff;
        }
        .events-marquee-item strong {
          color: #f3e5ab;
          font-weight: 700;
        }
        .events-marquee-date {
          color: #d4af37;
          font-weight: 600;
        }
        .events-marquee-loc {
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
        }
        .events-marquee-dot {
          color: #d4af37;
          font-size: 0.9rem;
        }
        .events-marquee-sep {
          margin-left: 1.25rem;
          color: rgba(212, 175, 55, 0.25);
          font-weight: 300;
        }
        @keyframes eventsMarqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
        @media (max-width: 640px) {
          .events-marquee {
            top: 72px;
          }
          .events-marquee-label span { display: none; }
        }
      `}</style>
    </div>
  );
}
