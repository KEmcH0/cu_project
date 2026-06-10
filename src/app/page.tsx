import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <div className="inline-block p-4 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
            <span className="text-secondary font-bold tracking-wider">EST. 2000</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl leading-tight">
            Bangladesh Manipuri Muslim <br className="hidden md:block" />
            <span className="text-secondary">Student Welfare Community</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-10">
            Empowering students, preserving heritage, and building a stronger community through education, unity, and excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/about"
              className="px-8 py-3 bg-secondary text-primary-foreground font-semibold rounded-full hover:bg-secondary/90 transition-all flex items-center justify-center gap-2"
            >
              Learn More <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all text-center"
            >
              Join Us
            </Link>
          </div>
        </div>
      </section>


      {/* Recent Activities Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Recent Activities</h2>
              <div className="w-24 h-1 bg-secondary rounded-full" />
            </div>
            <Link
              href="/news"
              className="hidden md:flex items-center text-primary font-medium hover:text-secondary transition-colors"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-background rounded-2xl overflow-hidden shadow-sm border group">
                <div className="aspect-video bg-primary/10 relative overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop`}
                    alt="Activity"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-secondary font-semibold mb-2">Activities</div>
                  <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                    Community Gathering 202{item + 2}
                  </h3>
                  <p className="opacity-80 mb-4 line-clamp-2 text-sm">
                    A short description about the event that happened recently in the community, providing value to students.
                  </p>
                  <Link href={`/news/${item}`} className="text-primary font-medium flex items-center hover:text-secondary transition-colors text-sm">
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
