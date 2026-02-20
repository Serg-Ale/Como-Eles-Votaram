import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Como Eles Votaram — Transparência Legislativa";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              textAlign: "center",
              letterSpacing: "-0.05em",
            }}
          >
            Como Eles{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #22c55e 0%, #facc15 50%, #3b82f6 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Votaram
            </span>
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#9ca3af",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Transparência Legislativa
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
