import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kraftmeister",
  description: "SaaS for Handwerk businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
