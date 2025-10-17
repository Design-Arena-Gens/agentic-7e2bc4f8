import { NextResponse } from 'next/server'
import { listAssets } from '../../../lib/storage'

export const runtime = 'edge'

export async function GET() {
  const assets = await listAssets()
  return NextResponse.json({ assets })
}
