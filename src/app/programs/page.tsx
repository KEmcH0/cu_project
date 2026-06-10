import { BookOpen, Heart, Users, GraduationCap } from "lucide-react";

export default function Programs() {
  const programs = [
    { title: "Educational Support", icon: GraduationCap, desc: "Scholarships, stipends, and educational materials for the needy and meritorious students." },
    { title: "Student Welfare", icon: Heart, desc: "Financial and moral support during medical emergencies and natural disasters." },
    { title: "Training & Workshops", icon: BookOpen, desc: "Skill development sessions, career counseling, and leadership building." },
    { title: "Community Service", icon: Users, desc: "Blood donation camps, winter clothes distribution, and awareness programs." },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Programs & Activities</h1>
        <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-6" />
        <p className="opacity-80 max-w-2xl mx-auto">
          Our initiatives are designed to foster growth, education, and community well-being.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {programs.map((prog, i) => (
          <div key={i} className="bg-card border rounded-2xl p-8 hover:shadow-lg transition-all flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
              <prog.icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">{prog.title}</h3>
              <p className="opacity-80 leading-relaxed">{prog.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
