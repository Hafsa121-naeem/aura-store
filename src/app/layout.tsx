import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'AURA STORE — A Life of Contrasts | Architectural Luxury',
  description: 'Curated objects, acoustic engineering, precision timepieces, and architectural essentials for the mindful living space. Cash on Delivery across Pakistan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#F5F2EB] text-[#1A1918] font-sans-clean antialiased selection:bg-[#E0D8CB] selection:text-[#1A1918]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
