import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Outfit } from "next/font/google"
import { Poppins } from "next/font/google"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { icons } from "lucide-react";


export const metadata = {
  title: "SEA Catering",
  description: "Healthy Meals, Anytime, Anywhere",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "SEA Catering",
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


import "../globals.css"


export default function MainLayout({ children }) {
  return (
    <>
        <Navbar/>
        {children}
        <Footer/>
    </>
  );
}

