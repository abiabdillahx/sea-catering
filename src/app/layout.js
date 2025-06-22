import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Outfit } from "next/font/google"
import { Poppins } from "next/font/google"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"], 
  weight: ["400", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SEA Catering - Home",
  description: "Healthy Meals, Anytime, Anywhere",
  openGraph: {
    title: "SEA Catering - Home",
    description: "Healthy Meals, Anytime, Anywhere",
    url: "/",
    siteName: "SEA Catering",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "SEA Catering OG Image",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${outfit.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
