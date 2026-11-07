import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'AURA | Modern Premium E-Commerce',
  description: 'Precision engineered acoustic gear, tactile mechanical keyboards, and minimalist workspace essentials.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
