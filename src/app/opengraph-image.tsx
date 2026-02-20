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
          background: "#071018",
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
                color: "#34d399",
              }}
            >
              Votaram
            </span>
          </div>
           <div
             style={{
               fontSize: 36,
               color: "#6b7f99",
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
