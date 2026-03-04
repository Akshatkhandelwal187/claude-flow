import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tasks = [
      { id: 'tsk_1', name: 'Analyze auth bug', status: 'completed', assignedTo: 'security-reviewer' },
      { id: 'tsk_2', name: 'Write E2E tests', status: 'in_progress', assignedTo: 'test-runner' },
      { id: 'tsk_3', name: 'Refactor user service', status: 'idle', assignedTo: null }
    ];

    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      task: {
        id: `tsk_${Math.random().toString(36).substr(2, 9)}`,
        name: body.name || 'Unnamed task',
        status: 'idle',
        assignedTo: null
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
