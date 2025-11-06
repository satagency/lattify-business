// app/layout.tsx

import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Lattify Business Dashboard',
  description: 'Employee training and management dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

