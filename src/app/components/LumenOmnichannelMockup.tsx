import React, { useEffect, useState } from "react";
import lumenLogo from "figma:asset/f24b33df11fab8d83fe5139af2d792b715421916.png";
import { useTheme } from "./ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";

const WA_COLOR = "#25D366";
const IG_START = "#E1306C";
const IG_END = "#833AB4";
const WEB_COLOR = "#2D00FF";
const LUMEN_GRADIENT = "linear-gradient(135deg, #2D00FF, #8E00FF)";

interface ChatBubbleProps {
  color: string;
  isGradient?: boolean;
  gradientEnd?: string;
  align: "left" | "right";
  text: string;
  platform: string;
  delay: number;
  animatedIn: boolean;
}

const ChatBubble = ({
  color,
  isGradient,
  gradientEnd,
  align,
  text,
  platform,
  delay,
  animatedIn,
}: ChatBubbleProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (animatedIn) {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
    }
  }, [animatedIn, delay]);

  const bg = isGradient
    ? `linear-gradient(135deg, ${color}, ${gradientEnd})`
    : color;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: align === "left" ? "row" : "row-reverse",
        alignItems: "flex-end",
        gap: "6px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {/* Platform dot */}
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: "8px", color: "white", fontWeight: 700 }}>
          {platform === "WA" ? "W" : platform === "IG" ? "I" : "↗"}
        </span>
      </div>
      <div
        style={{
          background: bg,
          color: "white",
          padding: "7px 11px",
          borderRadius:
            align === "left" ? "12px 12px 12px 3px" : "12px 12px 3px 12px",
          fontSize: "10px",
          fontFamily: "'Urbanist', sans-serif",
          fontWeight: 500,
          maxWidth: "130px",
          lineHeight: 1.4,
          boxShadow: `0 2px 12px rgba(0,0,0,0.3)`,
        }}
      >
        <div
          style={{
            fontSize: "8px",
            opacity: 0.75,
            marginBottom: "2px",
            fontWeight: 700,
            letterSpacing: "0.04em",
          }}
        >
          {platform}
        </div>
        {text}
      </div>
    </div>
  );
};

const ChannelBadge = ({
  label,
  icon,
  color,
  isGradient,
  gradientEnd,
  description,
  isDark,
}: {
  label: string;
  icon: React.ReactNode;
  color: string;
  isGradient?: boolean;
  gradientEnd?: string;
  description: string;
  isDark: boolean;
}) => {
  const bg = isGradient
    ? `linear-gradient(135deg, ${color}, ${gradientEnd})`
    : color;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.85)",
        border: `1.5px solid ${isDark ? `${color}40` : `${color}30`}`,
        borderRadius: "14px",
        padding: "12px 16px",
        backdropFilter: "blur(12px)",
        overflow: "hidden",
        maxWidth: "100%",
        boxSizing: "border-box",
        boxShadow: isDark
          ? `0 4px 16px rgba(0,0,0,0.3)`
          : `0 2px 12px rgba(0,0,0,0.08)`,
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          minWidth: "40px",
          borderRadius: "10px",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: `0 0 16px ${color}66`,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0, flex: 1, overflow: "hidden" }}>
        <div
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 800,
            fontSize: "14px",
            color: isDark ? "#FFFFFF" : "#1A1A2E",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "2px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 500,
            fontSize: "11px",
            color: isDark ? "rgba(255,255,255,0.6)" : "rgba(26,26,46,0.65)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

// Animated connection line dot
const FlowDot = ({
  color,
  duration,
  delay,
  pathId,
}: {
  color: string;
  duration: number;
  delay: number;
  pathId: string;
}) => (
  <circle r="4" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
    <animateMotion
      dur={`${duration}s`}
      repeatCount="indefinite"
      begin={`${delay}s`}
    >
      <mpath xlinkHref={`#${pathId}`} />
    </animateMotion>
    <animate
      attributeName="opacity"
      values="0;1;1;0"
      dur={`${duration}s`}
      repeatCount="indefinite"
      begin={`${delay}s`}
    />
  </circle>
);

