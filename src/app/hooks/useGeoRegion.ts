import { useState, useEffect } from "react";

export type GeoRegion = "guatemala" | "sudamerica" | "global";

// ── South American ISO codes ───────────────────────────────────────────────
const SA_COUNTRIES = new Set([
  "AR", // Argentina
  "BO", // Bolivia
  "BR", // Brasil
  "CL", // Chile
  "CO", // Colombia
  "EC", // Ecuador
  "GY", // Guyana
  "PE", // Perú
  "PY", // Paraguay
  "SR", // Surinam
  "UY", // Uruguay
  "VE", // Venezuela
]);

// ── Central America + Caribbean (Guatemala region) ─────────────────────────
const LATAM_NON_SA_COUNTRIES = new Set([
  "MX", // México
  "GT", // Guatemala
  "BZ", // Belice
  "SV", // El Salvador
  "HN", // Honduras
  "NI", // Nicaragua
  "CR", // Costa Rica
  "PA", // Panamá
  "CU", // Cuba
  "DO", // República Dominicana
  "PR", // Puerto Rico
  "HT", // Haití
  "JM", // Jamaica
  "TT", // Trinidad y Tobago
  "BB", // Barbados
]);

// ── Country display names ──────────────────────────────────────────────────
const COUNTRY_NAMES: Record<string, string> = {
  GT: "Guatemala", MX: "México", SV: "El Salvador", HN: "Honduras",
  NI: "Nicaragua", CR: "Costa Rica", PA: "Panamá", BZ: "Belice",
  CU: "Cuba", DO: "Rep. Dominicana", PR: "Puerto Rico", HT: "Haití",
  CL: "Chile", AR: "Argentina", CO: "Colombia", PE: "Perú",
  EC: "Ecuador", BO: "Bolivia", UY: "Uruguay", PY: "Paraguay",
  VE: "Venezuela", BR: "Brasil", GY: "Guyana", SR: "Surinam",
  US: "Estados Unidos", CA: "Canadá", GB: "Reino Unido",
  DE: "Alemania", FR: "Francia", ES: "España", IT: "Italia",
};

export interface GeoResult {
  region: GeoRegion;
  countryCode: string | null;
  countryName: string | null;
  loading: boolean;
  error: boolean;
}

// ── URL override for testing: ?region=sudamerica|guatemala|global ──────────
function getUrlRegionOverride(): GeoRegion | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("region");
    if (r === "sudamerica" || r === "guatemala" || r === "global") return r;
  } catch {}
  return null;
}

const OVERRIDE_COUNTRY: Record<GeoRegion, { code: string; name: string }> = {
  sudamerica: { code: "CL", name: "Chile" },
  guatemala:  { code: "GT", name: "Guatemala" },
  global:     { code: "US", name: "Estados Unidos" },
};

export function useGeoRegion(): GeoResult {
  const urlOverride = getUrlRegionOverride();

  const [state, setState] = useState<GeoResult>(() => {
    if (urlOverride) {
      const { code, name } = OVERRIDE_COUNTRY[urlOverride];
      return { region: urlOverride, countryCode: code, countryName: name, loading: false, error: false };
    }
    return { region: "global", countryCode: null, countryName: null, loading: true, error: false };
  });

  useEffect(() => {
    if (urlOverride) return; // skip API call when override is active

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("geo fetch failed");
        return res.json();
      })
      .then((data: { country_code?: string; country_name?: string }) => {
        const code = data.country_code ?? null;

        let region: GeoRegion = "global";
        if (code && SA_COUNTRIES.has(code)) {
          region = "sudamerica";
        } else if (code && LATAM_NON_SA_COUNTRIES.has(code)) {
          region = "guatemala";
        }

        setState({
          region,
          countryCode: code,
          countryName: code ? (COUNTRY_NAMES[code] ?? data.country_name ?? code) : null,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        setState((prev) => ({ ...prev, loading: false, error: true }));
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  return state;
}
