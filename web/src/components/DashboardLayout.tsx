import Link from 'next/link';
import { Home, Users, Layers, CheckSquare, Database, Settings, Shield } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Swarm Configuration', href: '/swarms', icon: Layers },
    { name: 'Pattern Library', href: '/memory', icon: Database },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-blue-600">Ruflo V3</span>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600"
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900">AI Incubator Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              System Online
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 bg-slate-50/50">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
