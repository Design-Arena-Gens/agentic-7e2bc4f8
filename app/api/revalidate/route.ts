import { NextRequest, NextResponse } from 'next/server'

export async function POST(_: NextRequest) {
  return NextResponse.json({ revalidated: true })
}
