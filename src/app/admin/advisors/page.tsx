'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

interface Advisor {
  id: string
  name: string
  designation: string
  photo?: string
  bio?: string
  created_at: string
}

export default function AdminAdvisors() {
  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', designation: '', photo: '', bio: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchAdvisors()
  }, [])

  const fetchAdvisors = async () => {
    const { data, error } = await supabase
      .from('advisors')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setAdvisors(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      const { error } = await supabase
        .from('advisors')
        .update(formData)
        .eq('id', editingId)
      
      if (!error) {
        setEditingId(null)
        setFormData({ name: '', designation: '', photo: '', bio: '' })
        fetchAdvisors()
      }
    } else {
      const { error } = await supabase
        .from('advisors')
        .insert([formData])
      
      if (!error) {
        setFormData({ name: '', designation: '', photo: '', bio: '' })
        fetchAdvisors()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await supabase.from('advisors').delete().eq('id', id)
      fetchAdvisors()
    }
  }

  const handleEdit = (advisor: Advisor) => {
    setEditingId(advisor.id)
    setFormData({
      name: advisor.name,
      designation: advisor.designation,
      photo: advisor.photo || '',
      bio: advisor.bio || '',
    })
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-primary hover:underline">← Admin</Link>
          <h1 className="text-3xl font-bold">Manage Advisors</h1>
        </div>

        {/* Form */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Advisor</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg bg-background"
              required
            />
            <input
              type="text"
              placeholder="Designation"
              value={formData.designation}
              onChange={(e) => setFormData({...formData, designation: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg bg-background"
              required
            />
            <input
              type="text"
              placeholder="Photo URL"
              value={formData.photo}
              onChange={(e) => setFormData({...formData, photo: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            />
            <textarea
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg bg-background min-h-20"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                {editingId ? 'Update' : 'Add'} Advisor
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ name: '', designation: '', photo: '', bio: '' })
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Advisors List */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted border-b">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Designation</th>
                <th className="text-left p-4">Bio</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-4 text-center">Loading...</td></tr>
              ) : advisors.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-center">No advisors yet</td></tr>
              ) : (
                advisors.map(advisor => (
                  <tr key={advisor.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">{advisor.name}</td>
                    <td className="p-4">{advisor.designation}</td>
                    <td className="p-4 text-sm truncate">{advisor.bio || '–'}</td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleEdit(advisor)}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(advisor.id)}
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
