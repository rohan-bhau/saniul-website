import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sani Ul — Operations Manager & Entrepreneur",
  description: "Official portfolio of Sani Ul — Operations Manager at Ayan Trading House, Entrepreneur, and Business Builder.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
