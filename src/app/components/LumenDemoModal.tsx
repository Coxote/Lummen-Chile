import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCheck, Send, Zap, ChevronRight, MoreVertical } from "lucide-react";

/* ─── Channel Icons ────────────────────────────────────────────── */
const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.09-1.34A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.72 0-3.32-.49-4.67-1.33l-.33-.2-3.02.79.81-2.95-.22-.35A8 8 0 1 1 12 20z" fill="currentColor"/>
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
  </svg>
);

const TelegramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" fill="currentColor"/>
  </svg>
);

const EmailIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const SMSIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 4h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6l-4 4V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="8" cy="11" r="1" fill="currentColor"/>
    <circle cx="12" cy="11" r="1" fill="currentColor"/>
    <circle cx="16" cy="11" r="1" fill="currentColor"/>
  </svg>
);

/* ─── Types ─────────────────────────────────────────────────────── */
type Channel = "whatsapp" | "instagram" | "telegram" | "email" | "sms";

interface ConversationItem {
  id: number;
  name: string;
  preview: string;
  time: string;
  channel: Channel;
  unread: number;
  avatar: string;
}

interface Message {
  id: number;
  role: "customer" | "agent";
  text: string;
  time: string;
}

/* ─── Data ──────────────────────────────────────────────────────── */
const CHANNEL_CONFIG: Record<Channel, { color: string; label: string; Icon: React.FC<{ size?: number }> }> = {
  whatsapp:  { color: "#25D366", label: "WhatsApp",  Icon: WhatsAppIcon  },
  instagram: { color: "#E1306C", label: "Instagram", Icon: InstagramIcon },
  telegram:  { color: "#0088CC", label: "Telegram",  Icon: TelegramIcon  },
  email:     { color: "#4285F4", label: "Email",     Icon: EmailIcon     },
  sms:       { color: "#FF6B35", label: "SMS",       Icon: SMSIcon       },
};

const CONVERSATIONS: ConversationItem[] = [
  { id: 1, name: "María García",    preview: "¿Puedo cambiar la dirección?",      time: "Ahora",   channel: "whatsapp",  unread: 2, avatar: "MG" },
  { id: 2, name: "Carlos Mendez",   preview: "Vi tu promo en stories 🔥",         time: "2 min",   channel: "instagram", unread: 1, avatar: "CM" },
  { id: 3, name: "Ana Torres",      preview: "Confirma tu cita del lunes",        time: "5 min",   channel: "telegram",  unread: 0, avatar: "AT" },
  { id: 4, name: "ops@techco.mx",   preview: "Re: Factura #2034 adjunta",         time: "12 min",  channel: "email",     unread: 0, avatar: "TC" },
  { id: 5, name: "+52 55 1234 5678",preview: "Código de verificación: 8821",      time: "18 min",  channel: "sms",       unread: 0, avatar: "+" },
];

const MESSAGE_SEQUENCE: (Message | "typing")[] = [
  { id: 1, role: "customer", text: "Hola! Quisiera saber el estado de mi pedido #4521 🙏", time: "14:22" },
  "typing",
  { id: 2, role: "agent",    text: "¡Hola María! 👋 Tu pedido #4521 está en camino 🚚 Llegará el 18 de marzo entre 10am y 2pm.", time: "14:22" },
  "typing",
  { id: 3, role: "agent",    text: "Te enviaré el link de rastreo en un momento.", time: "14:22" },
  { id: 4, role: "customer", text: "Gracias! Y puedo cambiarlo de dirección todavía?", time: "14:23" },
  "typing",
  { id: 5, role: "agent",    text: "Por supuesto ✅ Aún tienes 2 horas para modificarlo. ¿A qué dirección te gustaría redirigir el envío?", time: "14:23" },
];

/* ─── Sub-components ────────────────────────────────────────────── */
const ChannelBadge = ({ channel, size = 16 }: { channel: Channel; size?: number }) => {
  const { color, Icon } = CHANNEL_CONFIG[channel];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size + 8,
        height: size + 8,
        borderRadius: "50%",
        background: `${color}22`,
        color,
        flexShrink: 0,
      }}
    >
      <Icon size={size} />
    </span>
  );
};

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 6 }}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "10px 14px",
      background: "rgba(255,255,255,0.06)",
      borderRadius: "16px 16px 16px 4px",
      width: "fit-content",
    }}
  >
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
          display: "block",
        }}
      />
    ))}
  </motion.div>
);

