import { Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/ui/CustomCursor";

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit'
});

export const metadata = {
  title: "Herasi Silva | Frontend Developer",
  description: "Frontend Developer specializing in React, Next.js, and modern web technologies. Building efficient and scalable web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <CustomCursor />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}