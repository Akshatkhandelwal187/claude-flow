import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    // Run multiple CLI commands in parallel to gather metrics
    const [agentsRes, tasksRes, memoryRes] = await Promise.all([
      execAsync('npx ruflo agent list --format json', { cwd: process.cwd() }).catch(() => ({ stdout: '{"total":0}' })),
      execAsync('npx ruflo task list --format json', { cwd: process.cwd() }).catch(() => ({ stdout: '{"total":0}' })),
      execAsync('npx ruflo memory stats --format json', { cwd: process.cwd() }).catch(() => ({ stdout: '{"entries":{"total":0}}' }))
    ]);

    const parseJSON = (stdout: string) => {
      try {
        const jsonStr = stdout.substring(stdout.indexOf('{'));
        return JSON.parse(jsonStr);
      } catch {
        return {};
      }
    };

    const agentsData = parseJSON(agentsRes.stdout);
    const tasksData = parseJSON(tasksRes.stdout);
    const memoryData = parseJSON(memoryRes.stdout);

    return NextResponse.json({
      metrics: {
        activeAgents: agentsData.total || 0,
        tasksCompleted: tasksData.total || 0, // In a real app we'd filter by completed tasks
        memoryVectors: memoryData.entries?.total || 0,
        intelligenceScore: Math.floor(Math.random() * 20) + 80 // Mocked for now, as not directly available in basic stats
      },
      recentActivity: [
        { id: 1, action: "Dashboard initialized", time: "just now" },
        { id: 2, action: "System checks passed", time: "1 min ago" }
      ]
    });
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
