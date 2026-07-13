import React, { useState, useEffect } from "react";
import lumenLogoDark from "figma:asset/f24b33df11fab8d83fe5139af2d792b715421916.png";
import lumenLogoLight from "figma:asset/835d032a23428a60eb002e20279dec74806ff23b.png";
import { LumenDemoModal } from "./LumenDemoModal";
import { useTheme } from "./ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";

const stats = [
  { value: "< 2s", label: "Respuesta" },
  { value: "24/7", label: "Disponible" },
  { value: "100%", label: "Cobertura" },
  { value: "3→1", label: "Canales" },
];

const channels = [
  { label: "WhatsApp", color: "#25D366", bg: "rgba(37,211,102,0.12)", border: "rgba(37,211,102,0.3)" },
  { label: "Instagram", color: "#E1306C", bg: "rgba(225,48,108,0.12)", border: "rgba(225,48,108,0.3)" },
  { label: "Web Chat", color: "#2D00FF", bg: "rgba(45,0,255,0.12)", border: "rgba(45,0,255,0.3)" },
  { label: "Voz IA", color: "#8E00FF", bg: "rgba(142,0,255,0.12)", border: "rgba(142,0,255,0.3)" },
];

export const LumenHero = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isDark } = useTheme();
  const { isMobile, isTablet, width } = useBreakpoint();
  const isCompact = isMobile || isTablet;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const textSub = isDark ? "rgba(255,255,255,0.72)" : "rgba(13,13,26,0.80)";
  const statLabel = isDark ? "rgba(255,255,255,0.50)" : "rgba(13,13,26,0.65)";
  const badgeBg = isDark ? "rgba(45,0,255,0.10)" : "rgba(45,0,255,0.06)";
  const badgeBorder = isDark ? "rgba(45,0,255,0.40)" : "rgba(45,0,255,0.25)";
  const badgeText = isDark ? "rgba(255,255,255,0.9)" : "rgba(13,13,26,0.75)";
  const dividerColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(45,0,255,0.08)";

  const headlineGradient = isDark
    ? "linear-gradient(135deg, #FFFFFF 0%, #C4A8FF 40%, #8E00FF 75%, #2D00FF 100%)"
    : "linear-gradient(135deg, #00C2FF 0%, #2D00FF 50%, #8E00FF 100%)";

  const fontSize = isMobile ? "34px" : isTablet ? "50px" : "clamp(48px, 6.5vw, 84px)";

  return (
    <>
      <LumenDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      <section style={{
        minHeight: isMobile ? "100svh" : "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "80px 20px 20px" : isTablet ? "100px 40px 60px" : "120px 64px 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* BG glows */}
        <div style={{
          position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)",
          width: isMobile ? "320px" : "700px", height: isMobile ? "320px" : "700px",
          background: isDark
            ? "radial-gradient(ellipse, rgba(45,0,255,0.2) 0%, transparent 65%)"
            : "radial-gradient(ellipse, rgba(0,194,255,0.10) 0%, rgba(45,0,255,0.07) 50%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {!isMobile && (
          <div style={{
            position: "absolute", top: "35%", left: "15%",
            width: "400px", height: "400px",
            background: isDark
              ? "radial-gradient(ellipse, rgba(142,0,255,0.1) 0%, transparent 65%)"
              : "radial-gradient(ellipse, rgba(142,0,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        )}

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: "1100px", width: "100%",
          textAlign: "center",
          display: "flex", flexDirection: "column",
          alignItems: "center",
          gap: isMobile ? "18px" : "26px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          {/* Top badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: badgeBg, border: `1px solid ${badgeBorder}`,
            borderRadius: "100px", padding: "6px 14px",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "linear-gradient(135deg, #00C2FF, #2D00FF)",
              display: "inline-block",
              boxShadow: "0 0 8px rgba(45,0,255,0.7)",
              animation: "pulse 2s ease-in-out infinite",
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'Urbanist', sans-serif", fontWeight: 600,
              fontSize: isMobile ? "12px" : "14px", color: badgeText, letterSpacing: "0.03em",
            }}>Plataforma de IA Conversacional</span>
          </div>

          {/* Logo */}
          <img
            src={isDark ? lumenLogoDark : lumenLogoLight}
            alt="LUMEN"
            style={{
              height: isMobile ? "58px" : "90px",
              width: "auto", objectFit: "contain",
              filter: isDark
                ? "drop-shadow(0 0 20px rgba(142,0,255,0.55))"
                : "drop-shadow(0 4px 14px rgba(45,0,255,0.14))",
              transition: "filter 0.3s ease",
            }}
          />

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 900,
            fontSize,
            lineHeight: isMobile ? 1.15 : 1.1,
            margin: 0,
            backgroundImage: headlineGradient,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            maxWidth: "900px",
          }}>
            La IA que convierte conversaciones en clientes
          </h1>

          {/* Subtext */}
          <p style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
            fontSize: isMobile ? "15px" : "18px",
            color: textSub, maxWidth: "680px", lineHeight: 1.65, margin: 0,
          }}>
            {isMobile 
              ? "Respuestas inteligentes en WhatsApp, Instagram y Web. CRM automático en menos de 2 segundos."
              : "Un mensaje llega por WhatsApp, Instagram o Web. LUMEN lo entiende, responde y registra el contacto en tu CRM automáticamente. Todo en menos de 2 segundos."
            }
          </p>

          {/* Channel pills */}
          <div style={{
            display: "flex", gap: isMobile ? "6px" : "8px", flexWrap: "nowrap", justifyContent: "center",
            width: "100%", maxWidth: "fit-content",
          }}>
            {channels.map((ch) => (
              <span key={ch.label} style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: ch.bg, border: `1px solid ${ch.border}`,
                borderRadius: "100px", padding: isMobile ? "5px 10px" : "5px 12px",
                fontFamily: "'Urbanist', sans-serif", fontWeight: 600,
                fontSize: isMobile ? "11px" : "12px", color: ch.color,
                whiteSpace: "nowrap",
              }}>
                {/* Logo icons */}
                {ch.label === "WhatsApp" && (
                  <svg width={isMobile ? "12" : "14"} height={isMobile ? "12" : "14"} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill={ch.color} />
                  </svg>
                )}
                {ch.label === "Instagram" && (
                  <svg width={isMobile ? "12" : "14"} height={isMobile ? "12" : "14"} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill={ch.color} />
                  </svg>
                )}
                {ch.label === "Web Chat" && (
                  <svg width={isMobile ? "12" : "14"} height={isMobile ? "12" : "14"} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill={ch.color} />
                  </svg>
                )}
                {ch.label === "Voz IA" && (
                  <svg width={isMobile ? "12" : "14"} height={isMobile ? "12" : "14"} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill={ch.color} />
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill={ch.color} />
                  </svg>
                )}
                {ch.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: "10px", alignItems: "center",
            flexDirection: isMobile ? "column" : "row",
            width: isMobile ? "100%" : "auto",
            marginTop: "4px",
          }}>
            <a href="#contacto-general" style={{
              textDecoration: "none",
              width: isMobile ? "100%" : "auto",
            }}>
              <button style={{
                background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                color: "white", border: "none", borderRadius: "14px",
                padding: isMobile ? "16px 24px" : "14px 32px",
                width: "100%",
                fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                fontSize: isMobile ? "16px" : "17px", cursor: "pointer",
                boxShadow: isDark
                  ? "0 0 36px rgba(45,0,255,0.45), 0 0 72px rgba(142,0,255,0.2)"
                  : "0 8px 32px rgba(45,0,255,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                transition: "box-shadow 0.25s ease, transform 0.2s ease",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                Comenzar Ahora
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </a>

            <button onClick={() => setDemoOpen(true)} style={{
              background: isDark 
                ? "rgba(255,255,255,0.04)" 
                : "rgba(255,255,255,0.95)",
              color: isDark ? "rgba(255,255,255,0.9)" : "#0D0D1A",
              border: isDark 
                ? "1px solid rgba(255,255,255,0.1)" 
                : "1px solid rgba(0,0,0,0.08)",
              borderRadius: "12px",
              padding: isMobile ? "14px 20px" : "12px 24px",
              width: isMobile ? "100%" : "auto",
              fontFamily: "'Urbanist', sans-serif", fontWeight: 600,
              fontSize: isMobile ? "15px" : "16px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              transition: "all 0.2s ease",
              boxShadow: isDark 
                ? "0 2px 8px rgba(0,0,0,0.2)" 
                : "0 2px 12px rgba(0,0,0,0.06)",
            }}
              onMouseEnter={(e) => { 
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; 
                (e.currentTarget as HTMLElement).style.boxShadow = isDark 
                  ? "0 4px 16px rgba(0,0,0,0.3)" 
                  : "0 4px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => { 
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; 
                (e.currentTarget as HTMLElement).style.boxShadow = isDark 
                  ? "0 2px 8px rgba(0,0,0,0.2)" 
                  : "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              <img 
                src={isDark ? lumenLogoDark : lumenLogoLight}
                alt="LUMEN" 
                style={{
                  height: "20px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
              Ver Demo
            </button>
          </div>

          {/* Stats bar */}
          <div style={{
            display: "flex",
            width: "100%", maxWidth: isMobile ? "100%" : "560px",
            marginTop: isMobile ? "4px" : "8px",
            borderRadius: "16px",
            background: isDark ? "rgba(255,255,255,0.04)" : "rgba(45,0,255,0.04)",
            border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(45,0,255,0.1)",
            overflow: "hidden",
          }}>
            {stats.map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, padding: isMobile ? "12px 8px" : "14px 12px",
                textAlign: "center",
                borderRight: i < stats.length - 1
                  ? `1px solid ${dividerColor}`
                  : "none",
              }}>
                <div style={{
                  fontFamily: "'Urbanist', sans-serif", fontWeight: 800,
                  fontSize: isMobile ? "18px" : "22px",
                  backgroundImage: isDark
                    ? "linear-gradient(135deg, #2D00FF, #8E00FF)"
                    : "linear-gradient(135deg, #00C2FF, #2D00FF, #8E00FF)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  lineHeight: 1,
                }}>{stat.value}</div>
                <div style={{
                  fontFamily: "'Urbanist', sans-serif", fontWeight: 500,
                  fontSize: isMobile ? "10px" : "11px", color: statLabel,
                  marginTop: "4px", letterSpacing: "0.02em",
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator on mobile */}
          {isMobile && (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
              marginTop: "8px", opacity: 0.5,
            }}>
              <div style={{
                width: "1px", height: "32px",
                background: isDark
                  ? "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4))"
                  : "linear-gradient(to bottom, transparent, rgba(45,0,255,0.4))",
              }} />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 5L7 9L11 5" stroke={isDark ? "white" : "#2D00FF"} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
      </section>
    </>
  );
};