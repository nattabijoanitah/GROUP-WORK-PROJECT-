
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import logoImg from "../assets/ark2-removebg-preview.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  {
    label: "Explore",
    children: [
      { label: "Ministries", to: "/ministries" },
      { label: "Church Services", to: "/services" },
      { label: "Mummy's Message", to: "/pastor" },
      { label: "Sermons", to: "/sermons" },
      { label: "Events", to: "/events" },
    ],
  },
  {
    label: "Media",
    children: [
      { label: "Gallery", to: "/gallery" },
      { label: "Testimonies", to: "/testimonies" },
    ],
  },
  { label: "Connect", to: "/join" },
];

export default function Navbar() {
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileDropdown(null);
    setHoveredDropdown(null);
  }, [location.pathname]);

  const isActive = (link) => {
    if (link.to) {
      if (link.to === "/") return location.pathname === "/";
      return (
        location.pathname === link.to ||
        location.pathname.startsWith(`${link.to}/`)
      );
    }

    return link.children?.some(
      (child) =>
        location.pathname === child.to ||
        location.pathname.startsWith(`${child.to}/`)
    );
  };

  const renderDesktopLink = (link, index, duplicate = false) => {
    const active = isActive(link);
    const commonProps = {
      tabIndex: duplicate ? -1 : undefined,
    };

    if (link.children) {
      return (
        <div
          className={`nav-item-container ${active ? "active" : ""}`}
          key={`${link.label}-${index}-${duplicate ? "copy" : "main"}`}
          onMouseEnter={() => {
            if (!duplicate) setHoveredDropdown(link.label);
          }}
          onMouseLeave={() => {
            if (!duplicate) setHoveredDropdown(null);
          }}
        >
          <button
            type="button"
            className={`nav-link nav-dropdown-trigger ${
              active ? "nav-active" : ""
            }`}
            aria-expanded={
              duplicate ? undefined : hoveredDropdown === link.label
            }
            {...commonProps}
          >
            {link.label}
            <ChevronDown
              size={14}
              className={`nav-chevron ${
                hoveredDropdown === link.label ? "chevron-open" : ""
              }`}
            />
          </button>

          <div
            className={`dropdown-link-container ${
              !duplicate && hoveredDropdown === link.label
                ? "dropdown-visible"
                : ""
            }`}
          >
            {link.children.map((child) => (
              <Link
                key={child.to}
                to={child.to}
                tabIndex={duplicate ? -1 : undefined}
                className={`dropdown-link ${
                  location.pathname === child.to ? "dropdown-active" : ""
                }`}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={`${link.label}-${index}-${duplicate ? "copy" : "main"}`}
        to={link.to}
        {...commonProps}
        className={`nav-link ${active ? "nav-active" : ""}`}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <>
      <style>{`
        .ihema-navbar,
        .ihema-navbar * {
          box-sizing: border-box;
        }

        .ihema-navbar {
          position: fixed;
          z-index: 1000;
          top: 0;
          left: 0;
          width: 100%;
          color: #fff;
          background: rgba(5, 16, 43, 0.91);
          border-bottom: 1px solid rgba(212, 175, 55, 0.25);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: padding 0.3s ease, background 0.3s ease,
                      box-shadow 0.3s ease;
        }

        .ihema-navbar.scrolled {
          background: rgba(4, 13, 36, 0.97);
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2);
        }

        .nav-inner {
          width: 100%;
          max-width: 1600px;
          min-height: 94px;
          margin: 0 auto;
          padding: 12px clamp(16px, 3vw, 48px);
          display: flex;
          align-items: center;
          gap: 18px;
          transition: min-height 0.3s ease;
        }

        .scrolled .nav-inner {
          min-height: 78px;
        }

        .nav-logo {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          text-decoration: none;
          position: relative;
          z-index: 3;
        }

        .nav-logo img {
          display: block;
          width: auto;
          height: 66px;
          max-width: 175px;
          object-fit: contain;
          transition: height 0.3s ease;
        }

        .scrolled .nav-logo img {
          height: 56px;
        }

        /* Desktop navigation area */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 22px;
          margin-left: auto;
        }

        .nav-links-wrap {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-link {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 12px 0;
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.91);
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.15px;
          line-height: 1.4;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .nav-link:hover,
        .nav-link.nav-active {
          color: #e3bd55;
        }

        .nav-link.nav-active {
          text-shadow: 0 0 16px rgba(227, 189, 85, 0.16);
        }

        .nav-dropdown-trigger {
          font-size: 13px;
        }

        .nav-chevron {
          flex: 0 0 auto;
          transition: transform 0.2s ease;
        }

        .chevron-open {
          transform: rotate(180deg);
        }

        .nav-item-container {
          position: relative;
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
        }

        .dropdown-link-container {
          display: none;
          position: absolute;
          top: 100%;
          left: -16px;
          z-index: 20;
          min-width: 205px;
          padding: 10px;
          margin-top: 0;
          border: 1px solid rgba(227, 189, 85, 0.24);
          border-radius: 12px;
          background: rgba(5, 16, 43, 0.98);
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.28);
        }

        .nav-item-container:hover .dropdown-link-container,
        .nav-item-container:focus-within .dropdown-link-container,
        .dropdown-link-container.dropdown-visible {
          display: flex;
          flex-direction: column;
        }

        .dropdown-link {
          display: block;
          padding: 11px 13px;
          border-radius: 7px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          line-height: 1.4;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .dropdown-link:hover,
        .dropdown-link.dropdown-active {
          color: #e3bd55;
          background: rgba(227, 189, 85, 0.1);
        }

        /* Give button is outside the moving track */
        .nav-give {
          flex: 0 0 auto;
          position: relative;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 12px 19px;
          border: 1px solid #e3bd55;
          border-radius: 999px;
          background: linear-gradient(135deg, #e3bd55, #c79b2c);
          color: #09152f;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 5px 16px rgba(199, 155, 44, 0.16);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .nav-give:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(199, 155, 44, 0.28);
        }

        .mobile-toggle {
          display: none;
          margin-left: auto;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(227, 189, 85, 0.35);
          border-radius: 10px;
          background: transparent;
          color: #e3bd55;
          cursor: pointer;
        }

        .mobile-menu {
          display: none;
        }

        @media (max-width: 1199px) and (min-width: 1024px) {
          .nav-inner {
            gap: 12px;
            padding-right: 18px;
            padding-left: 18px;
          }

          .nav-logo img {
            max-width: 140px;
          }

          .desktop-nav {
            gap: 12px;
          }

          .nav-moving-track {
            gap: 18px;
            padding-right: 18px;
          }

          .nav-link,
          .nav-dropdown-trigger {
            font-size: 12px;
          }

          .nav-give {
            padding: 11px 14px;
          }
        }

        @media (max-width: 1023px) {
          .nav-inner,
          .scrolled .nav-inner {
            min-height: 76px;
            padding: 9px 18px;
          }

          .nav-logo img,
          .scrolled .nav-logo img {
            height: 55px;
            max-width: 155px;
          }

          .desktop-nav {
            display: none !important;
          }

          .mobile-toggle {
            display: inline-flex;
            position: relative;
            z-index: 5;
          }

          .mobile-menu {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            max-height: calc(100vh - 76px);
            overflow-y: auto;
            padding: 12px 18px 22px;
            border-top: 1px solid rgba(227, 189, 85, 0.2);
            border-bottom: 1px solid rgba(227, 189, 85, 0.2);
            background: rgba(5, 16, 43, 0.99);
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.25);
          }

          .mobile-menu-inner {
            display: flex;
            flex-direction: column;
            gap: 4px;
            max-width: 700px;
            margin: 0 auto;
          }

          .mobile-nav-link {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 14px 12px;
            border: 0;
            border-radius: 8px;
            background: transparent;
            color: rgba(255, 255, 255, 0.94);
            font-family: inherit;
            font-size: 15px;
            font-weight: 600;
            text-align: left;
            text-decoration: none;
            cursor: pointer;
          }

          .mobile-nav-link:hover,
          .mobile-nav-link.mobile-active {
            color: #e3bd55;
            background: rgba(227, 189, 85, 0.08);
          }

          .mobile-submenu {
            display: flex;
            flex-direction: column;
            gap: 2px;
            padding: 2px 0 8px 17px;
          }

          .mobile-submenu-link {
            display: block;
            padding: 11px 13px;
            border-left: 2px solid rgba(227, 189, 85, 0.32);
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            text-decoration: none;
          }

          .mobile-submenu-link:hover,
          .mobile-submenu-link.mobile-active {
            color: #e3bd55;
            border-left-color: #e3bd55;
          }

          .mobile-give {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            margin-top: 12px;
            padding: 14px 18px;
            border-radius: 999px;
            background: linear-gradient(135deg, #e3bd55, #c79b2c);
            color: #09152f;
            font-size: 14px;
            font-weight: 800;
            text-decoration: none;
          }
        }

        @media (max-width: 420px) {
          .nav-inner,
          .scrolled .nav-inner {
            padding-right: 12px;
            padding-left: 12px;
          }

          .nav-logo img,
          .scrolled .nav-logo img {
            height: 49px;
            max-width: 135px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-marquee-track {
            animation: none !important;
          }

          .nav-link,
          .nav-give,
          .nav-logo img {
            transition: none !important;
          }
        }

      `}</style>

      <header className={`ihema-navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <Link
            to="/"
            className="nav-logo"
            aria-label="IHEMA Christian Fellowship International Home"
          >
            <img src={logoImg} alt="IHEMA Christian Fellowship International" />
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            <div className="nav-links-wrap">
              {navLinks.map((link, index) =>
                renderDesktopLink(link, index)
              )}
            </div>

            <Link to="/give" className="nav-give">
              <Heart size={15} fill="currentColor" />
              Give
            </Link>
          </nav>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileOpen((previous) => !previous)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mobile-menu">
            <nav className="mobile-menu-inner" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const active = isActive(link);

                if (link.children) {
                  const expanded = mobileDropdown === link.label;

                  return (
                    <div key={link.label}>
                      <button
                        type="button"
                        className={`mobile-nav-link ${
                          active ? "mobile-active" : ""
                        }`}
                        onClick={() =>
                          setMobileDropdown(expanded ? null : link.label)
                        }
                        aria-expanded={expanded}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          size={17}
                          style={{
                            transform: expanded ? "rotate(180deg)" : "none",
                            transition: "transform 0.2s ease",
                          }}
                        />
                      </button>

                      {expanded && (
                        <div className="mobile-submenu">
                          {link.children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              className={`mobile-submenu-link ${
                                location.pathname === child.to
                                  ? "mobile-active"
                                  : ""
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`mobile-nav-link ${
                      active ? "mobile-active" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                to="/give"
                className="mobile-give"
                onClick={() => setMobileOpen(false)}
              >
                <Heart size={16} fill="currentColor" />
                Give
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

