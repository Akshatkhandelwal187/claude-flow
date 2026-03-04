import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const agents = [
      { id: 'agt_1abc', name: 'coder-alpha', type: 'coder', status: 'idle' },
      { id: 'agt_2def', name: 'security-reviewer', type: 'security-architect', status: 'active' },
      { id: 'agt_3ghi', name: 'test-runner', type: 'tester', status: 'active' }
    ];
    return NextResponse.json({ agents });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      agent: {
        id: `agt_${Math.random().toString(36).substr(2, 9)}`,
        name: body.name || `new-${body.type || 'agent'}`,
        type: body.type || 'coder',
        status: 'idle'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to spawn agent' }, { status: 500 });
  }
}
