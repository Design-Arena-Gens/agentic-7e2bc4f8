"use client"
import Link from 'next/link'
import { useState } from 'react'
import { AssetGrid } from '../components/AssetGrid'

export default function Page() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<'all'|'image'|'video'>('all')
  const [tag, setTag] = useState('')
  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Library</h1>
        <p className="text-sm text-gray-600">All your brand assets in one place. Images, videos, storyboards, and more.</p>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <input className="input max-w-xs" placeholder="Search by name" value={query} onChange={e => setQuery(e.target.value)} />
          <select className="input max-w-[160px]" value={type} onChange={e => setType(e.target.value as any)}>
            <option value="all">All types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
          </select>
          <input className="input max-w-xs" placeholder="Filter tag" value={tag} onChange={e => setTag(e.target.value)} />
        </div>
        <Link className="button" href="/upload">Upload</Link>
      </div>
      <AssetGrid query={query} type={type} tag={tag} />
    </main>
  )
}
