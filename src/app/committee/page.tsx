"use client";
import { useState } from "react";
import { committeeMembers } from "@/lib/data";

export default function Committee() {
  const [search, setSearch] = useState("");

  const filteredMembers = committeeMembers.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Current Committee</h1>
        <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-6" />
        <p className="opacity-80 max-w-2xl mx-auto">
          Meet the dedicated individuals leading BMMSWC towards a brighter future.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search members..."
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col items-center p-6 text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary/10 group-hover:border-secondary transition-colors">
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
            <p className="text-secondary font-medium mb-3">{member.position}</p>
            <p className="opacity-70 text-sm">{member.profile}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
