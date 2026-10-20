import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Колледж ГГНТУ онлайн — твой первый шаг к профессии',
  description: 'Дистанционные программы СПО ГГНТУ им. акад. М. Д. Миллионщикова: программирование, реклама, экономика. Государственный диплом, куратор и помощь с поступлением на базе аттестата.',
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  other: {
    'theme-color': '#052555',
  },
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
