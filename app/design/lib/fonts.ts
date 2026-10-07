import {
  Bricolage_Grotesque,
  Plus_Jakarta_Sans,
  Fraunces,
  Manrope,
  Atkinson_Hyperlegible,
  Source_Serif_4,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  JetBrains_Mono,
} from "next/font/google";

// Note: next/font requires module-level constants; we expose all 4 pair vars
// at once. CSS swaps via --font-display / --font-body / --font-mono picker.

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-atkinson",
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex-sans",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const allFontVariables = [
  bricolage.variable,
  jakarta.variable,
  fraunces.variable,
  manrope.variable,
  atkinson.variable,
  sourceSerif.variable,
  plexSans.variable,
  plexMono.variable,
  jetbrains.variable,
].join(" ");
