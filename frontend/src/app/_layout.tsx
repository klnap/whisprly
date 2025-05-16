import type { Metadata } from "next";
import React from "react";
import { generalSans } from "../fonts"; 
import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: {
    template: '%s | Whisprly',
    default: 'Whisprly',
  },
  description: 'Connect and share with Whisprly',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
})
{
  return (
    <html lang="en" className={`${generalSans.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <Toaster visibleToasts={1} />
      </body>
    </html>
  );
}