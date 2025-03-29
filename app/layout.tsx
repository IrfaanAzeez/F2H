import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './components/Providers';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'F2H - Fashion to Home',
  description: 'Your one-stop shop for fashion and home goods',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
