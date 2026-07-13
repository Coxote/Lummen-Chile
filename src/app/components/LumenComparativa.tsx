import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";

const YesIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="10" cy="10" r="9" fill="rgba(45,0,255,0.15)" stroke="#2D00FF" strokeOpacity="0.5" strokeWidth="1" />
    <path d="M6 10L8.5 12.5L14 7.5" stroke="#2D00FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const NoIconDark = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="10" cy="10" r="9" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
    <path d="M13 7L7 13M7 7L13 13" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const NoIconLight = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="10" cy="10" r="9" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
    <path d="M13 7L7 13M7 7L13 13" stroke="rgba(0,0,0,0.22)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const comparisons = [
  { dimension: "Integración con sistemas propios", lumen: "Nativa vía Flamerly Workflows", others: "Solo Zapier / Make" },
  { dimension: "Voz en tiempo real", lumen: "Incluida en Scale y Enterprise", others: "Raro o inexistente" },
  { dimension: "Multi-LLM", lumen: "OpenAI · Anthropic · Google", others: "Solo OpenAI" },
  { dimension: "Privacidad de datos", lumen: "Datos en tu propio stack", others: "Datos en servidores del proveedor" },
  { dimension: "Soporte regional LatAm", lumen: "Equipo dedicado en Guatemala", others: "Soporte global genérico" },
];

const useCases = [
  { icon: "🏦", title: "Seguros y Banca", desc: "Consulta de póliza y estado de reclamo en WhatsApp, sin esperar en línea.", color: "#2D00FF" },
  { icon: "📅", title: "Agendamiento de Citas", desc: "Disponibilidad y confirmación en tiempo real vía API. Sin intermediarios.", color: "#5B00E8" },
  { icon: "🛒", title: "E-commerce", desc: "Búsqueda de productos, estado de pedido y seguimiento postventa.", color: "#8E00FF" },
  { icon: "📞", title: "Call Center con IA", desc: "Voice Bridge + resumen automático post-llamada + handoff a agente humano.", color: "#A400FF" },
  { icon: "🎯", title: "Captura de Leads", desc: "Registro automático en CRM vía workflow. Ningún lead sin capturar.", color: "#C400FF" },
];

