import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    const { stdout } = await execAsync('npx ruflo swarm status --format json', {
      cwd: process.cwd()
    });

    // Parse the output correctly as there could be npm warnings prepended
    const jsonStr = stdout.substring(stdout.indexOf('{'));
    const data = JSON.parse(jsonStr);

    const status = {
      topology: data.topology || 'none',
      status: data.status || 'inactive',
      agentsCount: data.agents?.total || 0,
      objective: data.objective || 'No active objective',
      id: data.id || 'none'
    };

    return NextResponse.json({ status });
  } catch (error) {
    console.error('Failed to fetch swarm status:', error);
    return NextResponse.json({ error: 'Failed to fetch swarm status' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topology = body.topology || 'mesh';

    // Use --format json to get structured output
    const { stdout } = await execAsync(`npx ruflo swarm init --topology ${topology} --format json`, {
      cwd: process.cwd()
    });

    const jsonStr = stdout.substring(stdout.indexOf('{'));
    const data = JSON.parse(jsonStr);

    return NextResponse.json({
      success: true,
      status: 'active',
      topology: data.topology || topology,
      id: data.swarmId || 'unknown'
    });
  } catch (error) {
    console.error('Failed to initialize swarm:', error);
    return NextResponse.json({ error: 'Failed to initialize swarm' }, { status: 500 });
  }
}
