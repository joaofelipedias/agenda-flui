import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TITLE = site.hero.title;
const WORDMARK = "agenda flui";

/** Baixa a Bricolage Grotesque 700 (TTF estático) só com os caracteres usados na imagem. */
async function loadBricolage(text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@96,700&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    const font = await fetch(match[1]);
    return font.ok ? await font.arrayBuffer() : null;
  } catch {
    // Sem rede no build: usa a fonte padrão do ImageResponse.
    return null;
  }
}

export default async function OpengraphImage() {
  const font = await loadBricolage(`${TITLE}${WORDMARK}`);
  const family = font ? "Bricolage Grotesque" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F3F8F6",
          fontFamily: family,
          position: "relative",
        }}
      >
        {/* Bloco brand com bolhas, à direita */}
        <div
          style={{
            position: "absolute",
            top: 48,
            right: 48,
            bottom: 48,
            width: 360,
            display: "flex",
            background: "#0B6E66",
            borderRadius: 28,
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: -70, right: -70, width: 240, height: 240, borderRadius: 999, background: "#F2A93B" }} />
          <div style={{ position: "absolute", top: 250, left: 56, width: 56, height: 56, borderRadius: 999, background: "#F3F8F6" }} />
          <div style={{ position: "absolute", bottom: -50, right: 60, width: 150, height: 150, borderRadius: 999, background: "#D7EFEB" }} />
          <div style={{ position: "absolute", bottom: 120, left: 150, width: 26, height: 26, borderRadius: 999, background: "#D7EFEB" }} />
          <div style={{ position: "absolute", top: 120, left: 40, width: 18, height: 18, borderRadius: 999, background: "#F3F8F6" }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 0 64px 72px",
            width: 720,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <rect x="4" y="9" width="56" height="51" rx="16" fill="#0B6E66" />
              <rect x="16.5" y="3" width="7" height="14" rx="3.5" fill="#0F2A27" />
              <rect x="40.5" y="3" width="7" height="14" rx="3.5" fill="#0F2A27" />
              <path d="M14 43c6-9 12-9 18 0s12 9 18 0" fill="none" stroke="#F3F8F6" strokeWidth="6" strokeLinecap="round" />
              <circle cx="46" cy="26" r="5.5" fill="#F2A93B" />
            </svg>
            <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: "-0.03em", color: "#0F2A27" }}>
              agenda<span style={{ color: "#0B6E66", marginLeft: 12 }}>flui</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.035em",
              color: "#0F2A27",
            }}
          >
            {TITLE}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Bricolage Grotesque", data: font, weight: 700, style: "normal" }] : undefined,
    },
  );
}

export const dynamic = "force-static";
