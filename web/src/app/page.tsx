"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Layers, CheckSquare, Database, Activity } from 'lucide-react';

export default function Home() {
  const [overview, setOverview] = useState<any>(null);

  useEffect(() => {
    // Mocking data for AI Incubator dashboard
    const mockOverview = {
      metrics: {
        activeSwarms: 5,
        agentsRunning: 32,
        securityAuditsPassed: 128,
        systemHealth: 98
      },
      recentActivity: [
        { id: 1, action: "Security Swarm completed audit on 'Project Alpha'", time: "2 mins ago" },
        { id: 2, action: "Feature Swarm deployed to staging environment", time: "15 mins ago" },
        { id: 3, action: "Code Reviewer Agent submitted 3 PR comments", time: "1 hour ago" },
        { id: 4, action: "Memory vector updated with new auth pattern", time: "3 hours ago" }
      ]
    };

    setOverview(mockOverview);
  }, []);

  if (!overview) return <div className="p-8">Loading dashboard...</div>;

  const stats = [
    { name: 'Active Swarms', value: overview.metrics?.activeSwarms || 0, icon: Layers, color: 'text-blue-500' },
    { name: 'Agents Running', value: overview.metrics?.agentsRunning || 0, icon: Users, color: 'text-indigo-500' },
    { name: 'Security Audits Passed', value: overview.metrics?.securityAuditsPassed || 0, icon: CheckSquare, color: 'text-green-500' },
    { name: 'System Health', value: `${overview.metrics?.systemHealth || 0}%`, icon: Activity, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500">Real-time status of your Ruflo orchestration engine.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{stat.name}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {overview.recentActivity?.map((activity: any) => (
                <div key={activity.id} className="flex items-center">
                  <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-4" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">MCP Server</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">AgentDB</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Background Daemons</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Running</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
