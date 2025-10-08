// src/app/layout.jsx
import './globals.css';
import ResponsiveWrapper from '@/components/ui/ResponsiveWrapper';

export const metadata = {
  title: 'Chandbagh 90 – Celebration Companion',
  description: 'Official digital companion for Chandbagh School’s 90th Anniversary.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ResponsiveWrapper>
          {children}
        </ResponsiveWrapper>
      </body>
    </html>
  );
}