export const LumenOmnichannelMockup = () => {
  const [animatedIn, setAnimatedIn] = useState(false);
  const [activeChannelIndex, setActiveChannelIndex] = useState(0);
  const { isDark } = useTheme();
  const breakpoint = useBreakpoint();

  useEffect(() => {
    const t = setTimeout(() => setAnimatedIn(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Auto-rotate channels in mobile
  useEffect(() => {
    if (breakpoint.isMobile) {
      const interval = setInterval(() => {
        setActiveChannelIndex((prev) => (prev + 1) % 3);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [breakpoint.isMobile]);

  const channels = [
    {
      label: "WhatsApp",
      color: WA_COLOR,
      description: "Chat · Audio · GPS",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      color: IG_START,
      isGradient: true,
      gradientEnd: IG_END,
      description: "DM · Stories · Comentarios",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      label: "Web Chat",
      color: WEB_COLOR,
      description: "Widget · API · SDK",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: breakpoint.isMobile ? "600px" : "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: breakpoint.isMobile ? "flex-start" : "center",
        paddingTop: breakpoint.isMobile ? "16px" : "0",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "320px",
          height: "320px",
          background:
            "radial-gradient(ellipse, rgba(142,0,255,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* === SVG Connection Lines === */}
      {!breakpoint.isMobile && (
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
          }}
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="waLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={WA_COLOR} stopOpacity="0.8" />
              <stop offset="100%" stopColor={WA_COLOR} stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="igLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={IG_START} stopOpacity="0.8" />
              <stop offset="100%" stopColor={IG_END} stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="webLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={WEB_COLOR} stopOpacity="0.8" />
              <stop offset="100%" stopColor={WEB_COLOR} stopOpacity="0.2" />
            </linearGradient>

            {/* WA path: from WA badge (left side ~x=80) to phone screen top area */}
            <path id="waPath" d="M 88 138 C 160 138, 210 175, 258 185" />
            {/* IG path: from IG badge (left side ~x=80) to phone screen middle */}
            <path id="igPath" d="M 88 255 C 160 255, 210 248, 258 248" />
            {/* WEB path: from WEB badge (left side ~x=80) to phone screen lower */}
            <path id="webPath" d="M 88 372 C 160 372, 210 315, 258 312" />
          </defs>

          {/* WA line */}
          <use xlinkHref="#waPath" fill="none" stroke="url(#waLineGrad)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
          {/* IG line */}
          <use xlinkHref="#igPath" fill="none" stroke="url(#igLineGrad)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
          {/* WEB line */}
          <use xlinkHref="#webPath" fill="none" stroke="url(#webLineGrad)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />

          {/* Flowing dots WA */}
          <FlowDot color={WA_COLOR} duration={2.2} delay={0} pathId="waPath" />
          <FlowDot color={WA_COLOR} duration={2.2} delay={1.1} pathId="waPath" />

          {/* Flowing dots IG */}
          <FlowDot color={IG_START} duration={2.5} delay={0.4} pathId="igPath" />
          <FlowDot color={IG_END} duration={2.5} delay={1.6} pathId="igPath" />

          {/* Flowing dots WEB */}
          <FlowDot color={WEB_COLOR} duration={2.8} delay={0.8} pathId="webPath" />
          <FlowDot color={WEB_COLOR} duration={2.8} delay={2.0} pathId="webPath" />
        </svg>
      )}

      {/* === Channel Badges === */}
      <div
        style={{
          position: breakpoint.isMobile ? "relative" : "absolute",
          left: breakpoint.isMobile ? "auto" : "0px",
          top: breakpoint.isMobile ? "0" : "50%",
          transform: breakpoint.isMobile ? "none" : "translateY(-50%)",
          display: "flex",
          flexDirection: breakpoint.isMobile ? "column" : "column",
          gap: breakpoint.isMobile ? "12px" : "22px",
          width: breakpoint.isMobile ? "100%" : "auto",
          padding: breakpoint.isMobile ? "0 16px" : "0",
          marginBottom: breakpoint.isMobile ? "20px" : "0",
          zIndex: 10,
          alignItems: breakpoint.isMobile ? "center" : "flex-start",
        }}
      >
        {/* Mobile carousel */}
        {breakpoint.isMobile && (
          <div style={{ width: "100%", maxWidth: "320px" }}>
            <div
              key={activeChannelIndex}
              style={{
                animation: "fadeBadgeIn 0.6s ease-out forwards",
              }}
            >
              <ChannelBadge
                label={channels[activeChannelIndex].label}
                color={channels[activeChannelIndex].color}
                isGradient={channels[activeChannelIndex].isGradient}
                gradientEnd={channels[activeChannelIndex].gradientEnd}
                description={channels[activeChannelIndex].description}
                icon={channels[activeChannelIndex].icon}
                isDark={isDark}
              />
            </div>
            {/* Carousel indicators */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "center",
                marginTop: "12px",
              }}
            >
              {channels.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveChannelIndex(index)}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    border: "none",
                    background:
                      index === activeChannelIndex
                        ? channels[activeChannelIndex].color
                        : isDark
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(0,0,0,0.2)",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.3s ease",
                    boxShadow:
                      index === activeChannelIndex
                        ? `0 0 8px ${channels[activeChannelIndex].color}`
                        : "none",
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Desktop - all badges */}
        {!breakpoint.isMobile &&
          channels.map((channel, index) => (
            <ChannelBadge
              key={index}
              label={channel.label}
              color={channel.color}
              isGradient={channel.isGradient}
              gradientEnd={channel.gradientEnd}
              description={channel.description}
              icon={channel.icon}
              isDark={isDark}
            />
          ))}
      </div>

      {/* === iPhone Frame (Right/Center) === */}
      <div
        style={{
          position: breakpoint.isMobile ? "relative" : "absolute",
          right: breakpoint.isMobile ? "auto" : "24px",
          top: breakpoint.isMobile ? "auto" : "50%",
          transform: breakpoint.isMobile ? "none" : "translateY(-50%)",
        }}
      >
        {/* Phone outer shell */}
        <div
          style={{
            width: "210px",
            height: "420px",
            background: isDark 
              ? "linear-gradient(180deg, #1A1A2E, #12121F)" 
              : "linear-gradient(180deg, #FAFAFA, #FFFFFF)",
            borderRadius: "44px",
            border: isDark 
              ? "6px solid #2A2A40" 
              : "6px solid #E5E5E5",
            boxShadow: isDark
              ? "0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(142,0,255,0.2)"
              : "0 0 0 1px rgba(0,0,0,0.08), 0 30px 80px rgba(0,0,0,0.15), 0 0 40px rgba(142,0,255,0.15)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Notch */}
          <div
            style={{
              height: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: isDark ? "#12121F" : "#FFFFFF",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "90px",
                height: "20px",
                background: isDark ? "#0A0A18" : "#1A1A2E",
                borderRadius: "0 0 16px 16px",
              }}
            />
          </div>

          {/* App Bar */}
          <div
            style={{
              background: isDark ? "#141425" : "#FAFAFA",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: isDark 
                ? "1px solid rgba(45,0,255,0.2)" 
                : "1px solid rgba(45,0,255,0.15)",
              flexShrink: 0,
            }}
          >
            <img
              src={lumenLogo}
              alt="LUMEN"
              style={{
                height: "20px",
                width: "auto",
                objectFit: "contain",
              }}
            />
            <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#25D366",
                  boxShadow: "0 0 5px #25D366",
                }}
              />
            </div>
          </div>

          {/* Chat messages */}
          <div
            style={{
              flex: 1,
              overflowY: "hidden",
              padding: "12px 10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              background: isDark ? "#0E0E1C" : "#FFFFFF",
            }}
          >
            <ChatBubble
              color={WA_COLOR}
              align="left"
              text="Necesito cotizar instalación solar 🌞"
              platform="WA"
              delay={200}
              animatedIn={animatedIn}
            />
            <ChatBubble
              color={IG_START}
              isGradient
              gradientEnd={IG_END}
              align="right"
              text="¿Tienen servicio en CDMX?"
              platform="IG"
              delay={700}
              animatedIn={animatedIn}
            />
            {/* Lumen typing indicator / response */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "6px",
                opacity: animatedIn ? 1 : 0,
                transform: animatedIn ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.4s ease 1.1s, transform 0.4s ease 1.1s",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: LUMEN_GRADIENT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 0 8px rgba(45,0,255,0.6)",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
                  <path d="M12 2L4 11H9.5L8 19L17 10H11.5L13 2Z" fill="white" />
                </svg>
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                  color: "white",
                  padding: "7px 11px",
                  borderRadius: "12px 12px 12px 3px",
                  fontSize: "10px",
                  fontFamily: "'Urbanist', sans-serif",
                  fontWeight: 500,
                  maxWidth: "130px",
                  lineHeight: 1.4,
                  boxShadow: "0 0 16px rgba(45,0,255,0.4)",
                }}
              >
                <div style={{ fontSize: "8px", opacity: 0.75, marginBottom: "2px", fontWeight: 700 }}>LUMEN · 1.8s</div>
                ¡Claro! Te envío la cotización ahora mismo ⚡
              </div>
            </div>

            <ChatBubble
              color={WEB_COLOR}
              align="right"
              text="Need pricing info ASAP"
              platform="WEB"
              delay={1600}
              animatedIn={animatedIn}
            />

            <ChatBubble
              color={WA_COLOR}
              align="left"
              text="Audio recibido 🎙️ Procesando..."
              platform="WA"
              delay={2100}
              animatedIn={animatedIn}
            />
          </div>

          {/* Input bar */}
          <div
            style={{
              background: isDark ? "#141425" : "#FAFAFA",
              borderTop: isDark 
                ? "1px solid rgba(255,255,255,0.06)" 
                : "1px solid rgba(0,0,0,0.08)",
              padding: "8px 10px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                flex: 1,
                background: isDark 
                  ? "rgba(255,255,255,0.07)" 
                  : "rgba(0,0,0,0.05)",
                borderRadius: "20px",
                padding: "6px 12px",
                fontSize: "10px",
                color: isDark 
                  ? "rgba(255,255,255,0.3)" 
                  : "rgba(0,0,0,0.35)",
                fontFamily: "'Urbanist', sans-serif",
              }}
            >
              Responde en todos los canales...
            </div>
            <div
              style={{
                width: "26px",
                height: "26px",
                background: LUMEN_GRADIENT,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 10px rgba(45,0,255,0.4)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                <path d="M3 9H15M15 9L9.5 3.5M15 9L9.5 14.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Home indicator */}
          <div
            style={{
              height: "20px",
              background: isDark ? "#12121F" : "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "60px",
                height: "4px",
                background: isDark 
                  ? "rgba(255,255,255,0.2)" 
                  : "rgba(0,0,0,0.2)",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>

        {/* CRM badge floating */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "-16px",
            background: "rgba(13, 13, 26, 0.95)",
            border: "1px solid rgba(142,0,255,0.35)",
            borderRadius: "10px",
            padding: "8px 12px",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "9px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.06em",
              marginBottom: "2px",
            }}
          >
            REGISTRO CRM
          </div>
          <div
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#25D366",
                display: "inline-block",
                animation: "crmpulse 1.5s ease-in-out infinite",
              }}
            />
            Lead · 1.8s
          </div>
        </div>
      </div>
    </div>
  );
};