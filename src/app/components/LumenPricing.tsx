import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { useGeoRegion, type GeoRegion } from "../hooks/useGeoRegion";

// ── Icons ──────────────────────────────────────────────────────────────────
const CheckIcon = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
    <circle cx="7.5" cy="7.5" r="7" fill={color} fillOpacity="0.15" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
    <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
    style={{ transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
    <path d="M4.5 7L9 11.5L13.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MicIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="6" y="2" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 9c0 3.314 2.686 6 6 6s6-2.686 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="9" y1="15" x2="9" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6.5" y1="17" x2="11.5" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const ChannelIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="2.5" cy="5" r="1.8" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="15.5" cy="5" r="1.8" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="2.5" cy="13" r="1.8" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="15.5" cy="13" r="1.8" stroke="currentColor" strokeWidth="1.3" />
    <path d="M6.5 7.5L4.2 6.2M11.5 7.5L13.8 6.2M6.5 10.5L4.2 11.8M11.5 10.5L13.8 11.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const DatabaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <ellipse cx="9" cy="5" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 5v4c0 1.38 2.686 2.5 6 2.5S15 10.38 15 9V5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 9v4c0 1.38 2.686 2.5 6 2.5S15 14.38 15 13V9" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 3.5A1.5 1.5 0 013.5 2h11A1.5 1.5 0 0116 3.5v8A1.5 1.5 0 0114.5 13H10l-3.5 3V13H3.5A1.5 1.5 0 012 11.5v-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6 7h6M6 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const BrainIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 3c-2.2 0-4 1.567-4 3.5 0 .483.1.942.277 1.358C4.504 8.25 3.5 9.524 3.5 11c0 1.657 1.343 3 3 3 .266 0 .524-.034.77-.097C7.665 14.54 8.3 15 9 15s1.335-.46 1.73-1.097c.246.063.504.097.77.097 1.657 0 3-1.343 3-3 0-1.476-1.004-2.75-1.777-3.142C12.9 7.442 13 6.983 13 6.5 13 4.567 11.2 3 9 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M9 3v2M9 13v2M5.5 8H7M11 8h1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const RocketIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2s4 2.5 4 8l-4 5-4-5c0-5.5 4-8 4-8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <circle cx="9" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M6 13.5L4 16M12 13.5L14 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const SparklesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2L10.5 6.5L15 8L10.5 9.5L9 14L7.5 9.5L3 8L7.5 6.5L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15"/>
    <path d="M14 2L14.7 3.8L16.5 4.5L14.7 5.2L14 7L13.3 5.2L11.5 4.5L13.3 3.8L14 2Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
  </svg>
);

// ── Types ──────────────────────────────────────────────────────────────────
type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  label: string | null;
  desc: string;
  color: string;
  highlighted: boolean;
  features: string[];
  cta: string;
};

type Addon = {
  Icon: () => JSX.Element;
  name: string;
  sub: string;
  price: string;
  detail: string;
  color: string;
};

type SetupFee = {
  price: string;
  detail: string;
  currency: string;
};

// ── Geo-based pricing data ─────────────────────────────────────────────────

// Setup Fee by region (shown above plans)
const setupFeeByRegion: Record<GeoRegion, SetupFee> = {
  global: { price: "$1,500", detail: "fee único de implementación", currency: "USD" },
  guatemala: { price: "$750", detail: "fee único de implementación", currency: "USD" },
  sudamerica: { price: "57 UF", detail: "fee único de implementación", currency: "UF" },
};

