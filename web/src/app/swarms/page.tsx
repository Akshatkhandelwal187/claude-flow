"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SwarmsPage() {
  const [swarmStatus, setSwarmStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSwarmStatus();
  }, []);

  const fetchSwarmStatus = () => {
    fetch('/api/swarms')
      .then(res => res.json())
      .then(data => setSwarmStatus(data.status))
      .catch(err => console.error(err));
  };

  const handleInitSwarm = async () => {
    setLoading(true);
    try {
      await fetch('/api/swarms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topology: 'mesh', maxAgents: 5 })
      });
      fetchSwarmStatus();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Swarms</h2>
          <p className="text-gray-500">Coordinate multi-agent topologies and consensus.</p>
        </div>
        <Button onClick={handleInitSwarm} disabled={loading}>
          {loading ? 'Initializing...' : 'Init Mesh Swarm'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Swarm Coordinator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-sm font-medium text-gray-500">Topology</p>
              <p className="text-lg font-bold mt-1 uppercase">
                {swarmStatus?.topology || 'Unknown'}
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-sm font-medium text-gray-500">Status</p>
              <div className="mt-1">
                <Badge variant={swarmStatus?.status === 'active' ? 'default' : 'secondary'}>
                  {swarmStatus?.status || 'idle'}
                </Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-sm font-medium text-gray-500">Connected Agents</p>
              <p className="text-lg font-bold mt-1">
                {swarmStatus?.agentsCount || 0}
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-sm font-medium text-gray-500">Consensus Engine</p>
              <p className="text-lg font-bold mt-1">
                Byzantine (PBFT)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
