'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check (change this to your admin password)
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
    
    if (password === adminPassword) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md p-8 bg-card border rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 font-medium"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <AdminCard title="Committee" href="/admin/committee" />
          <AdminCard title="Advisors" href="/admin/advisors" />
          <AdminCard title="Alumni" href="/admin/alumni" />
          <AdminCard title="News & Events" href="/admin/news" />
          <AdminCard title="Gallery" href="/admin/gallery" />
          <AdminCard title="Dashboard" href="/admin/dashboard" />
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <p className="text-muted-foreground">No recent activity yet</p>
        </div>
      </div>
    </div>
  )
}

function AdminCard({ title, href }: { title: string; href: string }) {
  return (
    <Link href={href}>
      <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
          Manage
        </button>
      </div>
    </Link>
  )
}
