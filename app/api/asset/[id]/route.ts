import { NextRequest, NextResponse } from 'next/server'
import { getAsset, updateIndexEntry, deleteAsset } from '../../../../lib/storage'

export const runtime = 'edge'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const asset = await getAsset(decodeURIComponent(params.id))
  if (!asset) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ asset })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id)
  const body = await req.json()
  const updated = await updateIndexEntry(id, body)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ asset: updated })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id)
  const ok = await deleteAsset(id)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
