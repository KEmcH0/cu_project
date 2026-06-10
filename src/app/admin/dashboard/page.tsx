export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['Committee', 'Advisors', 'Alumni', 'News & Events'].map(item => (
          <div key={item} className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-xl mb-4">{item}</h2>
            <div className="flex space-x-2">
              <button className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90">Add New</button>
              <button className="bg-secondary text-white px-3 py-1 rounded text-sm hover:bg-secondary/90">Manage</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 bg-muted p-6 rounded-xl border">
        <h2 className="font-bold text-xl mb-4">Note</h2>
        <p className="opacity-80">This is a placeholder dashboard. Secure authentication and dynamic backend CMS logic using tools like Prisma/Mongoose, NextAuth, and MongoDB/PostgreSQL will be required for production content management.</p>
      </div>
    </div>
  );
}
