import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    const { stdout } = await execAsync('npx ruflo task list --format json', {
      cwd: process.cwd()
    });

    // Parse the output correctly as there could be npm warnings prepended
    const jsonStr = stdout.substring(stdout.indexOf('{'));
    const data = JSON.parse(jsonStr);

    const tasks = (data.tasks || []).map((task: any) => ({
      id: task.id || task.taskId,
      name: task.description || task.name || 'Unnamed task',
      status: task.status || 'unknown',
      assignedTo: task.assignedTo || null
    }));

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = body.type || 'implementation';
    const description = body.name || 'Unnamed task';

    // Use --format json to get structured output
    const { stdout } = await execAsync(`npx ruflo task create -t ${type} -d "${description}" --format json`, {
      cwd: process.cwd()
    });

    const jsonStr = stdout.substring(stdout.indexOf('{'));
    const data = JSON.parse(jsonStr);

    return NextResponse.json({
      success: true,
      task: {
        id: data.id || data.taskId || `tsk_${Math.random().toString(36).substr(2, 9)}`,
        name: data.description || description,
        status: data.status || 'idle',
        assignedTo: data.assignedTo || null
      }
    });
  } catch (error) {
    console.error('Failed to create task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
