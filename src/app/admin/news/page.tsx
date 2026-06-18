'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

interface News {
  id: string
  title: string
  description: string
  image_url?: string
  published: boolean
  created_at: string
}

export default function AdminNews() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ title: '', description: '', image_url: '', published: false })
  const [editingId, setEditingId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setNews(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      const { error } = await supabase
        .from('news')
        .update(formData)
        .eq('id', editingId)
      
      if (!error) {
        setEditingId(null)
        setFormData({ title: '', description: '', image_url: '', published: false })
        fetchNews()
      }
    } else {
      const { error } = await supabase
        .from('news')
        .insert([formData])
      
      if (!error) {
        setFormData({ title: '', description: '', image_url: '', published: false })
        fetchNews()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await supabase.from('news').delete().eq('id', id)
      fetchNews()
    }
  }

  const handleEdit = (item: News) => {
    setEditingId(item.id)
    setFormData({
      title: item.title,
      description: item.description,
      image_url: item.image_url || '',
      published: item.published,
    })
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-primary hover:underline">← Admin</Link>
          <h1 className="text-3xl font-bold">Manage News & Events</h1>
        </div>

        {/* Form */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} News/Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg bg-background"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg bg-background min-h-24"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({...formData, published: e.target.checked})}
                className="w-4 h-4"
              />
              <span>Published</span>
            </label>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                {editingId ? 'Update' : 'Add'} News
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ title: '', description: '', image_url: '', published: false })
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* News List */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted border-b">
              <tr>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Description</th>
                <th className="text-left p-4">Published</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-4 text-center">Loading...</td></tr>
              ) : news.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-center">No news yet</td></tr>
              ) : (
                news.map(item => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">{item.title}</td>
                    <td className="p-4 truncate text-sm">{item.description}</td>
                    <td className="p-4">{item.published ? '✓' : '–'}</td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