/* ─── Main Modal ─────────────────────────────────────────────────── */
interface LumenDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LumenDemoModal = ({ isOpen, onClose }: LumenDemoModalProps) => {
  const [activeConv, setActiveConv] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [seqIndex, setSeqIndex] = useState(0);
  const [unreadMap, setUnreadMap] = useState<Record<number, number>>({ 1: 2, 2: 1 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Reset & start animation when modal opens */
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setShowTyping(false);
      setSeqIndex(0);
      return;
    }
    setMessages([]);
    setShowTyping(false);
    setSeqIndex(0);
  }, [isOpen]);

  /* Step through message sequence */
  useEffect(() => {
    if (!isOpen || seqIndex >= MESSAGE_SEQUENCE.length) return;
    const step = MESSAGE_SEQUENCE[seqIndex];
    if (step === "typing") {
      setShowTyping(true);
      timerRef.current = setTimeout(() => {
        setShowTyping(false);
        setSeqIndex((i) => i + 1);
      }, 1400);
    } else {
      timerRef.current = setTimeout(() => {
        setMessages((prev) => [...prev, step as Message]);
        setSeqIndex((i) => i + 1);
      }, seqIndex === 0 ? 600 : 200);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isOpen, seqIndex]);

  /* Auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showTyping]);

  /* Mark read on select */
  const handleSelectConv = (idx: number, id: number) => {
    setActiveConv(idx);
    setUnreadMap((prev) => ({ ...prev, [id]: 0 }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 300,
              background: "rgba(0,0,0,0.72)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Modal — outer div handles centering, motion.div handles animation */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{
              pointerEvents: "all",
              width: "min(960px, 95vw)",
              height: "min(620px, 90vh)",
              background: "#1A1D29",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* ── Top Bar ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.03)",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 14px rgba(45,0,255,0.5)",
                  }}
                >
                  <Zap size={16} color="white" />
                </div>
                <span style={{ color: "white", fontFamily: "'Urbanist', sans-serif", fontWeight: 700, fontSize: "15px" }}>
                  LUMEN
                </span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                    color: "white",
                    fontSize: "10px",
                    fontFamily: "'Urbanist', sans-serif",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "20px",
                    letterSpacing: "0.05em",
                  }}
                >
                  DEMO INTERACTIVA
                </span>
              </div>

              {/* Live indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: 7, height: 7, borderRadius: "50%", background: "#25D366", display: "block" }}
                  />
                  <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Urbanist', sans-serif", fontSize: "12px" }}>
                    En vivo
                  </span>
                </div>
                <button
                  onClick={onClose}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "none",
                    borderRadius: "8px",
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.6)",
                    transition: "background 0.2s",
                    marginLeft: "8px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ── Body ── */}
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

              {/* ── Sidebar ── */}
              <div
                style={{
                  width: "260px",
                  flexShrink: 0,
                  borderRight: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                {/* Sidebar header */}
                <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span style={{ color: "white", fontFamily: "'Urbanist', sans-serif", fontWeight: 700, fontSize: "13px" }}>
                      Bandeja Unificada
                    </span>
                    <span
                      style={{
                        background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                        color: "white",
                        fontSize: "10px",
                        fontFamily: "'Urbanist', sans-serif",
                        fontWeight: 700,
                        padding: "2px 7px",
                        borderRadius: "10px",
                      }}
                    >
                      {Object.values(unreadMap).reduce((a, b) => a + b, 0)} nuevos
                    </span>
                  </div>
                  {/* Channel filter pills */}
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    {(["whatsapp", "instagram", "telegram", "email", "sms"] as Channel[]).map((ch) => {
                      const { color, Icon } = CHANNEL_CONFIG[ch];
                      return (
                        <span
                          key={ch}
                          title={CHANNEL_CONFIG[ch].label}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 26,
                            height: 26,
                            borderRadius: "8px",
                            background: `${color}18`,
                            color,
                            cursor: "pointer",
                            border: `1px solid ${color}33`,
                          }}
                        >
                          <Icon size={13} />
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Conversation list */}
                <div style={{ flex: 1, overflowY: "auto" }}>
                  {CONVERSATIONS.map((conv, idx) => {
                    const isActive = idx === activeConv;
                    const unread = unreadMap[conv.id] ?? 0;
                    return (
                      <motion.div
                        key={conv.id}
                        onClick={() => handleSelectConv(idx, conv.id)}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 14px",
                          cursor: "pointer",
                          background: isActive ? "rgba(45,0,255,0.12)" : "transparent",
                          borderLeft: isActive ? "2px solid #2D00FF" : "2px solid transparent",
                          transition: "background 0.15s",
                        }}
                      >
                        {/* Avatar */}
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, rgba(45,0,255,0.3), rgba(142,0,255,0.3))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "rgba(255,255,255,0.8)",
                            fontFamily: "'Urbanist', sans-serif",
                            fontWeight: 700,
                            fontSize: "12px",
                            flexShrink: 0,
                          }}
                        >
                          {conv.avatar}
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4px" }}>
                            <span style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {conv.name}
                            </span>
                            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", fontFamily: "'Urbanist', sans-serif", flexShrink: 0 }}>
                              {conv.time}
                            </span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                            <ChannelBadge channel={conv.channel} size={10} />
                            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontFamily: "'Urbanist', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {conv.preview}
                            </span>
                          </div>
                        </div>

                        {/* Unread badge */}
                        {unread > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{
                              background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                              color: "white",
                              fontSize: "10px",
                              fontFamily: "'Urbanist', sans-serif",
                              fontWeight: 700,
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {unread}
                          </motion.span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* ── Chat Main ── */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

                {/* Chat header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 18px",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, rgba(45,0,255,0.3), rgba(142,0,255,0.3))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(255,255,255,0.8)",
                        fontFamily: "'Urbanist', sans-serif",
                        fontWeight: 700,
                        fontSize: "12px",
                      }}
                    >
                      {CONVERSATIONS[activeConv].avatar}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ color: "white", fontFamily: "'Urbanist', sans-serif", fontWeight: 700, fontSize: "14px" }}>
                          {CONVERSATIONS[activeConv].name}
                        </span>
                        <ChannelBadge channel={CONVERSATIONS[activeConv].channel} size={12} />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "1px" }}>
                        <motion.span
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ width: 6, height: 6, borderRadius: "50%", background: "#25D366", display: "block" }}
                        />
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontFamily: "'Urbanist', sans-serif" }}>
                          En línea · vía {CHANNEL_CONFIG[CONVERSATIONS[activeConv].channel].label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {/* AI badge */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        background: "rgba(45,0,255,0.12)",
                        border: "1px solid rgba(45,0,255,0.3)",
                        borderRadius: "8px",
                        padding: "4px 10px",
                      }}
                    >
                      <Zap size={11} color="#8E00FF" />
                      <span style={{ color: "#8E00FF", fontSize: "11px", fontFamily: "'Urbanist', sans-serif", fontWeight: 700 }}>
                        LUMEN AI activo
                      </span>
                    </div>
                    <MoreVertical size={16} color="rgba(255,255,255,0.3)" style={{ cursor: "pointer" }} />
                  </div>
                </div>

                {/* Messages area */}
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "16px 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {/* Date chip */}
                  <div style={{ textAlign: "center", marginBottom: "4px" }}>
                    <span
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.35)",
                        fontSize: "10px",
                        fontFamily: "'Urbanist', sans-serif",
                        padding: "3px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      Hoy · 14:22
                    </span>
                  </div>

                  {activeConv === 0 ? (
                    <>
                      <AnimatePresence>
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 280, damping: 22 }}
                            style={{
                              display: "flex",
                              justifyContent: msg.role === "customer" ? "flex-start" : "flex-end",
                            }}
                          >
                            <div style={{ maxWidth: "72%", display: "flex", flexDirection: "column", gap: "3px", alignItems: msg.role === "customer" ? "flex-start" : "flex-end" }}>
                              {msg.role === "agent" && (
                                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "2px" }}>
                                  <Zap size={10} color="#8E00FF" />
                                  <span style={{ color: "#8E00FF", fontSize: "10px", fontFamily: "'Urbanist', sans-serif", fontWeight: 700 }}>
                                    LUMEN AI
                                  </span>
                                </div>
                              )}
                              <div
                                style={{
                                  padding: "9px 13px",
                                  borderRadius: msg.role === "customer"
                                    ? "16px 16px 16px 4px"
                                    : "16px 16px 4px 16px",
                                  background: msg.role === "customer"
                                    ? "rgba(255,255,255,0.07)"
                                    : "linear-gradient(135deg, rgba(45,0,255,0.35), rgba(142,0,255,0.35))",
                                  border: msg.role === "agent" ? "1px solid rgba(142,0,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                                  color: "rgba(255,255,255,0.9)",
                                  fontSize: "13px",
                                  fontFamily: "'Urbanist', sans-serif",
                                  lineHeight: 1.5,
                                }}
                              >
                                {msg.text}
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px", fontFamily: "'Urbanist', sans-serif" }}>
                                  {msg.time}
                                </span>
                                {msg.role === "agent" && <CheckCheck size={11} color="#2D00FF" />}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      <AnimatePresence>
                        {showTyping && (
                          <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <Zap size={10} color="#8E00FF" />
                                <span style={{ color: "#8E00FF", fontSize: "10px", fontFamily: "'Urbanist', sans-serif", fontWeight: 700 }}>
                                  LUMEN AI
                                </span>
                              </div>
                              <TypingIndicator />
                            </div>
                          </div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", paddingTop: "40px" }}>
                      <ChannelBadge channel={CONVERSATIONS[activeConv].channel} size={28} />
                      <span style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Urbanist', sans-serif", fontSize: "13px" }}>
                        Conversación vía {CHANNEL_CONFIG[CONVERSATIONS[activeConv].channel].label}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "11px", fontFamily: "'Urbanist', sans-serif" }}>
                        LUMEN unifica todos tus canales aquí
                      </span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input bar */}
                <div
                  style={{
                    padding: "12px 18px",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      padding: "9px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Zap size={13} color="#8E00FF" />
                    <span style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Urbanist', sans-serif", fontSize: "13px" }}>
                      LUMEN AI está respondiendo automáticamente…
                    </span>
                  </div>
                  <button
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 16px rgba(45,0,255,0.4)",
                    }}
                  >
                    <Send size={14} color="white" />
                  </button>
                </div>
              </div>

              {/* ── Right Panel ── */}
              <div
                style={{
                  width: "200px",
                  flexShrink: 0,
                  borderLeft: "1px solid #ffffff14",
                  display: "flex",
                  flexDirection: "column",
                  padding: "14px",
                  gap: "16px",
                  overflowY: "auto",
                  backgroundColor: "#00000026",
                }}
              >
                {/* Customer info */}
                <div>
                  <span style={{ color: "#ffffff4d", fontSize: "10px", fontFamily: "'Urbanist', sans-serif", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Cliente
                  </span>
                  <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ color: "#ffffffd9", fontFamily: "'Urbanist', sans-serif", fontWeight: 700, fontSize: "13px" }}>
                      {CONVERSATIONS[activeConv].name}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <ChannelBadge channel={CONVERSATIONS[activeConv].channel} size={11} />
                      <span style={{ color: "#ffffff59", fontSize: "11px", fontFamily: "'Urbanist', sans-serif" }}>
                        {CHANNEL_CONFIG[CONVERSATIONS[activeConv].channel].label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ color: "#ffffff4d", fontSize: "10px", fontFamily: "'Urbanist', sans-serif", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Sesión actual
                  </span>
                  {[
                    { label: "Tiempo respuesta", value: "1.2 s" },
                    { label: "Mensajes IA", value: "3 / 3" },
                    { label: "Resolución", value: "Automática" },
                    { label: "CSAT estimado", value: "⭐ 4.9" },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ color: "#ffffff47", fontSize: "10px", fontFamily: "'Urbanist', sans-serif" }}>{label}</span>
                      <span style={{ color: "#ffffffcc", fontFamily: "'Urbanist', sans-serif", fontWeight: 700, fontSize: "12px" }}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Channels active */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ color: "#ffffff4d", fontSize: "10px", fontFamily: "'Urbanist', sans-serif", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Canales activos
                  </span>
                  {(["whatsapp", "instagram", "telegram", "email", "sms"] as Channel[]).map((ch) => {
                    const { color, label, Icon } = CHANNEL_CONFIG[ch];
                    return (
                      <div key={ch} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color, display: "flex" }}><Icon size={12} /></span>
                          <span style={{ color: "#ffffff66", fontSize: "11px", fontFamily: "'Urbanist', sans-serif" }}>{label}</span>
                        </div>
                        <motion.span
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 1.5 }}
                          style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "block" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};