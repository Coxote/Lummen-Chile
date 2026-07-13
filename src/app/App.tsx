import React, { useEffect, useState } from "react";
import lumenLogoDark from "figma:asset/f24b33df11fab8d83fe5139af2d792b715421916.png";
import lumenLogoLight from "figma:asset/835d032a23428a60eb002e20279dec74806ff23b.png";
import { LumenNavbar } from "./components/LumenNavbar";
import { LumenHero } from "./components/LumenHero";
import { LumenCapacidades } from "./components/LumenCapacidades";
import { LumenParallax } from "./components/LumenParallax";
import { LumenPricing } from "./components/LumenPricing";
import { LumenComparativa } from "./components/LumenComparativa";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import { useBreakpoint } from "./hooks/useBreakpoint";
import { GoogleAnalytics } from "./components/GoogleAnalytics";

const GlobalStyles = () => (
  <style>{`
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.3); }
    }
    @keyframes crmpulse {
      0%, 100% { opacity: 1; box-shadow: 0 0 6px #25D366; }
      50% { opacity: 0.7; box-shadow: 0 0 12px #25D366; }
    }
    @keyframes phoneGlow {
      0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(142,0,255,0.2); }
      50% { box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(45,0,255,0.35); }
    }
    @keyframes lumenFloatA {
      0%   { transform: translateY(0px) rotate(0deg); }
      33%  { transform: translateY(-22px) rotate(1.5deg); }
      66%  { transform: translateY(10px) rotate(-1deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    @keyframes lumenFloatB {
      0%   { transform: translateY(0px) rotate(0deg); }
      40%  { transform: translateY(-28px) rotate(-2deg); }
      70%  { transform: translateY(12px) rotate(1.2deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    @keyframes lumenFloatC {
      0%   { transform: translateY(0px) rotate(0deg); }
      30%  { transform: translateY(-18px) rotate(2deg); }
      65%  { transform: translateY(16px) rotate(-1.5deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }

    * { box-sizing: border-box; }

    html, body {
      margin: 0;
      padding: 0;
      scroll-behavior: smooth;
      -webkit-tap-highlight-color: transparent;
      -webkit-text-size-adjust: 100%;
    }

    button {
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }

    a { transition: color 0.2s ease; -webkit-tap-highlight-color: transparent; }

    /* Better mobile scrolling */
    html { scroll-padding-top: 72px; }

    /* Prevent horizontal overflow on mobile */
    body { overflow-x: hidden; }
  `}</style>
);

const SectionDivider = () => {
  const { isDark } = useTheme();
  const { isMobile } = useBreakpoint();
  return (
    <div style={{
      height: "1px",
      margin: isMobile ? "0 20px" : "0 64px",
      background: isDark
        ? "linear-gradient(to right, transparent, rgba(142,0,255,0.2), rgba(45,0,255,0.15), transparent)"
        : "linear-gradient(to right, transparent, rgba(45,0,255,0.1), rgba(0,194,255,0.08), transparent)",
    }} />
  );
};

