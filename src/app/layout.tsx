import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/providers";
import BackToTop from "@/components/back-to-top";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Fresh Cart",
  description: "Your one-stop destination for quality products",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
          <body className="antialiased" suppressHydrationWarning>
          <Providers>
            {children}
            <BackToTop />
          </Providers>
          <SpeedInsights />
        </body>
      </html>
  );
}
