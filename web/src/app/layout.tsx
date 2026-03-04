import type { Metadata } from 'next';
import './globals.css';
import DashboardLayout from '../components/DashboardLayout';

export const metadata: Metadata = {
  title: 'Ruflo V3 Dashboard',
  description: 'Enterprise AI Agent Orchestration',
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
