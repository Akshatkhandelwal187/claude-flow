import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stats = {
      totalVectors: 1245,
      learnedPatterns: 42,
      hitRate: 0.94
    };
    return NextResponse.json({ stats });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch memory data' }, { status: 500 });
  }
}
