"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = () => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => setAgents(data.agents || []))
      .catch(err => console.error(err));
  };

  const handleSpawnAgent = async () => {
    setLoading(true);
    try {
      await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'coder', name: 'web-spawned-coder' })
      });
      fetchAgents();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Agents</h2>
          <p className="text-gray-500">Manage specialized agents and workers.</p>
        </div>
        <Button onClick={handleSpawnAgent} disabled={loading}>
          {loading ? 'Spawning...' : 'Spawn Agent'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Agents ({agents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">No active agents</TableCell>
                </TableRow>
              ) : (
                agents.map((agent: any) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-mono text-xs">{agent.id.substring(0, 8)}</TableCell>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>{agent.type}</TableCell>
                    <TableCell>
                      <Badge variant={agent.status === 'idle' ? 'secondary' : 'default'}>
                        {agent.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
