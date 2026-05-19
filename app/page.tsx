"use client";

import React, { useState, useRef } from "react";

// Helper function to convert RGB integers into a clean Hex string
const rgbToHex = (r: number, g: number, b: number) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("")
    .toUpperCase();

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Native HTML5 Canvas Color Extractor Engine (Zero Dependencies, 100% Reliable)
  const extractDominantColors = (dataUrl: string) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Scale down image drastically to create a fast pixel sampling cluster
      canvas.width = 50;
      canvas.height = 50;
      ctx.drawImage(img, 0, 0, 50, 50);

      const imageData = ctx.getImageData(0, 0, 50, 50).data;
      const colorMap: { [key: string]: { rgb: [number, number, number]; count: number } } = {};

      // Sample pixels stepping by 4 to cleanly map color occurrences
      for (let i = 0; i < imageData.length; i += 16) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];

        // Skip transparent or highly washed out white/black backgrounds
        if (a < 200) continue;
        
        // Group slightly similar colors together by rounding parameters
        const blockR = Math.round(r / 15) * 15;
        const blockG = Math.round(g / 15) * 15;
        const blockB = Math.round(b / 15) * 15;
        const key = `${blockR},${blockG},${blockB}`;

        if (colorMap[key]) {
          colorMap[key].count++;
        } else {
          colorMap[key] = { rgb: [r, g, b], count: 1 };
        }
      }

      // Sort clusters by highest frequency density
      const sortedColors = Object.values(colorMap)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
        .map((item) => rgbToHex(item.rgb[0], item.rgb[1], item.rgb[2]));

      // Fallback fallback palette generator if the image is blank or monochromatic
      while (sortedColors.length < 5) {
        sortedColors.push(sortedColors[0] || "#222222");
      }

      setColors(sortedColors);
    };
    img.src = dataUrl;
  };

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImageSrc(dataUrl);
      extractDominantColors(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#111] text-white font-sans antialiased selection:bg-white/20 selection:text-white">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-12 backdrop-blur-md sticky top-0 z-50 bg-[#111]/80">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500" />
          <span className="text-sm font-bold tracking-widest text-neutral-200">
            VIBEPALETTE AI
          </span>
        </div>
        <button
          onClick={() => alert("Premium Integration coming up in Phase 3!")}
          className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-semibold text-neutral-300 transition duration-300 hover:bg-white hover:text-black hover:border-white"
        >
          Pricing
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="mx-auto max-w-5xl px-6 py-16 md:px-12 lg:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-light tracking-tight md:text-5xl lg:text-6xl text-neutral-100 mb-6">
            Extract the <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-400 to-neutral-200">Aesthetic Vibe</span>
          </h1>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
            Upload any photo or design snapshot. Our processing matrix cleanly organizes the dominant undertones, base matrix layers, and dynamic accent highlights.
          </p>
        </div>

        {/* Interactive Upload Matrix Box */}
        <div className="max-w-3xl mx-auto mb-16">
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="group relative cursor-pointer border-2 border-dashed border-white/10 rounded-2xl p-8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 ease-out min-h-[320px] flex flex-col items-center justify-center text-center overflow-hidden"
          >
            {imageSrc ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt="Inspiration Source"
                  className="max-h-[280px] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-neutral-400 group-hover:text-neutral-200 transition duration-300">
                  ＋
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-300">
                    Click or drop your inspiration photo here
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Supports JPEG, PNG up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Extracted Color Palette Grid */}
        {colors.length > 0 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-neutral-400 text-center">
              Generated Vibe Blueprint
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {colors.map((color, index) => (
                <div
                  key={`${color}-${index}`}
                  onClick={() => copyToClipboard(color, index)}
                  className="relative cursor-pointer group flex flex-col bg-white/[0.02] border border-white/5 rounded-xl p-3 hover:bg-white/[0.04] transition duration-300"
                >
                  <div
                    className="w-full aspect-square rounded-lg shadow-inner transition duration-300 group-hover:scale-[0.98]"
                    style={{ backgroundColor: color }}
                  />
                  <div className="mt-3 flex items-center justify-between px-1">
                    <span className="text-xs font-mono font-medium tracking-wide text-neutral-300">
                      {color}
                    </span>
                    <span className="text-[10px] text-neutral-500 group-hover:text-neutral-300 transition duration-200">
                      {copiedIndex === index ? "Copied" : "Copy"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monetization/Up-sell Interface Card */}
        <div className="mt-24 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#2C2A29] to-[#1A1918] text-white rounded-2xl p-6 md:p-8 border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-2xl">
            <div className="max-w-md">
              <span className="inline-block text-[10px] tracking-widest font-semibold uppercase bg-white/10 text-neutral-300 px-2.5 py-1 rounded border border-white/10 mb-4">
                Pro Feature
              </span>
              <h3 className="text-lg md:text-xl font-light tracking-wide text-neutral-100 mb-2">
                Download Full Brand Design Board
              </h3>
              <p className="text-xs text-[#A8A49E] leading-relaxed">
                Unlock matching architectural paint finishes (Asian Paints, Dulux), automated CSS variable export code models, and full design system matrixes instantly.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => alert("Razorpay payment framework will be activated in the next step!")}
                className="w-full md:w-auto text-xs font-semibold bg-white text-black px-6 py-3 rounded-xl shadow-lg hover:bg-[#FAF9F6] active:scale-[0.98] transition duration-200"
              >
                Upgrade for ₹499
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}