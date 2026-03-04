import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      metrics: {
        activeAgents: 3,
        tasksCompleted: 42,
        memoryVectors: 1245,
        intelligenceScore: 85
      },
      recentActivity: [
        { id: 1, action: "Swarm initialized in mesh topology", time: "10 min ago" },
        { id: 2, action: "Task completed: Optimize auth flow", time: "15 min ago" },
        { id: 3, action: "New pattern learned and consolidated", time: "1 hour ago" },
        { id: 4, action: "Background worker finished map execution", time: "2 hours ago" }
      ]
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
