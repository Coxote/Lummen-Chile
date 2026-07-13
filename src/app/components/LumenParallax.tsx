import React, { useEffect, useState } from "react";
import torusImg from "figma:asset/a23cdfe6958e02919228dbc920bbfd149ef1253d.png";
import crescentImg from "figma:asset/0e29c4417620391719e447c64777ac3167520fbf.png";
import teardropImg from "figma:asset/433b5553390ef4f58350afe37581c83e78a24bde.png";
import { useTheme } from "./ThemeContext";

// SVG fractal noise grain — data URI
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`;

export const LumenParallax = () => {
  const { isDark } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile sizes: 50% of desktop
  const torusSize   = isMobile ? 182 : 364;
  const crescentSize = isMobile ? 130 : 259;
  const teardropSize = isMobile ? 109 : 217;

  // Mobile positions: tighter to edges
  const torusPos    = isMobile ? { top: "-20px",  right: "-30px" } : { top: "-50px",  right: "-80px" };
  const crescentPos = isMobile ? { top: "28vh",   left:  "-20px" } : { top: "30vh",   left:  "-70px" };
  const teardropPos = isMobile ? { top: "65vh",   right: "-10px" } : { top: "66vh",   right: "-40px" };

  return (
    <>
      {/* ── Background ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -3,
          background: isDark ? "#000000" : "#FFFFFF",
          transition: "background 0.4s ease",
        }}
      />

      {/* ── Grain overlay (dark only, very subtle) ── */}
      {isDark && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -2,
            backgroundImage: GRAIN_SVG,
            backgroundRepeat: "repeat",
            backgroundSize: "320px 320px",
            opacity: 0.045,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── Light mode: clean radial accent glows only, no 3D shapes ── */}
      {!isDark && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -2,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* Top-right warm glow */}
          <div style={{
            position: "absolute",
            top: "-120px", right: "-120px",
            width: "700px", height: "700px",
            background: "radial-gradient(ellipse, rgba(0,194,255,0.07) 0%, rgba(45,0,255,0.05) 45%, transparent 70%)",
            borderRadius: "50%",
          }} />
          {/* Left mid soft glow */}
          <div style={{
            position: "absolute",
            top: "30vh", left: "-160px",
            width: "500px", height: "500px",
            background: "radial-gradient(ellipse, rgba(142,0,255,0.05) 0%, transparent 70%)",
            borderRadius: "50%",
          }} />
          {/* Bottom center */}
          <div style={{
            position: "absolute",
            bottom: "0", left: "50%",
            transform: "translateX(-50%)",
            width: "800px", height: "400px",
            background: "radial-gradient(ellipse, rgba(45,0,255,0.04) 0%, transparent 70%)",
          }} />
        </div>
      )}

      {/* ── Dark mode: floating 3D elements ── */}
      {isDark && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* Torus — top-right */}
          <div style={{ position: "absolute", ...torusPos }}>
            <div style={{ transform: `translateY(${scrollY * 0.09}px)` }}>
              <div style={{ animation: "lumenFloatA 9s ease-in-out infinite" }}>
                <img
                  src={torusImg}
                  alt=""
                  style={{
                    width: `${torusSize}px`,
                    height: "auto",
                    display: "block",
                    filter: "invert(1) brightness(0.78) contrast(1.1)",
                    mixBlendMode: "screen",
                    opacity: 0.52,
                    transform: "rotate(-18deg)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Crescent — left mid */}
          <div style={{ position: "absolute", ...crescentPos }}>
            <div style={{ transform: `translateY(${scrollY * 0.20}px)` }}>
              <div style={{ animation: "lumenFloatB 12s ease-in-out infinite" }}>
                <img
                  src={crescentImg}
                  alt=""
                  style={{
                    width: `${crescentSize}px`,
                    height: "auto",
                    display: "block",
                    filter: "invert(1) brightness(0.72) contrast(1.1)",
                    mixBlendMode: "screen",
                    opacity: 0.48,
                    transform: "rotate(14deg)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Teardrop — bottom-right */}
          <div style={{ position: "absolute", ...teardropPos }}>
            <div style={{ transform: `translateY(${scrollY * 0.48}px)` }}>
              <div style={{ animation: "lumenFloatC 10s ease-in-out infinite" }}>
                <img
                  src={teardropImg}
                  alt=""
                  style={{
                    width: `${teardropSize}px`,
                    height: "auto",
                    display: "block",
                    filter: "invert(1) brightness(0.78) contrast(1.1) blur(6px)",
                    mixBlendMode: "screen",
                    opacity: 0.55,
                    transform: "rotate(-22deg)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};