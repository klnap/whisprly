import type { Metadata } from "next";
import React from "react";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: 'Whisprly',
  description: 'Connect, share, and discover through chatting. Whisprly brings people together through the power of chatting online.',
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
