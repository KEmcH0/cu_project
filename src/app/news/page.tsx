import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export default function News() {
  const newsItems = [
    {
      id: 1,
      title: "Annual Scholarship Distribution 2024",
      date: "August 15, 2024",
      category: "Education",
      desc: "Providing financial support to meritorious students from the community to help them achieve their dreams.",
      img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Career Counseling Seminar",
      date: "September 10, 2024",
      category: "Workshop",
      desc: "A highly informative session for university students regarding job market trends and skill development.",
      img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Winter Clothes Distribution",
      date: "December 5, 2024",
      category: "Community Service",
      desc: "Distributed winter clothes among poor families in rural areas of Sylhet.",
      img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">News & Events</h1>
        <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-6" />
        <p className="opacity-80 max-w-2xl mx-auto">
          Stay updated with the latest happenings and upcoming events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item) => (
          <div key={item.id} className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border group flex flex-col">
            <div className="aspect-video bg-muted relative overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                {item.category}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-sm text-secondary font-medium mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> {item.date}
              </div>
              <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                {item.title}
              </h3>
              <p className="opacity-80 mb-6 line-clamp-3 text-sm">
                {item.desc}
              </p>
              <Link href={`/news/${item.id}`} className="text-primary font-bold flex items-center hover:text-secondary transition-colors mt-auto w-fit">
                Read More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