const plansByRegion: Record<GeoRegion, Plan[]> = {
  global: [
    {
      id: "spark", name: "Spark", price: "$349", period: "/ mes", label: null,
      desc: "Para empezar con IA conversacional sin complejidad.",
      color: "#2D00FF", highlighted: false,
      features: ["2,000 conversaciones IA / mes", "WhatsApp + 1 canal", "3 agentes humanos (Chatwoot)", "1 asistente IA", "1 base RAG (20 docs)", "Modelo GPT-4o-mini", "Soporte por email"],
      cta: "Comenzar",
    },
    {
      id: "core", name: "Core", price: "$749", period: "/ mes", label: null,
      desc: "Todos los canales de mensajería en un solo motor.",
      color: "#5B00E8", highlighted: false,
      features: ["7,000 conversaciones IA / mes", "Todos los canales de mensajería", "8 agentes humanos (Chatwoot)", "3 asistentes IA", "3 bases RAG (50 docs c/u)", "Modelo GPT-4o-mini", "Soporte email + chat"],
      cta: "Comenzar",
    },
    {
      id: "scale", name: "Scale", price: "$1,499", period: "/ mes", label: "Recomendado",
      desc: "Mensajería + voz con IA. Sin límites de asistentes.",
      color: "#8E00FF", highlighted: true,
      features: ["25,000 conversaciones IA / mes", "Todos los canales + Voz", "20 agentes humanos (Chatwoot)", "Asistentes IA ilimitados", "Bases RAG ilimitadas", "GPT-4o-mini / GPT-4o", "Voice Bridge: 600 min incluidos", "Chat prioritario"],
      cta: "Comenzar",
    },
    {
      id: "enterprise", name: "Enterprise", price: "Desde $3,000", period: "/ mes", label: null,
      desc: "Infraestructura dedicada, Multi-LLM y soporte directo.",
      color: "#C400FF", highlighted: false,
      features: ["Conversaciones ilimitadas", "Todos los canales incluidos", "Agentes humanos ilimitados", "Asistentes IA ilimitados", "Bases RAG ilimitadas", "Multi-LLM (OpenAI · Anthropic · Google)", "Voice Bridge incluido", "Instancia Chatwoot dedicada", "Soporte dedicado"],
      cta: "Hablar con ventas",
    },
  ],
  guatemala: [
    {
      id: "spark", name: "Spark", price: "$149", period: "/ mes", label: null,
      desc: "Para empezar con IA conversacional sin complejidad.",
      color: "#2D00FF", highlighted: false,
      features: ["2,000 conversaciones IA / mes", "WhatsApp + 1 canal", "3 agentes humanos (Chatwoot)", "1 asistente IA", "1 base RAG (20 docs)", "Modelo GPT-4o-mini", "Soporte por email"],
      cta: "Comenzar",
    },
    {
      id: "core", name: "Core", price: "$349", period: "/ mes", label: null,
      desc: "Todos los canales de mensajería en un solo motor.",
      color: "#5B00E8", highlighted: false,
      features: ["7,000 conversaciones IA / mes", "Todos los canales de mensajería", "8 agentes humanos (Chatwoot)", "3 asistentes IA", "3 bases RAG (50 docs c/u)", "Modelo GPT-4o-mini", "Soporte email + chat"],
      cta: "Comenzar",
    },
    {
      id: "scale", name: "Scale", price: "$749", period: "/ mes", label: "Recomendado",
      desc: "Mensajería + voz con IA. Sin límites de asistentes.",
      color: "#8E00FF", highlighted: true,
      features: ["25,000 conversaciones IA / mes", "Todos los canales + Voz", "20 agentes humanos (Chatwoot)", "Asistentes IA ilimitados", "Bases RAG ilimitadas", "GPT-4o-mini / GPT-4o", "Voice Bridge: 600 min incluidos", "Chat prioritario"],
      cta: "Comenzar",
    },
    {
      id: "enterprise", name: "Enterprise", price: "Desde $1,500", period: "/ mes", label: null,
      desc: "Infraestructura dedicada, Multi-LLM y soporte directo.",
      color: "#C400FF", highlighted: false,
      features: ["Conversaciones ilimitadas", "Todos los canales incluidos", "Agentes humanos ilimitados", "Asistentes IA ilimitados", "Bases RAG ilimitadas", "Multi-LLM (OpenAI · Anthropic · Google)", "Voice Bridge incluido", "Instancia Chatwoot dedicada", "Soporte dedicado"],
      cta: "Hablar con ventas",
    },
  ],
  sudamerica: [
    {
      id: "spark", name: "Spark", price: "13,3 UF", period: "/ mes", label: null,
      desc: "Para empezar con IA conversacional sin complejidad.",
      color: "#2D00FF", highlighted: false,
      features: ["2,000 conversaciones IA / mes", "WhatsApp + 1 canal", "3 agentes humanos (Chatwoot)", "1 asistente IA", "1 base RAG (20 docs)", "Modelo GPT-4o-mini", "Soporte por email"],
      cta: "Comenzar",
    },
    {
      id: "core", name: "Core", price: "22 UF", period: "/ mes", label: null,
      desc: "Todos los canales de mensajería en un solo motor.",
      color: "#5B00E8", highlighted: false,
      features: ["7,000 conversaciones IA / mes", "Todos los canales de mensajería", "8 agentes humanos (Chatwoot)", "3 asistentes IA", "3 bases RAG (50 docs c/u)", "Modelo GPT-4o-mini", "Soporte email + chat"],
      cta: "Comenzar",
    },
    {
      id: "scale", name: "Scale", price: "57 UF", period: "/ mes", label: "Recomendado",
      desc: "Mensajería + voz con IA. Sin límites de asistentes.",
      color: "#8E00FF", highlighted: true,
      features: ["25,000 conversaciones IA / mes", "Todos los canales + Voz", "20 agentes humanos (Chatwoot)", "Asistentes IA ilimitados", "Bases RAG ilimitadas", "GPT-4o-mini / GPT-4o", "Voice Bridge: 600 min incluidos", "Chat prioritario"],
      cta: "Comenzar",
    },
    {
      id: "enterprise", name: "Enterprise", price: "92 UF", period: "/ mes", label: null,
      desc: "Infraestructura dedicada, Multi-LLM y soporte directo.",
      color: "#C400FF", highlighted: false,
      features: ["Conversaciones ilimitadas", "Todos los canales incluidos", "Agentes humanos ilimitados", "Asistentes IA ilimitados", "Bases RAG ilimitadas", "Multi-LLM (OpenAI · Anthropic · Google)", "Voice Bridge incluido", "Instancia Chatwoot dedicada", "Soporte dedicado"],
      cta: "Hablar con ventas",
    },
  ],
};

