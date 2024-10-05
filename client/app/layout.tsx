import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Poppins } from 'next/font/google';
import Navbar from './components/navbar';
import Head from 'next/head';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  title: 'Peckish',
  description: 'Your personal recipe assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={`${poppins.className} antialiased`}>
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
