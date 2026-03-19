"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Database, Search, Zap, Code, Shield, Layers } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function MemoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const mockPatterns = [
    { id: 1, title: 'JWT Authentication Flow', description: 'Complete secure JWT auth implementation with refresh tokens.', confidence: 94, category: 'Security', icon: Shield, uses: 12 },
    { id: 2, title: 'Fastify API Rate Limiter', description: 'Redis-backed distributed rate limiting pattern.', confidence: 88, category: 'Backend', icon: Database, uses: 8 },
    { id: 3, title: 'Next.js App Router Setup', description: 'Clean architecture for standard Next.js 14+ layouts.', confidence: 91, category: 'Frontend', icon: Layers, uses: 24 },
    { id: 4, title: 'Playwright E2E Auth Test', description: 'Automated login test bypassing recaptcha safely in CI.', confidence: 85, category: 'Testing', icon: Code, uses: 5 },
  ];

  const filteredPatterns = mockPatterns.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Pattern Library</h2>
          <p className="text-gray-500">Search and reuse successful code patterns learned by the AI swarms.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search patterns (e.g. 'authentication', 'rate limit')..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filters</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredPatterns.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No patterns found matching your search.
          </div>
        ) : (
          filteredPatterns.map(pattern => {
            const Icon = pattern.icon;
            return (
              <Card key={pattern.id} className="hover:border-blue-200 transition-colors shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-50 rounded-md">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <Badge variant="outline">{pattern.category}</Badge>
                    </div>
                    <Badge variant={pattern.confidence >= 90 ? 'default' : 'secondary'} className="bg-green-100 text-green-800 hover:bg-green-200 border-none">
                      {pattern.confidence}% Confidence
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-4">{pattern.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    {pattern.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Used {pattern.uses} times across projects</span>
                    <Button variant="ghost" size="sm" className="h-8 text-blue-600 font-medium">
                      View Pattern &rarr;
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  );
}