const addonsByRegion: Record<GeoRegion, Addon[]> = {
  global: [
    { Icon: MicIcon, name: "Voice Bridge", sub: "Spark / Core", price: "$149/mes", detail: "+ $0.50/min", color: "#2D00FF" },
    { Icon: ChannelIcon, name: "Canal adicional", sub: "Solo plan Spark", price: "$39/mes", detail: "por canal extra", color: "#5B00E8" },
    { Icon: DatabaseIcon, name: "Base RAG adicional", sub: "Docs propios", price: "$69/mes", detail: "por base", color: "#8E00FF" },
    { Icon: ChatIcon, name: "Pack conversaciones", sub: "Prepago flexible", price: "$49", detail: "/ 1,000 conv", color: "#A400FF" },
    { Icon: BrainIcon, name: "GPT-4o Premium", sub: "Razonamiento avanzado", price: "+$0.04", detail: "/ conversación", color: "#C400FF" },
  ],
  guatemala: [
    { Icon: MicIcon, name: "Voice Bridge", sub: "Spark / Core", price: "$79/mes", detail: "+ $0.25/min", color: "#2D00FF" },
    { Icon: ChannelIcon, name: "Canal adicional", sub: "Solo plan Spark", price: "$19/mes", detail: "por canal extra", color: "#5B00E8" },
    { Icon: DatabaseIcon, name: "Base RAG adicional", sub: "Docs propios", price: "$35/mes", detail: "por base", color: "#8E00FF" },
    { Icon: ChatIcon, name: "Pack conversaciones", sub: "Prepago flexible", price: "$25", detail: "/ 1,000 conv", color: "#A400FF" },
    { Icon: BrainIcon, name: "GPT-4o Premium", sub: "Razonamiento avanzado", price: "+$0.02", detail: "/ conversación", color: "#C400FF" },
  ],
  sudamerica: [
    { Icon: MicIcon, name: "Voice Bridge", sub: "Spark / Core", price: "5,6 UF/mes", detail: "incluye minutos base", color: "#2D00FF" },
    { Icon: ChannelIcon, name: "Canal adicional", sub: "Solo plan Spark", price: "1,5 UF/mes", detail: "por canal extra", color: "#5B00E8" },
    { Icon: DatabaseIcon, name: "Base RAG adicional", sub: "Docs propios", price: "2,6 UF/mes", detail: "por base", color: "#8E00FF" },
    { Icon: ChatIcon, name: "Pack conversaciones", sub: "Prepago flexible", price: "1,9 UF", detail: "/ 1,000 conv", color: "#A400FF" },
    { Icon: BrainIcon, name: "GPT-4o Premium", sub: "Razonamiento avanzado", price: "0,0016 UF", detail: "/ conversación", color: "#C400FF" },
  ],
};

// ── Region Badge (read-only, no toggle) ───────────────────────────────────
const RegionBadge = ({
  region,
  countryName,
  loading,
  isDark,
  textFaint,
}: {
  region: GeoRegion;
  countryName: string | null;
  loading: boolean;
  isDark: boolean;
  textFaint: string;
}) => {
  const regionMeta: Record<GeoRegion, { label: string; badge: string | null; badgeColor: string }> = {
    global: { label: "Precios globales USD", badge: null, badgeColor: "" },
    guatemala: {
      label: "Precios Centroamérica & Caribe",
      badge: "✦ REGIÓN LATAM · USD",
      badgeColor: "#2D00FF",
    },
    sudamerica: {
      label: "Precios Sudamérica",
      badge: "✦ PRECIOS EN UF",
      badgeColor: "#22c55e",
    },
  };

  const meta = regionMeta[region];

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      flexWrap: "wrap",
      marginTop: "6px",
    }}>
      {/* Location pill */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 13px",
        borderRadius: "100px",
        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(13,13,26,0.04)",
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(13,13,26,0.1)",
        fontFamily: "'Urbanist', sans-serif",
        fontSize: "12px",
        color: textFaint,
      }}>
        <span>📍</span>
        <span>
          {loading
            ? "Detectando ubicación…"
            : countryName
              ? `${countryName} · ${meta.label}`
              : meta.label}
        </span>
      </div>

      {/* Region highlight badge */}
      {!loading && meta.badge && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "4px 12px",
          borderRadius: "100px",
          background: region === "sudamerica"
            ? (isDark ? "rgba(34,197,94,0.12)" : "rgba(34,197,94,0.1)")
            : (isDark ? "rgba(45,0,255,0.14)" : "rgba(45,0,255,0.08)"),
          border: region === "sudamerica"
            ? "1px solid rgba(34,197,94,0.35)"
            : "1px solid rgba(45,0,255,0.3)",
          fontFamily: "'Urbanist', sans-serif",
          fontWeight: 700,
          fontSize: "11px",
          color: meta.badgeColor,
          letterSpacing: "0.05em",
        }}>
          {meta.badge}
        </div>
      )}
    </div>
  );
};

