import React, { useState, useEffect, useRef } from "react";
import lumenLogoDark from "figma:asset/f24b33df11fab8d83fe5139af2d792b715421916.png";
import lumenLogoLight from "figma:asset/835d032a23428a60eb002e20279dec74806ff23b.png";
import { LumenDemoModal } from "./LumenDemoModal";
import { useTheme } from "./ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";

const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <circle cx="8.5" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.5 1V2.5M8.5 14.5V16M1 8.5H2.5M14.5 8.5H16M3.1 3.1L4.16 4.16M12.84 12.84L13.9 13.9M13.9 3.1L12.84 4.16M4.16 12.84L3.1 13.9"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.5 9.5C12.5 11.8 10.2 13.5 7.5 13.5C4 13.5 1.5 11 1.5 7.5C1.5 4.8 3.2 2.5 5.5 1.5C3.7 3.5 3.5 6.8 5.7 9C7.9 11.2 11.2 11 13.5 9.5Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    {open ? (
      <>
        <path d="M5 5L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 5L5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ) : (
      <>
        <path d="M3 6H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3 11H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3 16H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    )}
  </svg>
);

const navLinks = [
  { label: "Producto", href: "#capacidades" },
  { label: "Soluciones", href: "#por-que-lumen" },
  { label: "Casos de Uso", href: "#por-que-lumen" },
  { label: "Precios", href: "#precios" },
];

export const LumenNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { isMobile, isTablet } = useBreakpoint();
  const isCompact = isMobile || isTablet;
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isCompact) setMenuOpen(false);
  }, [isCompact]);

  const navBg = isDark
    ? scrolled ? "rgba(5,5,14,0.96)" : "rgba(5,5,14,0.7)"
    : scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)";

  const borderColor = isDark
    ? "rgba(142,0,255,0.14)"
    : scrolled ? "rgba(0,0,0,0.07)" : "rgba(45,0,255,0.1)";

  const linkColor = isDark ? "rgba(255,255,255,0.78)" : "rgba(13,13,26,0.68)";
  const linkHover = isDark ? "#FFFFFF" : "#0D0D1A";
  const toggleColor = isDark ? "rgba(255,255,255,0.78)" : "rgba(13,13,26,0.68)";
  const toggleBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(13,13,26,0.06)";
  const toggleBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(13,13,26,0.14)";

  const menuBg = isDark
    ? "rgba(5,5,14,0.98)"
    : "rgba(255,255,255,0.99)";

  return (
    <>
      <LumenDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      <nav
        ref={menuRef}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: isMobile ? "0 20px" : "0 48px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: navBg,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: `1px solid ${borderColor}`,
          transition: "background 0.3s ease, border-color 0.3s ease",
          boxShadow: !isDark && scrolled ? "0 1px 24px rgba(0,0,0,0.06)" : "none",
        }}
      >
        {/* Logo */}
        <img
          src={isDark ? lumenLogoDark : lumenLogoLight}
          alt="LUMEN"
          style={{ height: isMobile ? "40px" : "49px", width: "auto", objectFit: "contain" }}
        />

        {/* Desktop nav links */}
        {!isCompact && (
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} style={{
                color: linkColor, textDecoration: "none",
                fontFamily: "'Urbanist', sans-serif", fontWeight: 500,
                fontSize: "15px", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = linkHover)}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = linkColor)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Right controls */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Theme toggle */}
          <button onClick={toggleTheme}
            title={isDark ? "Modo claro" : "Modo oscuro"}
            style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: toggleBg, border: `1px solid ${toggleBorder}`,
              color: toggleColor, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "background 0.2s",
            }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Demo CTA — desktop only */}
          {!isCompact && (
            <button onClick={() => setDemoOpen(true)} style={{
              background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
              color: "white", border: "none", borderRadius: "10px",
              padding: "10px 20px",
              fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
              fontSize: "15px", cursor: "pointer",
              boxShadow: isDark ? "0 0 24px rgba(45,0,255,0.35)" : "0 4px 20px rgba(45,0,255,0.28)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Solicita una Demo
            </button>
          )}

          {/* Hamburger — mobile / tablet */}
          {isCompact && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: toggleBg, border: `1px solid ${toggleBorder}`,
                color: toggleColor, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "background 0.2s",
              }}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isCompact && (
        <div style={{
          position: "fixed",
          top: "64px", left: 0, right: 0,
          zIndex: 99,
          background: menuBg,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: `1px solid ${borderColor}`,
          overflow: "hidden",
          maxHeight: menuOpen ? "400px" : "0",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          boxShadow: menuOpen ? "0 20px 60px rgba(0,0,0,0.18)" : "none",
        }}>
          <div style={{ padding: "12px 20px 20px" }}>
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 0",
                  color: linkColor,
                  textDecoration: "none",
                  fontFamily: "'Urbanist', sans-serif",
                  fontWeight: 600,
                  fontSize: "17px",
                  borderBottom: i < navLinks.length - 1
                    ? `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`
                    : "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = linkHover)}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = linkColor)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setDemoOpen(true); }}
              style={{
                width: "100%", marginTop: "16px",
                background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                color: "white", border: "none", borderRadius: "12px",
                padding: "14px 20px",
                fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                fontSize: "16px", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(45,0,255,0.35)",
              }}
            >
              Solicita una Demo
            </button>
          </div>
        </div>
      )}
    </>
  );
};