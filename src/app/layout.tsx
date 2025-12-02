import './globals.css';

import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Providers from '@/componentes/Providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Hotel',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