// ── Setup Fee Block (shown above plans) ────────────────────────────────────
const SetupFeeBlock = ({
  region,
  isDark,
  textMain,
  text,
  textFaint,
  isMobile,
}: {
  region: GeoRegion;
  isDark: boolean;
  textMain: string;
  text: string;
  textFaint: string;
  isMobile: boolean;
}) => {
  const fee = setupFeeByRegion[region];
  const isUF = fee.currency === "UF";

  return (
    <div style={{
      borderRadius: "20px",
      marginBottom: "20px",
      padding: isMobile ? "18px 20px" : "20px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "14px",
      background: isDark
        ? "linear-gradient(135deg, rgba(45,0,255,0.12) 0%, rgba(196,0,255,0.08) 100%)"
        : "linear-gradient(135deg, rgba(45,0,255,0.06) 0%, rgba(196,0,255,0.04) 100%)",
      border: isDark
        ? "1px solid rgba(142,0,255,0.25)"
        : "1px solid rgba(45,0,255,0.18)",
      backdropFilter: "blur(16px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background shimmer */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "200px", height: "100%",
        background: isUF
          ? "linear-gradient(135deg, transparent, rgba(34,197,94,0.06))"
          : "linear-gradient(135deg, transparent, rgba(45,0,255,0.08))",
        pointerEvents: "none",
      }} />

      {/* Left: icon + text */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative", zIndex: 1 }}>
        {/* Icon */}
        <div style={{
          width: isMobile ? "40px" : "48px",
          height: isMobile ? "40px" : "48px",
          borderRadius: "14px",
          flexShrink: 0,
          background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          boxShadow: "0 0 20px rgba(142,0,255,0.35)",
        }}>
          <SparklesIcon />
        </div>
        <div>
          {/* Label */}
          <div style={{
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#8E00FF",
            marginBottom: "3px",
          }}>
            SetUp Fee
          </div>
          {/* Title */}
          <div style={{
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 800,
            fontSize: isMobile ? "15px" : "17px",
            color: textMain,
            lineHeight: 1.2,
          }}>
            Onboarding Prometheus
          </div>
          {/* Description */}
          <div style={{
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            color: textFaint,
            marginTop: "2px",
          }}>
            Configuración asistida · Implementación en 1–2 semanas · Pago único al inicio
          </div>
        </div>
      </div>

      {/* Right: price */}
      <div style={{
        textAlign: "right",
        flexShrink: 0,
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          fontFamily: "'Urbanist', sans-serif",
          fontWeight: 900,
          fontSize: isMobile ? "26px" : "32px",
          lineHeight: 1.05,
          backgroundImage: isUF
            ? "linear-gradient(135deg, #22c55e, #16a34a)"
            : "linear-gradient(135deg, #2D00FF, #8E00FF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {fee.price}
        </div>
        <div style={{
          fontFamily: "'Urbanist', sans-serif",
          fontWeight: 500,
          fontSize: "12px",
          color: textFaint,
          marginTop: "2px",
        }}>
          {fee.detail}
        </div>
        {isUF && (
          <div style={{
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 600,
            fontSize: "11px",
            color: "#22c55e",
            marginTop: "3px",
            opacity: 0.85,
          }}>
            Unidad de Fomento (CLP)
          </div>
        )}
      </div>
    </div>
  );
};

// ── Mobile Accordion Plan Card ─────────────────────────────────────────────
const MobilePlanCard = ({
  plan, isOpen, onToggle, isDark, textMain, text, textFaint, cardBg, cardBorder
}: {
  plan: Plan; isOpen: boolean; onToggle: () => void;
  isDark: boolean; textMain: string; text: string; textFaint: string;
  cardBg: string; cardBorder: string;
}) => {
  return (
    <div style={{
      borderRadius: "20px",
      background: plan.highlighted
        ? isDark
          ? "linear-gradient(160deg, rgba(45,0,255,0.2) 0%, rgba(142,0,255,0.15) 100%)"
          : "linear-gradient(160deg, rgba(45,0,255,0.08) 0%, rgba(142,0,255,0.06) 100%)"
        : cardBg,
      border: plan.highlighted ? "1.5px solid rgba(142,0,255,0.5)" : `1px solid ${cardBorder}`,
      overflow: "hidden",
      boxShadow: plan.highlighted
        ? isDark ? "0 0 40px rgba(142,0,255,0.15)" : "0 8px 40px rgba(45,0,255,0.1)"
        : "none",
      backdropFilter: "blur(16px)",
      position: "relative",
      transition: "box-shadow 0.3s ease",
    }}>
      {plan.label && (
        <div style={{
          background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
          padding: "6px 0", textAlign: "center",
          fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
          fontSize: "11px", color: "white", letterSpacing: "0.08em",
        }}>✦ RECOMENDADO</div>
      )}
      <button
        onClick={onToggle}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "18px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "12px", flexShrink: 0,
            background: `${plan.color}18`,
            border: `1.5px solid ${plan.color}50`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: "10px", height: "10px", borderRadius: "50%",
              background: plan.color, boxShadow: `0 0 8px ${plan.color}80`,
            }} />
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{
              fontFamily: "'Urbanist', sans-serif", fontWeight: 800,
              fontSize: "11px", color: plan.color,
              letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px",
            }}>{plan.name}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span style={{
                fontFamily: "'Urbanist', sans-serif", fontWeight: 900,
                fontSize: plan.id === "enterprise" ? "18px" : "22px",
                color: textMain,
              }}>{plan.price}</span>
              <span style={{
                fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
                fontSize: "12px", color: textFaint,
              }}>{plan.period}</span>
            </div>
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          color: isDark ? "rgba(255,255,255,0.5)" : "rgba(13,13,26,0.4)",
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 500, fontSize: "12px",
            color: isDark ? "rgba(255,255,255,0.4)" : "rgba(13,13,26,0.35)",
          }}>{isOpen ? "Ocultar" : "Ver plan"}</span>
          <ChevronIcon open={isOpen} />
        </div>
      </button>

      <div style={{
        maxHeight: isOpen ? "800px" : "0",
        overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{
            height: "1px", marginBottom: "16px",
            background: isDark
              ? "linear-gradient(to right, rgba(255,255,255,0.08), transparent)"
              : "linear-gradient(to right, rgba(45,0,255,0.12), transparent)",
          }} />
          <p style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
            fontSize: "14px", color: text, lineHeight: 1.55, margin: "0 0 16px",
          }}>{plan.desc}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            {plan.features.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <CheckIcon color={plan.color} />
                <span style={{
                  fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
                  fontSize: "14px", color: text, lineHeight: 1.45,
                }}>{f}</span>
              </div>
            ))}
          </div>
          <a href="#contacto-general" style={{ textDecoration: "none", width: "100%" }}>
            <button style={{
              width: "100%",
              background: plan.highlighted ? "linear-gradient(135deg, #2D00FF, #8E00FF)" : "transparent",
              color: plan.highlighted ? "white" : plan.color,
              border: plan.highlighted ? "none" : `1.5px solid ${plan.color}60`,
              borderRadius: "12px", padding: "14px 20px",
              fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
              fontSize: "15px", cursor: "pointer",
              boxShadow: plan.highlighted ? "0 0 28px rgba(142,0,255,0.4)" : "none",
            }}>
              {plan.cta} →
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

