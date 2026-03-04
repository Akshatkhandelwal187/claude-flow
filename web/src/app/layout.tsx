import type { Metadata } from 'next';
import './globals.css';
import DashboardLayout from '../components/DashboardLayout';

export const metadata: Metadata = {
  title: 'AI Incubator Dashboard',
  description: 'AI Incubator Platform powered by Ruflo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
