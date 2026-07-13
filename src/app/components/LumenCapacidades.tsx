import React, { useRef, useEffect, useState } from "react";
import { LumenOmnichannelMockup } from "./LumenOmnichannelMockup";
import { useTheme } from "./ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";

export const LumenCapacidades = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { isDark } = useTheme();
  const { isMobile, isTablet } = useBreakpoint();
  const isCompact = isMobile || isTablet;

  const textMain = isDark ? "#FFFFFF" : "#0D0D1A";
  const text = isDark ? "rgba(255,255,255,0.78)" : "rgba(13,13,26,0.87)";
  const textFaint = isDark ? "rgba(255,255,255,0.60)" : "rgba(13,13,26,0.68)";
  const cardBg = isDark
    ? "linear-gradient(135deg, rgba(13,13,26,0.72) 0%, rgba(8,8,18,0.78) 100%)"
    : "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,247,255,0.98) 100%)";
  const cardBorder = isDark ? "rgba(142,0,255,0.22)" : "rgba(45,0,255,0.15)";
  const cardShadow = isDark
    ? "0 0 0 1px rgba(45,0,255,0.08), 0 40px 100px rgba(0,0,0,0.5)"
    : "0 0 0 1px rgba(45,0,255,0.06), 0 20px 60px rgba(45,0,255,0.06)";
  const topBarBg = isDark ? "rgba(255,255,255,0.02)" : "rgba(45,0,255,0.03)";
  const topBarBorder = isDark ? "rgba(255,255,255,0.05)" : "rgba(45,0,255,0.1)";
  const colDivider = isDark ? "rgba(255,255,255,0.05)" : "rgba(45,0,255,0.08)";
  const smallCardBg = isDark ? "rgba(13,13,26,0.55)" : "rgba(255,255,255,0.95)";
  const smallCardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(45,0,255,0.1)";
  const badgeBg = isDark ? "rgba(142,0,255,0.1)" : "rgba(142,0,255,0.07)";
  const badgeBorder = isDark ? "rgba(142,0,255,0.3)" : "rgba(142,0,255,0.25)";
  const badgeText = isDark ? "rgba(255,255,255,0.8)" : "rgba(13,13,26,0.7)";
  const statusBadgeBg = isDark ? "rgba(45,0,255,0.1)" : "rgba(45,0,255,0.07)";
  const statusBadgeBorder = isDark ? "rgba(45,0,255,0.25)" : "rgba(45,0,255,0.2)";
  const timeBadgeBg = isDark ? "rgba(45,0,255,0.1)" : "rgba(45,0,255,0.07)";
  const comingSoonBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(45,0,255,0.06)";
  const comingSoonText = isDark ? "rgba(255,255,255,0.3)" : "rgba(45,0,255,0.5)";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-carousel for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000); // Change step every 3 seconds

    return () => clearInterval(interval);
  }, [isMobile]);

  const px = isMobile ? "16px" : isTablet ? "32px" : "64px";

  const steps = [
    { 
      num: 1, label: "ENTRADA", title: "LLEGA", 
      desc: "Recibe mensajes de todos tus canales.",
      color: "#2D00FF", bgColor: "rgba(45,0,255,0.06)", borderColor: "rgba(45,0,255,0.25)",
      icon: "M20 12L4 12M20 12L15 7M20 12L15 17"
    },
    { 
      num: 2, label: "PROC.", title: "ENTIENDE", 
      desc: "La IA identifica intención: compra, soporte o consulta.",
      color: "#6B00E0", bgColor: "rgba(107,0,224,0.06)", borderColor: "rgba(107,0,224,0.25)",
      icon: "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M12 3v2M12 19v2M3 12h2M19 12h2M6.34 6.34l1.42 1.42M16.24 16.24l1.42 1.42M6.34 17.66l1.42-1.42M16.24 7.76l1.42-1.42"
    },
    { 
      num: 3, label: "SALIDA", title: "RESPONDE Y REGISTRA", 
      desc: "Respuesta personalizada + lead en CRM.",
      color: "#8E00FF", bgColor: "rgba(142,0,255,0.06)", borderColor: "rgba(142,0,255,0.25)",
      icon: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
    },
  ];

  return (
    <section ref={sectionRef} style={{
      padding: `${isMobile ? "40px" : "80px"} ${px}`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "600px", height: "600px",
        background: isDark ? "radial-gradient(ellipse, rgba(45,0,255,0.08) 0%, transparent 70%)" : "radial-gradient(ellipse, rgba(45,0,255,0.05) 0%, transparent 70%)",
        pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "500px", height: "500px",
        background: isDark ? "radial-gradient(ellipse, rgba(142,0,255,0.06) 0%, transparent 70%)" : "radial-gradient(ellipse, rgba(142,0,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none" }} />

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div style={{
          textAlign: "center", marginBottom: isMobile ? "24px" : "40px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: badgeBg, border: `1px solid ${badgeBorder}`,
            borderRadius: "100px", padding: "7px 18px", marginBottom: "20px",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1.5" fill="#8E00FF" />
              <rect x="8" y="1" width="5" height="5" rx="1.5" fill="#2D00FF" />
              <rect x="1" y="8" width="5" height="5" rx="1.5" fill="#2D00FF" />
              <rect x="8" y="8" width="5" height="5" rx="1.5" fill="#8E00FF" />
            </svg>
            <span style={{
              fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
              fontSize: "13px", color: badgeText, letterSpacing: "0.05em",
            }}>CAPACIDADES CRÍTICAS</span>
          </div>
          <h2 style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 800,
            fontSize: isMobile ? "28px" : "clamp(32px, 4vw, 48px)",
            color: textMain, margin: "0 0 12px", lineHeight: 1.15,
          }}>
            Así funciona LUMEN en la vida real
          </h2>
          <p style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
            fontSize: isMobile ? "15px" : "18px", color: textFaint,
            maxWidth: "700px", margin: "0 auto", lineHeight: 1.6,
          }}>
            {isMobile 
              ? "LUMEN centraliza, responde al instante y no pierde ningún lead."
              : "Un mensaje llega por WhatsApp, Instagram o Web. LUMEN lo entiende, responde y registra el contacto en tu CRM. Todo en menos de 2 segundos."
            }
          </p>
        </div>

        {/* Blueprint Card */}
        <div style={{
          borderRadius: isMobile ? "18px" : "28px",
          background: cardBg, border: `1px solid ${cardBorder}`,
          overflow: "hidden", boxShadow: cardShadow, backdropFilter: "blur(24px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
        }}>
          {/* Top Bar */}
          <div style={{
            padding: isMobile ? "14px 20px" : "18px 32px",
            borderBottom: `1px solid ${topBarBorder}`,
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            background: topBarBg, flexWrap: "wrap", gap: "8px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {[
                { label: "WA", color: "#25D366", bg: "rgba(37,211,102,0.12)" },
                { label: "IG", color: "#E1306C", bg: "rgba(225,48,108,0.12)" },
                { label: "WEB", color: "#2D00FF", bg: "rgba(45,0,255,0.12)" },
              ].map((ch) => (
                <span key={ch.label} style={{
                  background: ch.bg, border: `1px solid ${ch.color}40`,
                  borderRadius: "6px", padding: "4px 10px",
                  fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                  fontSize: "11px", color: ch.color, letterSpacing: "0.05em",
                }}>{ch.label}</span>
              ))}
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: statusBadgeBg, border: `1px solid ${statusBadgeBorder}`,
              borderRadius: "8px", padding: "6px 12px",
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#25D366", display: "inline-block",
                boxShadow: "0 0 6px #25D366",
                animation: "crmpulse 1.5s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "'Urbanist', sans-serif", fontWeight: 600,
                fontSize: "12px", color: textFaint,
              }}>Motor activo · Procesando</span>
            </div>
          </div>

          {/* Card Body — stack on mobile */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isCompact ? "1fr" : "1fr 1fr",
            minHeight: isCompact ? "auto" : "460px",
          }}>
            {/* Phone Mockup */}
            <div style={{
              position: "relative",
              borderRight: isCompact ? "none" : `1px solid ${colDivider}`,
              borderBottom: isCompact ? `1px solid ${colDivider}` : "none",
              padding: isMobile ? "20px 16px" : "24px 16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden",
            }}>
              <LumenOmnichannelMockup />
            </div>

            {/* Blueprint Details - COMPACT VERSION */}
            <div style={{
              padding: isMobile ? "20px 16px" : isTablet ? "28px 24px" : "40px 36px",
              display: "flex", flexDirection: "column",
              justifyContent: "center", gap: isMobile ? "12px" : "16px",
            }}>
              <div style={{
                fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                fontSize: "10px", color: "#8E00FF",
                letterSpacing: "0.12em", textTransform: "uppercase",
              }}>
                Blueprint #01 — El Conciliador Omnicanal
              </div>

              <h3 style={{
                fontFamily: "'Urbanist', sans-serif", fontWeight: 800,
                fontSize: isMobile ? "18px" : "24px",
                color: textMain, lineHeight: 1.2, margin: 0,
              }}>
                Un solo cerebro{" "}
                <span style={{
                  backgroundImage: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  para todos tus canales.
                </span>
              </h3>

              <p style={{
                fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
                fontSize: isMobile ? "12px" : "14px", color: text,
                lineHeight: 1.5, margin: 0,
              }}>
                {isMobile 
                  ? "LUMEN centraliza, responde y registra todo al instante."
                  : "No importa si escriben por WhatsApp a las 3am o por Instagram un domingo. LUMEN centraliza todo, responde al instante y no pierde ningún lead."
                }
              </p>

              {/* Compact Horizontal Flow */}
              <div style={{
                background: isDark 
                  ? "linear-gradient(135deg, rgba(45,0,255,0.08) 0%, rgba(142,0,255,0.05) 100%)"
                  : "linear-gradient(135deg, rgba(45,0,255,0.04) 0%, rgba(142,0,255,0.03) 100%)",
                border: `1.5px solid ${isDark ? "rgba(142,0,255,0.2)" : "rgba(45,0,255,0.12)"}`,
                borderRadius: isMobile ? "16px" : "20px",
                padding: isMobile ? "20px 16px" : "24px 20px",
                marginTop: isMobile ? "8px" : "12px",
                boxShadow: isDark 
                  ? "0 8px 32px rgba(45,0,255,0.12), 0 0 0 1px rgba(142,0,255,0.06) inset"
                  : "0 4px 24px rgba(45,0,255,0.06)",
              }}>
                {/* Compact Header */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  marginBottom: isMobile ? "16px" : "20px",
                  paddingBottom: isMobile ? "12px" : "14px",
                  borderBottom: `1px solid ${isDark ? "rgba(142,0,255,0.15)" : "rgba(45,0,255,0.10)"}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "28px", height: "28px",
                      background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                      borderRadius: "8px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(45,0,255,0.4)",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d="M3 10h14M10 3v14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "'Urbanist', sans-serif", fontWeight: 800,
                        fontSize: isMobile ? "13px" : "15px", color: textMain,
                      }}>Flujo de Procesamiento</div>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                    fontSize: isMobile ? "10px" : "11px", color: "#8E00FF",
                    background: isDark ? "rgba(142,0,255,0.15)" : "rgba(142,0,255,0.10)",
                    padding: "4px 10px", borderRadius: "6px",
                    border: `1px solid ${isDark ? "rgba(142,0,255,0.3)" : "rgba(142,0,255,0.2)"}`,
                  }}>{"< 2s"}</div>
                </div>

                {/* Horizontal Flow with Arrows - Desktop & Tablet */}
                {!isMobile && (
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr auto 1fr auto 1fr",
                    alignItems: "start",
                    gap: "12px",
                  }}>
                    {steps.map((step, idx) => (
                      <React.Fragment key={step.num}>
                        <div style={{
                          background: isDark ? step.bgColor : step.bgColor.replace('0.06', '0.03'),
                          border: `1.5px solid ${isDark ? step.borderColor : step.borderColor.replace('0.25', '0.15')}`,
                          borderRadius: "14px",
                          padding: "16px",
                          transition: "all 0.3s ease",
                          cursor: "default",
                          minHeight: "140px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow = isDark 
                            ? `0 8px 24px ${step.color}40` 
                            : `0 4px 16px ${step.color}26`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                            <div style={{
                              width: "40px", height: "40px",
                              borderRadius: "12px",
                              background: `linear-gradient(135deg, ${step.color}, ${step.color}DD)`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              flexShrink: 0,
                              boxShadow: `0 4px 16px ${step.color}66`,
                              position: "relative",
                            }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d={step.icon} />
                              </svg>
                              <div style={{
                                position: "absolute", top: "-3px", right: "-3px",
                                width: "14px", height: "14px", borderRadius: "50%",
                                background: step.color,
                                border: "2px solid white",
                                fontSize: "8px", fontWeight: 800, color: "white",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontFamily: "'Urbanist', sans-serif",
                              }}>{step.num}</div>
                            </div>
                            <div style={{
                              fontFamily: "'Urbanist', sans-serif", fontWeight: 800,
                              fontSize: "10px", color: step.color,
                              letterSpacing: "0.08em",
                              background: isDark ? `${step.color}26` : `${step.color}1A`,
                              padding: "3px 8px", borderRadius: "5px",
                              border: `1px solid ${step.color}4D`,
                            }}>{step.label}</div>
                          </div>
                          <div style={{
                            fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                            fontSize: "14px", color: textMain, marginBottom: "6px",
                          }}>{step.title}</div>
                          <p style={{
                            fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
                            fontSize: "12px", color: text,
                            lineHeight: 1.5, margin: 0,
                          }}>
                            {step.desc}
                          </p>
                        </div>
                        {idx < 2 && (
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "50px" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12h14m-6-6l6 6-6 6" stroke={isDark ? "rgba(142,0,255,0.5)" : "rgba(45,0,255,0.4)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* Vertical Stack - Mobile */}
                {isMobile && (
                  <div style={{ position: "relative" }}>
                    {/* Single Step Card */}
                    <div style={{
                      background: isDark ? steps[activeStep].bgColor : steps[activeStep].bgColor.replace('0.06', '0.03'),
                      border: `1.5px solid ${isDark ? steps[activeStep].borderColor : steps[activeStep].borderColor.replace('0.25', '0.15')}`,
                      borderRadius: "14px",
                      padding: "20px",
                      minHeight: "160px",
                      transition: "all 0.5s ease",
                    }}>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <div style={{
                          width: "48px", height: "48px",
                          borderRadius: "12px",
                          background: `linear-gradient(135deg, ${steps[activeStep].color}, ${steps[activeStep].color}DD)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                          boxShadow: `0 6px 20px ${steps[activeStep].color}66`,
                          position: "relative",
                        }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d={steps[activeStep].icon} />
                          </svg>
                          <div style={{
                            position: "absolute", top: "-4px", right: "-4px",
                            width: "16px", height: "16px", borderRadius: "50%",
                            background: steps[activeStep].color,
                            border: "2px solid white",
                            fontSize: "8px", fontWeight: 800, color: "white",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "'Urbanist', sans-serif",
                          }}>{steps[activeStep].num}</div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                            <span style={{
                              fontFamily: "'Urbanist', sans-serif", fontWeight: 800,
                              fontSize: "10px", color: steps[activeStep].color,
                              letterSpacing: "0.08em",
                              background: isDark ? `${steps[activeStep].color}26` : `${steps[activeStep].color}1A`,
                              padding: "4px 10px", borderRadius: "5px",
                              border: `1px solid ${steps[activeStep].color}4D`,
                            }}>{steps[activeStep].label}</span>
                          </div>
                          <div style={{
                            fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                            fontSize: "15px", color: textMain, marginBottom: "6px",
                          }}>{steps[activeStep].title}</div>
                          <p style={{
                            fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
                            fontSize: "12px", color: text,
                            lineHeight: 1.5, margin: 0,
                          }}>
                            {steps[activeStep].desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dots Indicators */}
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "center", 
                      gap: "8px", 
                      marginTop: "16px" 
                    }}>
                      {steps.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveStep(idx)}
                          style={{
                            width: activeStep === idx ? "24px" : "8px",
                            height: "8px",
                            borderRadius: "4px",
                            background: activeStep === idx 
                              ? "linear-gradient(135deg, #2D00FF, #8E00FF)"
                              : isDark ? "rgba(255,255,255,0.2)" : "rgba(45,0,255,0.2)",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: activeStep === idx ? "0 2px 8px rgba(45,0,255,0.4)" : "none",
                          }}
                          aria-label={`Go to step ${idx + 1}`}
                        />
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div style={{
                      marginTop: "12px",
                      height: "3px",
                      background: isDark ? "rgba(255,255,255,0.1)" : "rgba(45,0,255,0.1)",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%",
                        background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                        width: `${((activeStep + 1) / steps.length) * 100}%`,
                        transition: "width 0.3s ease",
                        boxShadow: "0 0 10px rgba(45,0,255,0.5)",
                      }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Compact Response time badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: timeBadgeBg, border: `1px solid ${statusBadgeBorder}`,
                borderRadius: "10px", padding: isMobile ? "10px 14px" : "10px 16px", 
                alignSelf: "flex-start",
                marginTop: "4px",
              }}>
                <div style={{
                  width: "28px", height: "28px",
                  background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                  borderRadius: "8px", display: "flex", alignItems: "center",
                  justifyContent: "center", boxShadow: "0 0 12px rgba(45,0,255,0.4)",
                  flexShrink: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M12 2L4 11H9.5L8 19L17 10H11.5L13 2Z" fill="white" />
                  </svg>
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Urbanist', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? "16px" : "18px", color: textMain, lineHeight: 1,
                  }}>{"< 2 segundos"}</div>
                  <div style={{
                    fontFamily: "'Urbanist', sans-serif", fontWeight: 500,
                    fontSize: "10px", color: text, marginTop: "2px",
                  }}>Tiempo de respuesta</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming soon cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isCompact ? "1fr" : "repeat(2, 1fr)",
          gap: "12px", marginTop: "12px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
        }}>
          {[
            {
              num: "#02", title: "Sabe quién va a comprar", color: "#2D00FF",
              desc: "LUMEN analiza cada conversación y te dice qué leads tienen más probabilidad de cerrar. Enfoca tu equipo donde importa.",
            },
            {
              num: "#03", title: "Si la IA no puede, te pasa la llamada", color: "#8E00FF",
              desc: "Cuando una conversación necesita toque humano, LUMEN lo detecta y transfiere al agente correcto al instante.",
            },
          ].map((card) => (
            <div key={card.num} style={{
              borderRadius: "20px", background: smallCardBg,
              border: `1px solid ${smallCardBorder}`,
              padding: isMobile ? "24px 20px 60px 20px" : "32px 36px 70px 36px",
              backdropFilter: "blur(16px)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}>
              {/* Badge superior */}
              <div style={{
                fontFamily: "'Urbanist', sans-serif", fontWeight: 800,
                fontSize: "11px", color: card.color,
                letterSpacing: "0.08em",
                background: `${card.color}15`, border: `1px solid ${card.color}30`,
                borderRadius: "6px", padding: "4px 8px",
                alignSelf: "flex-start",
              }}>{card.num}</div>
              
              {/* Contenido de texto */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                  fontSize: isMobile ? "19px" : "21px", 
                  color: textMain, 
                  marginBottom: "12px",
                  lineHeight: 1.3,
                }}>{card.title}</div>
                <p style={{
                  fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
                  fontSize: isMobile ? "14px" : "15px", 
                  color: text, 
                  margin: 0, 
                  lineHeight: 1.7,
                  maxWidth: "95%",
                }}>{card.desc}</p>
              </div>
              
              {/* Badge Próximamente centrado abajo */}
              <div style={{
                position: "absolute",
                bottom: isMobile ? "20px" : "28px",
                left: "50%",
                transform: "translateX(-50%)",
                background: comingSoonBg, 
                borderRadius: "8px",
                padding: "6px 14px",
                fontFamily: "'Urbanist', sans-serif", 
                fontWeight: 600,
                fontSize: "11px", 
                color: comingSoonText, 
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}>Próximamente</div>
            </div>
          ))}\
        </div>
      </div>
    </section>
  );
};