// ── Mobile Addon Item ──────────────────────────────────────────────────────
const MobileAddonItem = ({
  addon, isDark, textMain, textFaint,
}: {
  addon: Addon; isDark: boolean; textMain: string; textFaint: string;
}) => {
  const { Icon } = addon;
  return (
    <div style={{
      borderRadius: "14px",
      background: isDark ? "rgba(13,13,26,0.6)" : "rgba(255,255,255,0.95)",
      border: isDark ? `1px solid ${addon.color}25` : `1px solid ${addon.color}20`,
      padding: "14px 16px",
      display: "flex", alignItems: "center", gap: "12px",
      backdropFilter: "blur(16px)",
    }}>
      <div style={{
        width: "40px", height: "40px", borderRadius: "11px", flexShrink: 0,
        background: isDark ? `${addon.color}20` : `${addon.color}10`,
        border: `1px solid ${addon.color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: addon.color,
        boxShadow: isDark ? `0 0 12px ${addon.color}20` : "none",
      }}>
        <Icon />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
          fontSize: "13px", color: textMain,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{addon.name}</div>
        <div style={{
          fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
          fontSize: "11px", color: textFaint, marginTop: "1px",
        }}>{addon.sub}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{
          fontFamily: "'Urbanist', sans-serif", fontWeight: 800, fontSize: "15px",
          backgroundImage: `linear-gradient(135deg, ${addon.color}, #8E00FF)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>{addon.price}</div>
        <div style={{
          fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
          fontSize: "10px", color: textFaint,
        }}>{addon.detail}</div>
      </div>
    </div>
  );
};

// ── Main Export ────────────────────────────────────────────────────────────
export const LumenPricing = () => {
  const { isDark } = useTheme();
  const { isMobile, isTablet } = useBreakpoint();
  const { region, countryName, loading } = useGeoRegion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState<string>("scale");
  const [addonsOpen, setAddonsOpen] = useState(false);

  const plans = plansByRegion[region];
  const activeAddons = addonsByRegion[region];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const text = isDark ? "rgba(255,255,255,0.78)" : "rgba(13,13,26,0.87)";
  const textFaint = isDark ? "rgba(255,255,255,0.42)" : "rgba(13,13,26,0.57)";
  const textMain = isDark ? "#FFFFFF" : "#0D0D1A";
  const cardBg = isDark ? "rgba(13,13,26,0.6)" : "rgba(255,255,255,0.95)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(45,0,255,0.12)";

  const planCols = isTablet ? "1fr 1fr" : "repeat(4, 1fr)";
  const addonCols = isTablet ? "1fr 1fr" : "repeat(3, 1fr)";
  const px = isMobile ? "16px" : isTablet ? "32px" : "64px";

  const footnoteByRegion: Record<GeoRegion, string> = {
    global: "Precios en USD · Facturación mensual · Contrato anual con 15% de descuento · Vigentes a mayo 2026",
    guatemala: "Precios en USD · Facturación mensual · Contrato anual con 15% de descuento · Vigentes a mayo 2026",
    sudamerica: "Precios en UF (Unidad de Fomento) · Facturación mensual · Contrato anual con 15% de descuento · Vigentes a mayo 2026",
  };

  return (
    <section ref={sectionRef} id="precios" style={{
      padding: `${isMobile ? "40px" : "80px"} ${px}`,
      position: "relative", overflow: "hidden",
    }}>
      {/* Glow */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "500px",
        background: isDark
          ? "radial-gradient(ellipse, rgba(45,0,255,0.1) 0%, transparent 70%)"
          : "radial-gradient(ellipse, rgba(45,0,255,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Section header ── */}
        <div style={{
          textAlign: "center", marginBottom: isMobile ? "24px" : "36px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: isDark ? "rgba(45,0,255,0.1)" : "rgba(45,0,255,0.07)",
            border: "1px solid rgba(45,0,255,0.3)",
            borderRadius: "100px", padding: "7px 18px", marginBottom: "14px",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L9 5.5H13.5L10 8.5L11.5 13L7 10.5L2.5 13L4 8.5L0.5 5.5H5L7 1Z" fill="#2D00FF" />
            </svg>
            <span style={{
              fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
              fontSize: "13px", color: isDark ? "rgba(255,255,255,0.96)" : "#2D00FF",
              letterSpacing: "0.05em",
            }}>PLANES Y PRECIOS</span>
          </div>
          <h2 style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 800,
            fontSize: isMobile ? "26px" : "clamp(32px, 4vw, 52px)",
            color: textMain, margin: "0 0 10px", lineHeight: 1.15,
          }}>
            Empieza en 1–2 semanas.{" "}
            <span style={{
              backgroundImage: "linear-gradient(135deg, #2D00FF, #8E00FF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Escala sin límites.</span>
          </h2>
          <p style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
            fontSize: isMobile ? "14px" : "17px", color: text,
            maxWidth: "540px", margin: "0 auto 14px", lineHeight: 1.6,
          }}>
            Facturación mensual · Descuento 15% anual
            {region === "sudamerica" ? " · Precios en UF" : " · Precios en USD"}
          </p>

          {/* Region badge (read-only) */}
          <RegionBadge
            region={region}
            countryName={countryName}
            loading={loading}
            isDark={isDark}
            textFaint={textFaint}
          />
        </div>

        {/* ═══════════════════════════════════════════
            SETUP FEE BLOCK — above plans
        ═══════════════════════════════════════════ */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s",
        }}>
          {!loading && (
            <SetupFeeBlock
              region={region}
              isDark={isDark}
              textMain={textMain}
              text={text}
              textFaint={textFaint}
              isMobile={isMobile}
            />
          )}
        </div>

        {/* ═══════════════════════════════════════════
            MOBILE PLANS — Accordion
        ═══════════════════════════════════════════ */}
        {isMobile ? (
          <div style={{
            display: "flex", flexDirection: "column", gap: "10px",
            marginBottom: "24px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            {plans.map((plan) => (
              <MobilePlanCard
                key={plan.id}
                plan={plan}
                isOpen={expandedPlan === plan.id}
                onToggle={() => setExpandedPlan(expandedPlan === plan.id ? "" : plan.id)}
                isDark={isDark}
                textMain={textMain} text={text} textFaint={textFaint}
                cardBg={cardBg} cardBorder={cardBorder}
              />
            ))}
          </div>
        ) : (
          /* ═════════════════════════════════════════
             TABLET / DESKTOP PLANS — Grid
          ═════════════════════════════════════════ */
          <div style={{
            display: "grid", gridTemplateColumns: planCols,
            gap: "16px", marginBottom: "28px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            {plans.map((plan) => (
              <div key={plan.id} style={{
                borderRadius: "24px",
                background: plan.highlighted
                  ? isDark
                    ? "linear-gradient(160deg, rgba(45,0,255,0.18) 0%, rgba(142,0,255,0.14) 100%)"
                    : "linear-gradient(160deg, rgba(45,0,255,0.07) 0%, rgba(142,0,255,0.05) 100%)"
                  : cardBg,
                border: plan.highlighted ? "1.5px solid rgba(142,0,255,0.5)" : `1px solid ${cardBorder}`,
                padding: "32px 26px",
                display: "flex", flexDirection: "column", position: "relative",
                boxShadow: plan.highlighted
                  ? isDark
                    ? "0 0 0 1px rgba(142,0,255,0.2), 0 30px 80px rgba(142,0,255,0.12)"
                    : "0 0 0 1px rgba(142,0,255,0.15), 0 20px 60px rgba(45,0,255,0.08)"
                  : "none",
                backdropFilter: "blur(16px)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                {plan.label && (
                  <div style={{
                    position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                    borderRadius: "100px", padding: "5px 14px",
                    fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                    fontSize: "11px", color: "white", letterSpacing: "0.06em",
                    whiteSpace: "nowrap", boxShadow: "0 0 20px rgba(142,0,255,0.5)",
                  }}>✦ RECOMENDADO</div>
                )}
                <div style={{
                  fontFamily: "'Urbanist', sans-serif", fontWeight: 800, fontSize: "12px",
                  color: plan.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px",
                }}>{plan.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "4px" }}>
                  <span style={{
                    fontFamily: "'Urbanist', sans-serif", fontWeight: 900,
                    fontSize: plan.id === "enterprise" ? "22px" : "30px",
                    color: textMain, lineHeight: 1.1,
                  }}>{plan.price}</span>
                  <span style={{
                    fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
                    fontSize: "12px", color: textFaint,
                  }}>{plan.period}</span>
                </div>
                <p style={{
                  fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
                  fontSize: "13px", color: text, lineHeight: 1.55, margin: "0 0 18px",
                }}>{plan.desc}</p>
                <div style={{
                  height: "1px", marginBottom: "16px",
                  background: isDark
                    ? "linear-gradient(to right, rgba(255,255,255,0.08), transparent)"
                    : "linear-gradient(to right, rgba(45,0,255,0.12), transparent)",
                }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", flex: 1 }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <CheckIcon color={plan.color} />
                      <span style={{
                        fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
                        fontSize: "13px", color: text, lineHeight: 1.45,
                      }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="#contacto-general" style={{ textDecoration: "none", marginTop: "22px", display: "block" }}>
                  <button style={{
                    width: "100%",
                    background: plan.highlighted ? "linear-gradient(135deg, #2D00FF, #8E00FF)" : "transparent",
                    color: plan.highlighted ? "white" : plan.color,
                    border: plan.highlighted ? "none" : `1.5px solid ${plan.color}55`,
                    borderRadius: "12px", padding: "12px 20px",
                    fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                    fontSize: "14px", cursor: "pointer",
                    boxShadow: plan.highlighted ? "0 0 24px rgba(142,0,255,0.35)" : "none",
                    transition: "all 0.2s ease",
                  }}
                    onMouseEnter={(e) => {
                      if (!plan.highlighted) (e.currentTarget as HTMLElement).style.background = `${plan.color}12`;
                      else (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(142,0,255,0.55)";
                    }}
                    onMouseLeave={(e) => {
                      if (!plan.highlighted) (e.currentTarget as HTMLElement).style.background = "transparent";
                      else (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(142,0,255,0.35)";
                    }}
                  >{plan.cta}</button>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* ═══════════════════════════════════════════
            ADD-ONS SECTION
        ═══════════════════════════════════════════ */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
        }}>
          {isMobile ? (
            /* Mobile: collapsible section */
            <div style={{
              borderRadius: "18px",
              background: isDark ? "rgba(13,13,26,0.5)" : "rgba(255,255,255,0.9)",
              border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(45,0,255,0.1)",
              overflow: "hidden",
              backdropFilter: "blur(16px)",
            }}>
              <button
                onClick={() => setAddonsOpen(!addonsOpen)}
                style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  padding: "16px 18px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "30px", height: "30px",
                    background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                    borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                    fontSize: "15px", color: textMain,
                  }}>Add-ons disponibles</span>
                  <span style={{
                    background: isDark ? "rgba(45,0,255,0.2)" : "rgba(45,0,255,0.1)",
                    color: "#2D00FF", borderRadius: "100px", padding: "2px 8px",
                    fontFamily: "'Urbanist', sans-serif", fontWeight: 700, fontSize: "11px",
                  }}>{activeAddons.length}</span>
                </div>
                <ChevronIcon open={addonsOpen} />
              </button>
              <div style={{
                maxHeight: addonsOpen ? "1000px" : "0",
                overflow: "hidden",
                transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}>
                <div style={{ padding: "0 14px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {activeAddons.map((addon) => (
                    <MobileAddonItem
                      key={addon.name}
                      addon={addon}
                      isDark={isDark}
                      textMain={textMain}
                      textFaint={textFaint}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Tablet / Desktop add-ons */
            <>
              <div style={{
                display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", flexWrap: "wrap",
              }}>
                <div style={{
                  width: "28px", height: "28px",
                  background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                  borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <span style={{
                  fontFamily: "'Urbanist', sans-serif", fontWeight: 700, fontSize: "16px", color: textMain,
                }}>Add-ons disponibles</span>
                <span style={{
                  fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: "13px", color: textFaint,
                }}>— Amplía cualquier plan con lo que necesitas</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: addonCols, gap: "12px" }}>
                {activeAddons.map((addon) => {
                  const { Icon } = addon;
                  return (
                    <div key={addon.name} style={{
                      borderRadius: "16px",
                      background: isDark ? "rgba(13,13,26,0.55)" : "rgba(255,255,255,0.95)",
                      border: isDark ? `1px solid ${addon.color}22` : `1px solid ${addon.color}20`,
                      padding: "18px 20px",
                      display: "flex", alignItems: "flex-start", gap: "14px",
                      backdropFilter: "blur(16px)", position: "relative", overflow: "hidden",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                    }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "translateY(-3px)";
                        el.style.borderColor = `${addon.color}50`;
                        el.style.boxShadow = isDark
                          ? `0 12px 36px rgba(0,0,0,0.3), 0 0 0 1px ${addon.color}30`
                          : `0 8px 28px rgba(45,0,255,0.09), 0 0 0 1px ${addon.color}25`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "translateY(0)";
                        el.style.borderColor = isDark ? `${addon.color}22` : `${addon.color}20`;
                        el.style.boxShadow = "none";
                      }}
                    >
                      <div style={{
                        position: "absolute", top: 0, left: 0, width: "90px", height: "100%",
                        background: `linear-gradient(135deg, ${addon.color}18, transparent)`,
                        opacity: isDark ? 1 : 0.5, pointerEvents: "none",
                      }} />
                      <div style={{
                        width: "42px", height: "42px", borderRadius: "12px",
                        background: isDark ? `${addon.color}20` : `${addon.color}10`,
                        border: `1px solid ${addon.color}35`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: addon.color, flexShrink: 0, position: "relative", zIndex: 1,
                        boxShadow: isDark ? `0 0 14px ${addon.color}25` : "none",
                      }}><Icon /></div>
                      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                        <div style={{
                          fontFamily: "'Urbanist', sans-serif", fontWeight: 700,
                          fontSize: "14px", color: textMain, marginBottom: "2px",
                        }}>{addon.name}</div>
                        <div style={{
                          fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
                          fontSize: "12px", color: textFaint, marginBottom: "8px",
                        }}>{addon.sub}</div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                          <span style={{
                            fontFamily: "'Urbanist', sans-serif", fontWeight: 800, fontSize: "18px",
                            backgroundImage: `linear-gradient(135deg, ${addon.color}, #8E00FF)`,
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                          }}>{addon.price}</span>
                          <span style={{
                            fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
                            fontSize: "11px", color: textFaint,
                          }}>{addon.detail}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footnote */}
        <p style={{
          fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
          fontSize: "12px", color: textFaint,
          textAlign: "center", marginTop: "16px",
          opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.5s",
        }}>
          {footnoteByRegion[region]}
        </p>
      </div>
    </section>
  );
};
