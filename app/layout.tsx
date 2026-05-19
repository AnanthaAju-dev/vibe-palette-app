import type { Metadata } from "next";
import "./globals.css";

// This object tells Google exactly what your website is about
export const metadata: Metadata = {
  title: "Image Color Palette Extractor | Find Hex Codes From Photos Online",
  description: "Upload any photo, design snapshot, or aesthetic image to instantly extract dominant color palettes and hex codes. The ultimate free tool for designers and developers.",
  keywords: [
    "extract color palette from image",
    "image color picker",
    "find hex codes from photo",
    "aesthetic color palette generator",
    "get color scheme from image",
    "vibe palette ai"
  ],
  authors: [{ name: "VibePalette Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}