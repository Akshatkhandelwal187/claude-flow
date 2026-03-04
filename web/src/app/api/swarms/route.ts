import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const status = {
      topology: 'hierarchical',
      status: 'active',
      agentsCount: 3
    };
    return NextResponse.json({ status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch swarm status' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      status: 'active',
      topology: body.topology || 'mesh'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to initialize swarm' }, { status: 500 });
  }
}
