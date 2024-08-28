import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/components/nav-bar/navbar";
import { cn } from "./util/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calendar App",
  description: "This is a calendar app to save your events and important dates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, " relative flex flex-col min-h-dvh")}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
