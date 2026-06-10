"use client";
import { useState } from "react";
import { advisors } from "@/lib/data";

export default function Advisors() {
  const [search, setSearch] = useState("");

  const filteredAdvisors = advisors.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Honorable Advisors</h1>
        <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-6" />
        <p className="opacity-80 max-w-2xl mx-auto">
          Guiding lights of our community who provide wisdom and support.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search advisors..."
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {filteredAdvisors.map((advisor) => (
          <div key={advisor.id} className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-primary/10">
              <img src={advisor.photo} alt={advisor.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-1">{advisor.name}</h3>
              <p className="text-secondary font-medium mb-3">{advisor.designation}</p>
              <p className="opacity-70 text-sm mb-2">{advisor.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
