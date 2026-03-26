import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.03) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#0a0a0a",
              letterSpacing: "-2px",
              fontFamily: "serif",
            }}
          >
            Olyxee
          </div>
          <div
            style={{
              width: 48,
              height: 2,
              backgroundColor: "#0a0a0a",
            }}
          />
          <div
            style={{
              fontSize: 28,
              color: "#737373",
              textAlign: "center",
              maxWidth: 600,
              lineHeight: 1.4,
            }}
          >
            Research and safety for artificial intelligence
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
              }}
            />
            <div
              style={{
                fontSize: 16,
                color: "#a3a3a3",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              olyxee.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
