import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google'; // <-- 1. Impor Poppins Anda (SUDAH BENAR)

// 2. Konfigurasi Poppins (SUDAH BENAR)
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

// 3. Metadata (Kita pindahkan ke atas)
export const metadata: Metadata = {
  // Ganti placeholder bawaan
  title: "SDN 2 Sabah Balau",
  description: "Website Resmi SDN 2 Sabah Balau",
  viewport: "width=device-width, initial-scale=1.0",
};

// 4. Hapus definisi RootLayout yang duplikat dan font Geist

// 5. Gunakan satu RootLayout (versi TypeScript) dan terapkan Poppins
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Ganti 'en' menjadi 'id'
    <html lang="id">
      <body
        // Terapkan Poppins dan warna font global di sini
        className={`${poppins.className} text-slate-800 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}