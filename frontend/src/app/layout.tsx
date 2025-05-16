import type { Metadata } from "next";
import React from "react";
import { generalSans } from "../fonts"; 
import "./global.css";
import { Toaster } from "sonner";
import { verifySession } from "@/modules/auth/actions";
import AuthLayout from "@/components/layouts/AuthLayout";
import PublicLayout from "@/components/layouts/PublicLayout";


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

  const user = await verifySession();

  return (
    <html lang="en" className={`${generalSans.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {user ? (
          <AuthLayout user={user}>
            {children}
          </AuthLayout>
        ) : (
          <PublicLayout>
            {children}
          </PublicLayout>
        )}
        <Toaster visibleToasts={1} />
      </body>
    </html>
  );
}