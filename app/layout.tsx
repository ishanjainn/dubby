import type { Metadata } from "next";
import { Inter, Playfair_Display, Permanent_Marker } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { HeaderProvider } from "@/components/HeaderContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lando Norris | 2025 McLaren Formula 1 Driver",
  description: "Official website of Lando Norris - 2025 McLaren Formula 1 Driver",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${permanentMarker.variable} antialiased`}>
        <HeaderProvider>
          <Header />
          {children}
        </HeaderProvider>
      </body>
    </html>
  );
}
