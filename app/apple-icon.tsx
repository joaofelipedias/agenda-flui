import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Símbolo branco sobre quadrado Água com cantos de 30%.
 * O fundo fora dos cantos também é Água: o iOS aplica a própria máscara e
 * deixaria preto qualquer canto transparente.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0B6E66" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0B6E66",
            borderRadius: "30%",
          }}
        >
          <svg width="116" height="116" viewBox="0 0 64 64">
            <rect x="4" y="9" width="56" height="51" rx="16" fill="#FFFFFF" />
            <rect x="16.5" y="3" width="7" height="14" rx="3.5" fill="#FFFFFF" stroke="#0B6E66" strokeWidth="2.5" />
            <rect x="40.5" y="3" width="7" height="14" rx="3.5" fill="#FFFFFF" stroke="#0B6E66" strokeWidth="2.5" />
            <path d="M14 43c6-9 12-9 18 0s12 9 18 0" fill="none" stroke="#0B6E66" strokeWidth="6" strokeLinecap="round" />
            <circle cx="46" cy="26" r="5.5" fill="#F2A93B" />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}

export const dynamic = "force-static";
