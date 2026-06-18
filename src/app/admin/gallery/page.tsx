'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import Image from 'next/image'

interface GalleryImage {
  id: string
  title: string
  image_url: string
  category?: string
  created_at: string
}

export default function AdminGallery() {
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ title: '', image_url: '', category: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setGallery(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      const { error } = await supabase
        .from('gallery')
        .update(formData)
        .eq('id', editingId)
      
      if (!error) {
        setEditingId(null)
        setFormData({ title: '', image_url: '', category: '' })
        fetchGallery()
      }
    } else {
      const { error } = await supabase
        .from('gallery')
        .insert([formData])
      
      if (!error) {
        setFormData({ title: '', image_url: '', category: '' })
        fetchGallery()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await supabase.from('gallery').delete().eq('id', id)
      fetchGallery()
    }
  }

  const handleEdit = (image: GalleryImage) => {
    setEditingId(image.id)
    setFormData({
      title: image.title,
      image_url: image.image_url,
      category: image.category || '',
    })
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-primary hover:underline">← Admin</Link>
          <h1 className="text-3xl font-bold">Manage Gallery</h1>
        </div>

        {/* Form */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Image</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg bg-background"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg bg-background"
              required
            />
            <input
              type="text"
              placeholder="Category (optional)"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                {editingId ? 'Update' : 'Add'} Image
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ title: '', image_url: '', category: '' })
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center p-8">Loading...</div>
          ) : gallery.length === 0 ? (
            <div className="col-span-full text-center p-8">No images yet</div>
          ) : (
            gallery.map(image => (
              <div key={image.id} className="bg-card border rounded-lg overflow-hidden">
                <div className="relative w-full h-48 bg-muted">
                  {image.image_url && (
                    <Image
                      src={image.image_url}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{image.title}</h3>
                  {image.category && <p className="text-sm text-muted-foreground mb-3">{image.category}</p>}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(image)}
                      className="text-blue-500 hover:underline text-sm flex-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="text-red-500 hover:underline text-sm flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
