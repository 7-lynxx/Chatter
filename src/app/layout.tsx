import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraWrapper } from "@/components/ChakraWrapper";
import ColorModeToggle from "@/components/ColorModeToggle";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatter",
  description: "Generated by create next app",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraWrapper>
          <ColorModeToggle/>
          { children }
        </ChakraWrapper>
          
        
        </body>
    </html>
  );
}