export const LumenComparativa = () => {
  const { isDark } = useTheme();
  const { isMobile, isTablet } = useBreakpoint();
  const isCompact = isMobile || isTablet;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeComparisonIndex, setActiveComparisonIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate comparisons in mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setActiveComparisonIndex((prev) => (prev + 1) % comparisons.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const textMain = isDark ? "#FFFFFF" : "#0D0D1A";
  const text = isDark ? "rgba(255,255,255,0.72)" : "rgba(13,13,26,0.87)";
  const textFaint = isDark ? "rgba(255,255,255,0.42)" : "rgba(13,13,26,0.57)";
  const rowEvenBg = isDark ? "rgba(255,255,255,0.02)" : "rgba(45,0,255,0.025)";
  const tableBg = isDark ? "rgba(13,13,26,0.55)" : "rgba(255,255,255,0.95)";
  const tableBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(45,0,255,0.1)";
  const thBg = isDark ? "rgba(45,0,255,0.12)" : "rgba(45,0,255,0.06)";
  const cardBg = isDark ? "rgba(13,13,26,0.55)" : "rgba(255,255,255,0.95)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(45,0,255,0.12)";
  const px = isMobile ? "16px" : isTablet ? "32px" : "64px";

  return (
    <section ref={sectionRef} id="por-que-lumen" style={{
      padding: `${isMobile ? "40px" : "80px"} ${px}`,
      position: "relative", overflow: "hidden",
    }}>
      {/* Glows */}
      <div style={{
        position: "absolute", bottom: "10%", right: 0, width: "600px", height: "600px",
        background: isDark ? "radial-gradient(ellipse, rgba(142,0,255,0.08) 0%, transparent 70%)" : "radial-gradient(ellipse, rgba(142,0,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 0, left: 0, width: "500px", height: "500px",
        background: isDark ? "radial-gradient(ellipse, rgba(45,0,255,0.07) 0%, transparent 70%)" : "radial-gradient(ellipse, rgba(45,0,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div style={{
          textAlign: "center", marginBottom: isMobile ? "24px" : "44px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: isDark ? "rgba(142,0,255,0.1)" : "rgba(142,0,255,0.07)",
            border: "1px solid rgba(142,0,255,0.3)",
            borderRadius: "100px", padding: "7px 18px", marginBottom: "14px",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 7L7 13L1 7L7 1Z" fill="none" stroke="#8E00FF" strokeWidth="1.5" />
              <circle cx="7" cy="7" r="2.5" fill="#8E00FF" />
            </svg>
            <span style={{
              fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
              fontSize: "13px", color: isDark ? "rgba(255,255,255,0.8)" : "#8E00FF",
              letterSpacing: "0.05em",
            }}>POR QUÉ LUMEN</span>
          </div>
          <h2 style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 800,
            fontSize: isMobile ? "26px" : "clamp(32px, 4vw, 52px)",
            color: textMain, margin: "0 0 10px", lineHeight: 1.15,
          }}>
            Construido para LatAm.{" "}
            <span style={{
              backgroundImage: "linear-gradient(135deg, #2D00FF, #8E00FF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Diferente por diseño.</span>
          </h2>
          <p style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
            fontSize: isMobile ? "14px" : "18px", color: text,
            maxWidth: "580px", margin: "0 auto", lineHeight: 1.6,
          }}>
            Las herramientas genéricas no se conectan a tus sistemas reales. LUMEN sí.
          </p>
        </div>

        {/* ═══════════════════════════════════════
            COMPARISON — Mobile cards vs Desktop table
        ════════════════════════════════════════ */}
        <div style={{
          marginBottom: "20px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
        }}>
          {isMobile ? (
            /* Mobile: carousel with single comparison card */
            <div>
              {/* Single active card */}
              <div 
                key={activeComparisonIndex}
                style={{
                  borderRadius: "16px",
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  overflow: "hidden",
                  backdropFilter: "blur(16px)",
                  animation: "fadeInComparison 0.5s ease-out",
                }}
              >
                {/* Dimension header */}
                <div style={{
                  padding: "14px 18px",
                  background: thBg,
                  borderBottom: `1px solid ${tableBorder}`,
                  fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                  fontSize: "13px", color: textMain, letterSpacing: "0.02em",
                  minHeight: "52px",
                  display: "flex",
                  alignItems: "center",
                }}>{comparisons[activeComparisonIndex].dimension}</div>

                {/* LUMEN row */}
                <div style={{
                  padding: "16px 18px",
                  display: "flex", alignItems: "center", gap: "12px",
                  borderBottom: `1px solid ${tableBorder}`,
                }}>
                  <YesIcon size={20} />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                      fontSize: "11px", color: "#2D00FF", letterSpacing: "0.06em",
                      textTransform: "uppercase", marginBottom: "4px",
                    }}>LUMEN</div>
                    <div style={{
                      fontFamily: "'Urbanist', sans-serif", fontWeight: 500,
                      fontSize: "14px", color: text, lineHeight: 1.5,
                    }}>{comparisons[activeComparisonIndex].lumen}</div>
                  </div>
                </div>

                {/* Others row */}
                <div style={{
                  padding: "16px 18px",
                  display: "flex", alignItems: "center", gap: "12px",
                  background: isDark ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.02)",
                }}>
                  {isDark ? <NoIconDark size={20} /> : <NoIconLight size={20} />}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                      fontSize: "11px", color: textFaint, letterSpacing: "0.06em",
                      textTransform: "uppercase", marginBottom: "4px",
                    }}>Competencia</div>
                    <div style={{
                      fontFamily: "'Urbanist', sans-serif", fontWeight: 500,
                      fontSize: "14px", color: textFaint, lineHeight: 1.5,
                    }}>{comparisons[activeComparisonIndex].others}</div>
                  </div>
                </div>
              </div>

              {/* Navigation dots */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginTop: "16px",
              }}>
                {comparisons.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveComparisonIndex(index)}
                    style={{
                      width: activeComparisonIndex === index ? "28px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background: activeComparisonIndex === index
                        ? "linear-gradient(135deg, #2D00FF, #8E00FF)"
                        : isDark 
                          ? "rgba(255,255,255,0.2)" 
                          : "rgba(45,0,255,0.2)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      padding: 0,
                      boxShadow: activeComparisonIndex === index 
                        ? "0 2px 12px rgba(45,0,255,0.5)" 
                        : "none",
                    }}
                    aria-label={`Go to comparison ${index + 1}`}
                  />
                ))}
              </div>

              {/* Progress counter */}
              <div style={{
                textAlign: "center",
                marginTop: "12px",
                fontFamily: "'Urbanist', sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                color: textFaint,
              }}>
                {activeComparisonIndex + 1} / {comparisons.length}
              </div>
            </div>
          ) : (
            /* Tablet / Desktop: table */
            <div style={{
              borderRadius: "20px",
              background: tableBg, border: `1px solid ${tableBorder}`,
              overflow: "hidden", backdropFilter: "blur(20px)",
              boxShadow: isDark
                ? "0 40px 100px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
                : "0 20px 60px rgba(45,0,255,0.06)",
            }}>
              {/* Header */}
              <div style={{
                display: "grid", gridTemplateColumns: "2fr 1.8fr 1.8fr",
                background: thBg, borderBottom: `1px solid ${tableBorder}`,
              }}>
                {["Capacidad", "LUMEN", "ManyChat · Tidio · Intercom"].map((h, i) => (
                  <div key={h} style={{
                    padding: "18px 28px",
                    fontFamily: "'Urbanist', sans-serif", fontWeight: 700, fontSize: "12px",
                    color: i === 1 ? "#8E00FF" : isDark ? "rgba(255,255,255,0.5)" : "rgba(13,13,26,0.45)",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    borderLeft: i > 0 ? `1px solid ${tableBorder}` : "none",
                  }}>{h}</div>
                ))}
              </div>
              {comparisons.map((row, i) => (
                <div key={row.dimension} style={{
                  display: "grid", gridTemplateColumns: "2fr 1.8fr 1.8fr",
                  background: i % 2 === 0 ? rowEvenBg : "transparent",
                  borderBottom: i < comparisons.length - 1 ? `1px solid ${tableBorder}` : "none",
                }}>
                  <div style={{
                    padding: "18px 28px",
                    fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: "14px", color: textMain,
                  }}>{row.dimension}</div>
                  <div style={{
                    padding: "18px 28px", borderLeft: `1px solid ${tableBorder}`,
                    display: "flex", alignItems: "center", gap: "10px",
                  }}>
                    <YesIcon />
                    <span style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: "13.5px", color: text }}>{row.lumen}</span>
                  </div>
                  <div style={{
                    padding: "18px 28px", borderLeft: `1px solid ${tableBorder}`,
                    display: "flex", alignItems: "center", gap: "10px",
                  }}>
                    {isDark ? <NoIconDark /> : <NoIconLight />}
                    <span style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: "13.5px", color: textFaint }}>{row.others}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════
            BOTTOM ROW: Time-to-live + Use cases
        ════════════════════════════════════════ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isCompact ? "1fr" : "1fr 2fr",
          gap: "16px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
        }}>
          {/* Time-to-live card */}
          <div style={{
            borderRadius: "20px",
            background: isDark
              ? "linear-gradient(160deg, rgba(45,0,255,0.18) 0%, rgba(142,0,255,0.12) 100%)"
              : "linear-gradient(160deg, rgba(45,0,255,0.07) 0%, rgba(142,0,255,0.05) 100%)",
            border: "1px solid rgba(142,0,255,0.3)",
            padding: isMobile ? "24px 20px" : "36px 32px",
            display: "flex", flexDirection: isMobile ? "row" : "column",
            alignItems: isMobile ? "center" : "flex-start",
            gap: isMobile ? "16px" : "20px",
            boxShadow: isDark ? "0 0 0 1px rgba(45,0,255,0.1), 0 20px 60px rgba(45,0,255,0.08)" : "none",
          }}>
            <div style={{
              width: "52px", height: "52px", flexShrink: 0,
              background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
              borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(45,0,255,0.45)",
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                <path d="M12 7V12L15 15" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{
                  fontFamily: "'Urbanist', sans-serif", fontWeight: 900,
                  fontSize: isMobile ? "36px" : "52px", lineHeight: 1,
                  backgroundImage: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>1–2</span>
                <span style={{
                  fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                  fontSize: isMobile ? "16px" : "20px", color: textMain,
                }}>semanas</span>
              </div>
              <p style={{
                fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
                fontSize: "13px", color: text, margin: "8px 0 0", lineHeight: 1.55,
              }}>
                De firma a asistente funcional. El time-to-live más rápido del mercado.
              </p>
            </div>
          </div>

          {/* Use cases grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr" : "1fr 1fr",
            gap: "10px",
          }}>
            {useCases.map((uc, i) => (
              <div key={uc.title} style={{
                borderRadius: "14px", background: cardBg, border: `1px solid ${cardBorder}`,
                padding: isMobile ? "14px" : "18px 20px",
                display: "flex", gap: "12px", alignItems: "flex-start",
                backdropFilter: "blur(16px)",
                gridColumn: i === 4 ? "1 / -1" : "auto",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = isDark
                    ? `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${uc.color}30`
                    : `0 8px 30px rgba(45,0,255,0.08), 0 0 0 1px ${uc.color}25`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: isMobile ? "34px" : "38px",
                  height: isMobile ? "34px" : "38px",
                  flexShrink: 0,
                  background: `${uc.color}15`, border: `1px solid ${uc.color}30`,
                  borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: isMobile ? "16px" : "20px",
                }}>{uc.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                    fontSize: isMobile ? "13px" : "15px", color: textMain, marginBottom: "3px",
                  }}>{uc.title}</div>
                  {!isMobile && (
                    <p style={{
                      fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
                      fontSize: "12px", color: text, margin: 0, lineHeight: 1.5,
                    }}>{uc.desc}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA bottom */}
        <div style={{
          textAlign: "center",
          marginTop: isMobile ? "28px" : "48px",
          opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.45s",
        }}>
          <p style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
            fontSize: isMobile ? "18px" : "22px", color: textMain, margin: "0 0 6px",
          }}>Demo en 30 minutos.</p>
          <p style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
            fontSize: isMobile ? "14px" : "16px", color: text, margin: "0 0 22px",
          }}>
            Un caso real de tu industria, en vivo.
          </p>
          <a href="#contacto-general" style={{
            textDecoration: "none",
            display: "inline-block",
            width: isMobile ? "100%" : "auto",
          }}>
            <button style={{
              background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
              color: "white", border: "none", borderRadius: "14px",
              padding: isMobile ? "16px 0" : "14px 40px",
              width: isMobile ? "100%" : "auto",
              fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
              fontSize: isMobile ? "16px" : "17px", cursor: "pointer",
              boxShadow: "0 0 36px rgba(45,0,255,0.4), 0 0 72px rgba(142,0,255,0.2)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 48px rgba(45,0,255,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(45,0,255,0.4)";
              }}
            >Solicita tu Demo →</button>
          </a>
          <p style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
            fontSize: "12px", color: textFaint, margin: "12px 0 0",
          }}>Equipo Prometheus · Grupo Digital de Guatemala</p>
        </div>
      </div>
    </section>
  );
};