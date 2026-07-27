import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logoBuffer = await readFile(path.join(process.cwd(), "public/images/brand/izeyx-logomark-dark.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#000000",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/image is unsupported inside next/og's ImageResponse */}
          <img src={logoSrc} width={56} height={56} alt="" style={{ borderRadius: "50%" }} />
          <span style={{ fontSize: 32, fontWeight: 600, letterSpacing: "0.02em" }}>IZEYX</span>
        </div>
        <div style={{ display: "flex", marginTop: 48, maxWidth: 880 }}>
          <span style={{ fontSize: 52, fontWeight: 600, lineHeight: 1.15 }}>
            Modern systems for businesses ready to move beyond manual work.
          </span>
        </div>
        <div style={{ display: "flex", marginTop: 40 }}>
          <span style={{ fontSize: 24, color: "#A9A6C6" }}>{siteConfig.domain}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
