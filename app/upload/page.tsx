"use client"

import { useRef, useState } from 'react'

export default function UploadPage() {
  const [files, setFiles] = useState<FileList | null>(null)
  const [status, setStatus] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload() {
    if (!files || files.length === 0) return
    setStatus('Uploading...')
    const form = new FormData()
    Array.from(files).forEach(f => form.append('files', f))
    const res = await fetch('/api/upload', { method: 'POST', body: form })
    if (!res.ok) {
      setStatus('Upload failed')
      return
    }
    setStatus('Uploaded!')
    setFiles(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Upload</h1>
        <p className="text-sm text-gray-600">Add images and videos to your library.</p>
      </div>
      <div className="card p-6">
        <input ref={inputRef} className="input" type="file" accept="image/*,video/*" multiple onChange={e => setFiles(e.target.files)} />
        <div className="mt-4 flex gap-2">
          <button className="button" onClick={handleUpload} disabled={!files || files.length === 0}>Upload</button>
          <span className="text-sm text-gray-600">{status}</span>
        </div>
      </div>
    </main>
  )
}
