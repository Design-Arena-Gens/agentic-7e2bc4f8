"use client"

import useSWR from 'swr'
import Link from 'next/link'
import clsx from 'classnames'

export type Asset = {
  id: string
  url: string
  thumbnailUrl: string
  name: string
  type: 'image' | 'video' | 'other'
  sizeBytes: number
  createdAt: string
  tags: string[]
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

function formatBytes(bytes: number) {
  const units = ['B','KB','MB','GB']
  let i = 0
  let n = bytes
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024
    i++
  }
  return `${n.toFixed(1)} ${units[i]}`
}

export function AssetGrid({ query = '', type = 'all', tag = '' }: { query?: string; type?: 'all'|'image'|'video'; tag?: string }) {
  const { data, error, isLoading } = useSWR<{ assets: Asset[] }>("/api/assets", fetcher)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">Failed to load</div>

  const assets = (data?.assets ?? [])
    .filter(a => {
      if (type !== 'all' && a.type !== type) return false
      if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false
      if (tag && !a.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))) return false
      return true
    })

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {assets.map((a) => (
        <Link href={`/asset/${a.id}`} key={a.id} className="card group">
          <div className={clsx("relative aspect-[4/3] w-full overflow-hidden bg-gray-100", a.type === 'video' && 'ring-1 ring-inset ring-black/10') }>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.thumbnailUrl || a.url} alt={a.name} className="h-full w-full object-cover transition group-hover:scale-105" />
            {a.type === 'video' && (
              <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">VIDEO</div>
            )}
          </div>
          <div className="flex items-center justify-between p-3">
            <div>
              <div className="line-clamp-1 text-sm font-medium">{a.name}</div>
              <div className="text-xs text-gray-500">{formatBytes(a.sizeBytes)}</div>
            </div>
            <div className="flex flex-wrap justify-end gap-1">
              {a.tags.slice(0,2).map(t => (
                <span key={t} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">{t}</span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
