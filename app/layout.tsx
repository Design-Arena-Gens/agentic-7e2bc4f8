import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Air.inc Clone',
  description: 'Google Drive for brands: manage static and video ads',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <header className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-brand-600" />
              <span className="text-xl font-semibold">Air.inc</span>
            </div>
            <nav className="flex items-center gap-4 text-sm text-gray-600">
              <a href="/" className="hover:text-gray-900">Library</a>
              <a href="/upload" className="hover:text-gray-900">Upload</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
