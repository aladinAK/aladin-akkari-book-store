import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 38%, #e8294a, #6b1212)",
          display: "flex",
        }}
      />
    ),
    { ...size }
  );
}