const LumenHubSpotForm = () => {
  const { isDark } = useTheme();
  const { isMobile, isTablet } = useBreakpoint();
  const [scriptReady, setScriptReady] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const px = isMobile ? "20px" : isTablet ? "32px" : "64px";
  const hubspotStyles: React.CSSProperties = {
    minHeight: "380px",
    ["--hsf-global__font-family" as any]: "'Urbanist', sans-serif",
    ["--hsf-global__color" as any]: isDark ? "rgba(255,255,255,0.88)" : "rgba(13,13,26,0.9)",
    ["--hsf-field-label__color" as any]: isDark ? "rgba(255,255,255,0.82)" : "rgba(13,13,26,0.82)",
    ["--hsf-field-input__color" as any]: isDark ? "#FFFFFF" : "#0D0D1A",
    ["--hsf-field-input__background-color" as any]: isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
    ["--hsf-field-input__border-color" as any]: isDark ? "rgba(255,255,255,0.22)" : "rgba(45,0,255,0.22)",
    ["--hsf-field-input__placeholder-color" as any]: isDark ? "rgba(255,255,255,0.5)" : "rgba(13,13,26,0.45)",
    ["--hsf-field-input__border-radius" as any]: "12px",
    ["--hsf-field-textarea__color" as any]: isDark ? "#FFFFFF" : "#0D0D1A",
    ["--hsf-field-textarea__background-color" as any]: isDark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
    ["--hsf-field-textarea__border-color" as any]: isDark ? "rgba(255,255,255,0.22)" : "rgba(45,0,255,0.22)",
    ["--hsf-field-textarea__placeholder-color" as any]: isDark ? "rgba(255,255,255,0.5)" : "rgba(13,13,26,0.45)",
    ["--hsf-field-textarea__border-radius" as any]: "12px",
    ["--hsf-button__color" as any]: "#FFFFFF",
    ["--hsf-button__background-color" as any]: "#2D00FF",
    ["--hsf-button__border-radius" as any]: "12px",
    ["--hsf-erroralert__color" as any]: "#FF6B6B",
  };

  useEffect(() => {
    const scriptId = "hs-forms-developer-50799369";
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      setScriptReady(true);
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://js.hsforms.net/forms/embed/developer/50799369.js";
    script.defer = true;
    script.onload = () => setScriptReady(true);
    script.onerror = () => setScriptError(true);
    document.body.appendChild(script);
  }, []);

  return (
    <section id="contacto-general" style={{ padding: `20px ${px} 44px`, position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          borderRadius: "24px",
          padding: isMobile ? "24px 18px" : "36px 32px",
          background: isDark ? "rgba(13,13,26,0.62)" : "rgba(255,255,255,0.96)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(45,0,255,0.14)"}`,
          backdropFilter: "blur(20px)",
        }}>
          <div
            className="hs-form-html"
            data-region="na1"
            data-form-id="04f6e5eb-168f-4d09-a034-749551ffb9ac"
            data-portal-id="50799369"
            style={hubspotStyles}
          />
          {!scriptReady && !scriptError && (
            <p style={{ margin: "10px 0 0", fontSize: "12px", opacity: 0.7 }}>Cargando formulario...</p>
          )}
          {scriptError && (
            <p style={{ margin: "10px 0 0", fontSize: "12px", color: "#FF6B6B" }}>
              No se pudo cargar HubSpot. Verifica conexión o bloqueadores de scripts.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

type ContactFormData = {
  nombre: string;
  telefono: string;
  correo: string;
  empresa: string;
  puesto: string;
};

const LumenContactoForm = () => {
  const { isDark } = useTheme();
  const { isMobile, isTablet } = useBreakpoint();
  const isCompact = isMobile || isTablet;

  const [formData, setFormData] = useState<ContactFormData>({
    nombre: "",
    telefono: "",
    correo: "",
    empresa: "",
    puesto: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const puestos = [
    "Gerencia General",
    "Direccion Comercial",
    "Direccion de Marketing",
    "Direccion de Operaciones",
    "Servicio al Cliente",
    "Ventas",
    "TI / Sistemas",
    "Recursos Humanos",
    "E-commerce",
    "Otro",
  ];

  const cardBg = isDark ? "rgba(13,13,26,0.62)" : "rgba(255,255,255,0.96)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(45,0,255,0.14)";
  const textMain = isDark ? "#FFFFFF" : "#0D0D1A";
  const text = isDark ? "rgba(255,255,255,0.75)" : "rgba(13,13,26,0.86)";
  const textFaint = isDark ? "rgba(255,255,255,0.55)" : "rgba(13,13,26,0.58)";
  const inputBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(45,0,255,0.03)";
  const inputBorder = isDark ? "rgba(255,255,255,0.14)" : "rgba(45,0,255,0.18)";
  const errorColor = "#FF6B6B";
  const px = isMobile ? "20px" : isTablet ? "32px" : "64px";
  const hubspotPortalId = "50799369";
  const hubspotFormId = "04f6e5eb-168f-4d09-a034-749551ffb9ac";

  const setField = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.nombre.trim()) nextErrors.nombre = "El nombre es obligatorio.";
    if (!formData.telefono.trim()) nextErrors.telefono = "El telefono es obligatorio.";
    if (!formData.correo.trim()) nextErrors.correo = "El correo es obligatorio.";
    if (!formData.empresa.trim()) nextErrors.empresa = "La empresa es obligatoria.";
    if (!formData.puesto.trim()) nextErrors.puesto = "Selecciona un puesto.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.correo.trim() && !emailRegex.test(formData.correo.trim())) {
      nextErrors.correo = "Ingresa un correo valido.";
    }

    const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
    if (formData.telefono.trim() && !phoneRegex.test(formData.telefono.trim())) {
      nextErrors.telefono = "Ingresa un telefono valido.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      setStatus("error");
      setStatusMessage("Revisa los campos resaltados e intentalo nuevamente.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        fields: [
          { name: "firstname", value: formData.nombre.trim() },
          { name: "phone", value: formData.telefono.trim() },
          { name: "email", value: formData.correo.trim() },
          { name: "company", value: formData.empresa.trim() },
          { name: "jobtitle", value: formData.puesto.trim() },
        ],
        context: {
          pageUri: typeof window !== "undefined" ? window.location.href : "",
          pageName: typeof document !== "undefined" ? document.title : "Landing LUMEN",
        },
      };

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HubSpot submit failed: ${response.status}`);
      }

      setStatus("success");
      setStatusMessage("Gracias. Recibimos tu informacion y te contactaremos pronto.");
      setFormData({ nombre: "", telefono: "", correo: "", empresa: "", puesto: "" });
      setErrors({});
    } catch (_error) {
      setStatus("error");
      setStatusMessage("No pudimos enviar tu solicitud. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Urbanist', sans-serif",
    fontWeight: 600,
    fontSize: "13px",
    color: text,
    marginBottom: "8px",
    display: "block",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: "12px",
    border: `1px solid ${inputBorder}`,
    background: inputBg,
    color: textMain,
    padding: "12px 14px",
    fontFamily: "'Urbanist', sans-serif",
    fontSize: "14px",
    outline: "none",
  };

  return (
    <section id="contacto-general" style={{ padding: `20px ${px} 44px`, position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          borderRadius: "24px",
          padding: isCompact ? "24px 18px" : "36px 32px",
          background: cardBg,
          border: `1px solid ${cardBorder}`,
          backdropFilter: "blur(20px)",
          boxShadow: isDark
            ? "0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "0 20px 60px rgba(45,0,255,0.06)",
        }}>
          <div style={{ marginBottom: "20px" }}>
            <p style={{
              margin: 0,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#8E00FF",
              textTransform: "uppercase",
            }}>Contacto General</p>
            <h3 style={{
              margin: "8px 0 8px",
              fontFamily: "'Urbanist', sans-serif",
              fontSize: isMobile ? "26px" : "34px",
              lineHeight: 1.15,
              fontWeight: 800,
              color: textMain,
            }}>
              Conversemos sobre tu operacion
            </h3>
            <p style={{
              margin: 0,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: isMobile ? "14px" : "16px",
              lineHeight: 1.6,
              color: textFaint,
              maxWidth: "720px",
            }}>
              Dejanos tus datos y nuestro equipo te contactara para evaluar tu caso.
            </p>
          </div>

          <form onSubmit={onSubmit} noValidate>
            <div style={{
              display: "grid",
              gridTemplateColumns: isCompact ? "1fr" : "1fr 1fr",
              gap: "14px",
            }}>
              <div>
                <label style={labelStyle} htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={(event) => setField("nombre", event.target.value)}
                  style={{ ...inputStyle, borderColor: errors.nombre ? errorColor : inputBorder }}
                />
                {errors.nombre && <p style={{ color: errorColor, fontSize: "12px", margin: "6px 0 0" }}>{errors.nombre}</p>}
              </div>

              <div>
                <label style={labelStyle} htmlFor="telefono">Telefono</label>
                <input
                  id="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={(event) => setField("telefono", event.target.value)}
                  style={{ ...inputStyle, borderColor: errors.telefono ? errorColor : inputBorder }}
                />
                {errors.telefono && <p style={{ color: errorColor, fontSize: "12px", margin: "6px 0 0" }}>{errors.telefono}</p>}
              </div>

              <div>
                <label style={labelStyle} htmlFor="correo">Correo</label>
                <input
                  id="correo"
                  type="email"
                  value={formData.correo}
                  onChange={(event) => setField("correo", event.target.value)}
                  style={{ ...inputStyle, borderColor: errors.correo ? errorColor : inputBorder }}
                />
                {errors.correo && <p style={{ color: errorColor, fontSize: "12px", margin: "6px 0 0" }}>{errors.correo}</p>}
              </div>

              <div>
                <label style={labelStyle} htmlFor="empresa">Empresa</label>
                <input
                  id="empresa"
                  type="text"
                  value={formData.empresa}
                  onChange={(event) => setField("empresa", event.target.value)}
                  style={{ ...inputStyle, borderColor: errors.empresa ? errorColor : inputBorder }}
                />
                {errors.empresa && <p style={{ color: errorColor, fontSize: "12px", margin: "6px 0 0" }}>{errors.empresa}</p>}
              </div>

              <div style={{ gridColumn: isCompact ? "auto" : "1 / -1" }}>
                <label style={labelStyle} htmlFor="puesto">Puesto</label>
                <select
                  id="puesto"
                  value={formData.puesto}
                  onChange={(event) => setField("puesto", event.target.value)}
                  style={{ ...inputStyle, borderColor: errors.puesto ? errorColor : inputBorder, cursor: "pointer" }}
                >
                  <option value="" style={{ color: "#0D0D1A", backgroundColor: "#FFFFFF" }}>Selecciona tu puesto</option>
                  {puestos.map((puesto) => (
                    <option key={puesto} value={puesto} style={{ color: "#0D0D1A", backgroundColor: "#FFFFFF" }}>{puesto}</option>
                  ))}
                </select>
                {errors.puesto && <p style={{ color: errorColor, fontSize: "12px", margin: "6px 0 0" }}>{errors.puesto}</p>}
              </div>
            </div>

            <div style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: isCompact ? "column" : "row",
              gap: "12px",
              alignItems: isCompact ? "stretch" : "center",
              justifyContent: "space-between",
            }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  border: "none",
                  borderRadius: "12px",
                  padding: "13px 28px",
                  background: "linear-gradient(135deg, #2D00FF, #8E00FF)",
                  color: "#FFFFFF",
                  fontFamily: "'Urbanist', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.75 : 1,
                }}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>

              {status !== "idle" && (
                <div style={{
                  flex: 1,
                  borderRadius: "10px",
                  padding: "10px 12px",
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "13px",
                  color: isDark ? "rgba(255,255,255,0.92)" : "rgba(13,13,26,0.92)",
                  background: status === "success"
                    ? (isDark ? "rgba(34,197,94,0.16)" : "rgba(34,197,94,0.12)")
                    : (isDark ? "rgba(239,68,68,0.16)" : "rgba(239,68,68,0.12)"),
                  border: `1px solid ${status === "success" ? "rgba(34,197,94,0.45)" : "rgba(239,68,68,0.45)"}`,
                }}>
                  {statusMessage}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const AppInner = () => {
  const { isDark } = useTheme();
  const { isMobile, isTablet } = useBreakpoint();

  const footerBorder = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
  const footerText = isDark ? "rgba(255,255,255,0.42)" : "rgba(13,13,26,0.57)";
  const footerCopy = isDark ? "rgba(255,255,255,0.36)" : "rgba(13,13,26,0.45)";
  const px = isMobile ? "20px" : isTablet ? "32px" : "64px";

  return (
    <>
      <GlobalStyles />
      <LumenParallax />
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-M293BG6J"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      <div style={{
        fontFamily: "'Urbanist', sans-serif",
        color: isDark ? "#FFFFFF" : "#0D0D1A",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
        zIndex: 0,
        background: "transparent",
        transition: "color 0.3s ease",
      }}>
        <LumenNavbar />
        <LumenHero />
        <SectionDivider />
        <LumenCapacidades />
        <SectionDivider />
        <LumenPricing />
        <SectionDivider />
        <LumenComparativa />
        <SectionDivider />
        <LumenHubSpotForm />

        {/* Footer */}
        <footer style={{
          borderTop: `1px solid ${footerBorder}`,
          padding: `32px ${px}`,
          display: "flex",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          flexDirection: isMobile ? "column" : "row",
          gap: "12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              src={isDark ? lumenLogoDark : lumenLogoLight}
              alt="LUMEN"
              style={{ height: "36px", width: "auto", objectFit: "contain" }}
            />
            <span style={{
              fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
              fontSize: "13px", color: footerText,
            }}>
              El Motor Conversacional · Prometheus
            </span>
          </div>
          <p style={{
            fontFamily: "'Urbanist', sans-serif", fontWeight: 400,
            fontSize: "13px", color: footerCopy, margin: 0,
          }}>
            © 2026 LUMEN. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
      <GoogleAnalytics />
    </ThemeProvider>
  );
}
