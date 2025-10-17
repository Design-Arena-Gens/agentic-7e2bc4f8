import { NextRequest, NextResponse } from 'next/server'
import { uploadToBlob } from '../../../lib/storage'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const files = form.getAll('files')
  const uploaded = [] as any[]
  for (const f of files) {
    if (f instanceof File) {
      const asset = await uploadToBlob(f)
      uploaded.push(asset)
    }
  }
  return NextResponse.json({ uploaded })
}
