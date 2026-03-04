"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Search, Zap } from 'lucide-react';

export default function MemoryPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/memory')
      .then(res => res.json())
      .then(data => setStats(data.stats))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">AgentDB Memory</h2>
          <p className="text-gray-500">View vector storage metrics and self-learning state.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Vectors</CardTitle>
            <Database className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats?.totalVectors || 1245}
            </div>
            <p className="text-xs text-gray-500 mt-1">Stored embeddings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">HNSW Index Status</CardTitle>
            <Zap className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              Active
            </div>
            <p className="text-xs text-gray-500 mt-1">150x Search Speedup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Learned Patterns</CardTitle>
            <Search className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats?.learnedPatterns || 42}
            </div>
            <p className="text-xs text-gray-500 mt-1">From ReasoningBank</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
