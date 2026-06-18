'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

interface AlumniMember {
  id?: string
  name: string
  batch: string
  photo?: string
  current_role?: string
  created_at?: string
}

export default function AdminAlumni() {
  const [alumni, setAlumni] = useState<AlumniMember[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', batch: '', photo: '', current_role: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchAlumni()
  }, [])

  const fetchAlumni = async () => {
    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setAlumni(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      const { error } = await supabase
        .from('alumni')
        .update(formData)
        .eq('id', editingId)
      
      if (!error) {
        setEditingId(null)
        setFormData({ name: '', batch: '', photo: '', current_role: '' })
        fetchAlumni()
      }
    } else {
      const { error } = await supabase
        .from('alumni')
        .insert([formData])
      
      if (!error) {
        setFormData({ name: '', batch: '', photo: '', current_role: '' })
        fetchAlumni()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await supabase.from('alumni').delete().eq('id', id)
      fetchAlumni()
    }
  }

  const handleEdit = (member: AlumniMember) => {
    setEditingId(member.id || '')
    setFormData({
      name: member.name,
      batch: member.batch,
      photo: member.photo || '',
      current_role: member.current_role || '',
    })
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-primary hover:underline">← Admin</Link>
          <h1 className="text-3xl font-bold">Manage Alumni</h1>
        </div>

        {/* Form */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Alumni Member</h2>
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
              placeholder="Batch (e.g., 2020)"
              value={formData.batch}
              onChange={(e) => setFormData({...formData, batch: e.target.value})}
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
            <input
              type="text"
              placeholder="Current Role"
              value={formData.current_role}
              onChange={(e) => setFormData({...formData, current_role: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg bg-background"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
              >photo: '', 
                {editingId ? 'Update' : 'Add'} Alumni
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ name: '', batch: '', photo: '', current_role: '' })
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Alumni List */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted border-b">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Batch</th>
                <th className="text-left p-4">Current Role</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-4 text-center">Loading...</td></tr>
              ) : alumni.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-center">No alumni yet</td></tr>
              ) : (
                alumni.map(member => (
                  <tr key={member.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">{member.name}</td>
                    <td className="p-4">{member.batch}</td>
                    <td className="p-4">{member.current_role || '–'}</td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id!)}
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
