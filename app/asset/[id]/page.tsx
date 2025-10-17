"use client"

import useSWR from 'swr'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function AssetDetailPage() {
  const params = useParams<{ id: string }>()
  const id = decodeURIComponent(params.id)
  const { data, mutate } = useSWR<{ asset: any }>(`/api/asset/${encodeURIComponent(id)}`, fetcher)
  const asset = data?.asset
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  if (!asset) return <div>Loading...</div>

  async function saveChanges(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || asset.name)
    const tags = String(form.get('tags') || '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
    setSaving(true)
    const res = await fetch(`/api/asset/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, tags }),
    })
    setSaving(false)
    if (res.ok) mutate()
  }

  async function handleDelete() {
    if (!confirm('Delete this asset?')) return
    const res = await fetch(`/api/asset/${encodeURIComponent(id)}`, { method: 'DELETE' })
    if (res.ok) router.push('/')
  }

  const isVideo = asset.type === 'video'

  return (
    <main className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="card md:col-span-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
          {isVideo ? (
            <video src={asset.url} controls className="h-full w-full object-contain" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={asset.url} alt={asset.name} className="h-full w-full object-contain" />
          )}
        </div>
      </div>
      <div className="space-y-4">
        <div className="card p-4">
          <div className="mb-2 text-sm font-medium">Details</div>
          <form onSubmit={saveChanges} className="space-y-3">
            <label className="block text-sm">
              <span className="mb-1 block text-gray-600">Name</span>
              <input className="input" name="name" defaultValue={asset.name} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-gray-600">Tags (comma-separated)</span>
              <input className="input" name="tags" defaultValue={(asset.tags || []).join(', ')} />
            </label>
            <div className="flex gap-2">
              <button className="button" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              <a className="button bg-gray-800 hover:bg-gray-900" href={asset.downloadUrl} target="_blank" rel="noreferrer">Download</a>
              <button type="button" onClick={handleDelete} className="button bg-red-600 hover:bg-red-700">Delete</button>
            </div>
          </form>
        </div>
        <div className="card p-4 text-sm text-gray-600">
          <div><span className="font-medium text-gray-700">Type:</span> {asset.type}</div>
          <div><span className="font-medium text-gray-700">Created:</span> {new Date(asset.createdAt).toLocaleString()}</div>
          <div className="break-all"><span className="font-medium text-gray-700">URL:</span> <a className="text-brand-700" href={asset.url} target="_blank" rel="noreferrer">{asset.url}</a></div>
        </div>
      </div>
    </main>
  )
}
