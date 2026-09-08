import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Колледж ГГНТУ онлайн — твой первый шаг к профессии',
  description: 'Дистанционные программы СПО: программирование, реклама, экономика. Государственный диплом, куратор и помощь с поступлением на базе аттестата.',
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
