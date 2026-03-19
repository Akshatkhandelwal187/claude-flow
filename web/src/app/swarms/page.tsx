"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SwarmsPage() {
  const [loading, setLoading] = useState(false);
  const [topology, setTopology] = useState('hierarchical');
  const [maxAgents, setMaxAgents] = useState(8);
  const [strategy, setStrategy] = useState('specialized');
  const [swarms, setSwarms] = useState([
    { id: 'swarm-alpha', name: 'Security Audit Swarm', topology: 'hierarchical', maxAgents: 4, strategy: 'specialized', status: 'active' },
    { id: 'swarm-beta', name: 'Feature Dev Swarm', topology: 'mesh', maxAgents: 6, strategy: 'adaptive', status: 'idle' },
  ]);

  const handleDeploySwarm = () => {
    setLoading(true);
    setTimeout(() => {
      setSwarms([{ id: `swarm-${Date.now()}`, name: 'New Orchestration Swarm', topology, maxAgents, strategy, status: 'active' }, ...swarms]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Swarm Configuration</h2>
          <p className="text-gray-500">Deploy and manage AI agent swarms for your incubator projects.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 border-blue-100 shadow-sm">
          <CardHeader>
            <CardTitle>Deploy New Swarm</CardTitle>
            <CardDescription>Configure the orchestration topology.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Topology</Label>
              <Select value={topology} onValueChange={setTopology}>
                <SelectTrigger>
                  <SelectValue placeholder="Select topology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hierarchical">Hierarchical (Leader/Worker)</SelectItem>
                  <SelectItem value="mesh">Mesh (Peer-to-Peer)</SelectItem>
                  <SelectItem value="ring">Ring (Sequential)</SelectItem>
                  <SelectItem value="star">Star (Centralized)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Max Agents</Label>
              <Input
                type="number"
                min={1}
                max={50}
                value={maxAgents}
                onChange={(e) => setMaxAgents(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Strategy</Label>
              <Select value={strategy} onValueChange={setStrategy}>
                <SelectTrigger>
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="specialized">Specialized</SelectItem>
                  <SelectItem value="adaptive">Adaptive</SelectItem>
                  <SelectItem value="consensus">Consensus-driven</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full mt-4" onClick={handleDeploySwarm} disabled={loading}>
              {loading ? 'Deploying...' : 'Deploy Swarm'}
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-1 lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Active Swarms</CardTitle>
            <CardDescription>Monitor currently running orchestration swarms.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {swarms.map(swarm => (
                <div key={swarm.id} className="p-4 border rounded-lg bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{swarm.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{swarm.topology} Topology • {swarm.strategy} Strategy</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                      <strong>{swarm.maxAgents}</strong> Max Agents
                    </div>
                    <Badge variant={swarm.status === 'active' ? 'default' : 'secondary'}>
                      {swarm.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
