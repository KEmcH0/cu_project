'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

interface CommitteeMember {
  id?: string
  name: string
  position: string
  photo?: string
  profile?: string
  created_at?: string
}

export default function AdminCommittee() {
  const [members, setMembers] = useState<CommitteeMember[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', position: '', photo: '', profile: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from('committee')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setMembers(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      const { error } = await supabase
        .from('committee')
        .update(formData)
        .eq('id', editingId)
      
      if (!error) {
        setEditingId(null)
        setFormData({ name: '', position: '', photo: '', profile: '' })
        fetchMembers()
      }
    } else {
      const { error } = await supabase
        .from('committee')
        .insert([formData])
      
      if (!error) {
        setFormData({ name: '', position: '', photo: '', profile: '' })
        fetchMembers()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await supabase.from('committee').delete().eq('id', id)
      fetchMembers()
    }
  }

  const handleEdit = (member: CommitteeMember) => {
    setEditingId(member.id || '')
    setFormData({
      name: member.name,
      position: member.position,
      photo: member.photo || '',
      profile: member.profile || '',
    })
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-primary hover:underline">← Admin</Link>
          <h1 className="text-3xl font-bold">Manage Committee</h1>
        </div>

        {/* Form */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Committee Member</h2>
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
              placeholder="Position"
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
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
              placeholder="Profile/Bio"
              value={formData.profile}
              onChange={(e) => setFormData({...formData, profile: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg bg-background min-h-20"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                {editingId ? 'Update' : 'Add'} Member
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ name: '', position: '', photo: '', profile: '' })
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Members List */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted border-b">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Position</th>
                <th className="text-left p-4">Profile</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-4 text-center">Loading...</td></tr>
              ) : members.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-center">No members yet</td></tr>
              ) : (
                members.map(member => (
                  <tr key={member.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">{member.name}</td>
                    <td className="p-4">{member.position}</td>
                    <td className="p-4 text-sm truncate">{member.profile || '–'}</td>
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
