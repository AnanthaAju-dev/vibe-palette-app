"use client";
import React, { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [palette, setPalette] = useState(null);

  // A temporary simulation function to mimic extracting aesthetic tones
  const simulateExtraction = (fileName) => {
    setPalette({
      dominant: { name: "Cream Bouclé", hex: "#F5EFEB" },
      baseTones: [
        { name: "Warm Oak", hex: "#CDBAA8" },
        { name: "Raw Linen", hex: "#E3DAC9" },
        { name: "Soft Shadow", hex: "#8A7E72" }
      ],
      accents: [
        { name: "Muted Terracotta", hex: "#A87C66" },
        { name: "Sage Highlight", hex: "#9EAF9F" }
      ]
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      simulateExtraction(file.name);
    }
  };

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    alert(`Copied ${hex} to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2A29] font-sans antialiased">
      {/* Top Professional Navigation Bar */}
      <nav className="border-b border-[#EAE6DF] bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded-full bg-gradient-to-tr from-[#A87C66] to-[#9EAF9F]" />
          <span className="font-semibold tracking-wider text-sm uppercase">VibePalette AI</span>
        </div>
        <button className="text-xs font-medium bg-[#2C2A29] text-white px-4 py-2 rounded-full hover:bg-black transition-all">
          Sign In
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-tight mb-3">Extract the Aesthetic Vibe</h1>
          <p className="text-sm text-[#706B64] max-w-md mx-auto">
            Upload any Pinterest pin or design snapshot. Our engine cleanly organizes the dominant undertones, base matrix layers, and accent highlight accents.
          </p>
        </div>

        {/* Dynamic Drag and Drop Dropzone Card */}
        <div className="bg-white border border-[#EAE6DF] rounded-2xl p-8 shadow-sm mb-10 transition-all">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#EAE6DF] rounded-xl p-8 hover:border-[#A87C66] transition-all relative">
            {image ? (
              <div className="text-center">
                <img src={image} alt="Uploaded Vibe" className="max-h-64 rounded-lg object-contain mx-auto mb-4 shadow-sm" />
                <label className="text-xs text-[#A87C66] cursor-pointer underline font-medium">
                  Upload a different image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer w-full h-44 text-center">
                <div className="h-10 w-10 bg-[#FAF9F6] rounded-full flex items-center justify-center text-[#A87C66] mb-3">
                  ✦
                </div>
                <span className="text-sm font-medium mb-1">Click to drop your inspiration photo</span>
                <span className="text-xs text-[#9C968E]">Supports JPEG, PNG up to 5MB</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </div>
        </div>

        {/* Palette Analysis Output Section */}
        {palette && (
          <div className="space-y-8 animate-fade-in mb-12">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#9C968E] mb-3">Dominant Undertone</h2>
              <div 
                onClick={() => copyToClipboard(palette.dominant.hex)}
                className="group cursor-pointer bg-white border border-[#EAE6DF] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-14 w-14 rounded-lg shadow-inner border border-black/5" style={{ backgroundColor: palette.dominant.hex }} />
                  <div>
                    <h3 className="font-medium text-sm">{palette.dominant.name}</h3>
                    <p className="text-xs font-mono text-[#9C968E]">{palette.dominant.hex}</p>
                  </div>
                </div>
                <span className="text-xs text-[#9C968E] opacity-0 group-hover:opacity-100 transition-all font-medium">Click to Copy</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#9C968E] mb-3">Base Structural Matrix</h2>
                <div className="space-y-3">
                  {palette.baseTones.map((tone, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => copyToClipboard(tone.hex)}
                      className="group cursor-pointer bg-white border border-[#EAE6DF] rounded-xl p-3 flex items-center justify-between hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-md border border-black/5" style={{ backgroundColor: tone.hex }} />
                        <div>
                          <h4 className="text-xs font-medium">{tone.name}</h4>
                          <p className="text-[10px] font-mono text-[#9C968E]">{tone.hex}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#9C968E] opacity-0 group-hover:opacity-100 transition-all">Copy</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#9C968E] mb-3">Accent Highlights</h2>
                <div className="space-y-3">
                  {palette.accents.map((accent, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => copyToClipboard(accent.hex)}
                      className="group cursor-pointer bg-white border border-[#EAE6DF] rounded-xl p-3 flex items-center justify-between hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-md border border-black/5" style={{ backgroundColor: accent.hex }} />
                        <div>
                          <h4 className="text-xs font-medium">{accent.name}</h4>
                          <p className="text-[10px] font-mono text-[#9C968E]">{accent.hex}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#9C968E] opacity-0 group-hover:opacity-100 transition-all">Copy</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Locked Premium Tier Module */}
            <div className="bg-gradient-to-br from-[#2C2A29] to-[#1A1918] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 max-w-md">
                <span className="text-[10px] tracking-widest font-semibold uppercase bg-white/10 px-2 py-1 rounded border border-white/10">Pro System Unlock</span>
                <h3 className="text-xl font-light mt-3 mb-1 tracking-wide">Download Full Brand Design Board</h3>
                <p className="text-xs text-[#A8A49E]">
                  Unlock real-world equivalent architectural paint matches, localized styling assets, and export high-definition mood-board PDFs.
                </p>
              </div>
              <button className="w-full md:w-auto text-xs font-semibold bg-white text-black px-6 py-3 rounded-xl hover:bg-[#FAF9F6] shadow-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all whitespace-nowrap">
                Upgrade for ₹499
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}