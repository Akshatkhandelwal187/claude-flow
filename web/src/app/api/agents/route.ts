import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    const { stdout } = await execAsync('npx ruflo agent list --format json', {
      cwd: process.cwd()
    });

    // Parse the output correctly as there could be npm warnings prepended
    const jsonStr = stdout.substring(stdout.indexOf('{'));
    const data = JSON.parse(jsonStr);

    const agents = (data.agents || []).map((agent: any) => ({
      id: agent.agentId,
      name: agent.name || `${agent.agentType}-${agent.agentId.substring(agent.agentId.length - 6)}`,
      type: agent.agentType,
      status: agent.status
    }));

    return NextResponse.json({ agents });
  } catch (error) {
    console.error('Failed to fetch agents:', error);
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = body.type || 'coder';
    // Use --format json to get structured output
    const { stdout } = await execAsync(`npx ruflo agent spawn -t ${type} --format json`, {
      cwd: process.cwd()
    });

    const jsonStr = stdout.substring(stdout.indexOf('{'));
    const data = JSON.parse(jsonStr);

    return NextResponse.json({
      success: true,
      agent: {
        id: data.agentId,
        name: body.name || data.name || `new-${type}`,
        type: data.agentType || type,
        status: data.status || 'spawned'
      }
    });
  } catch (error) {
    console.error('Failed to spawn agent:', error);
    return NextResponse.json({ error: 'Failed to spawn agent' }, { status: 500 });
  }
}
