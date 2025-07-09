import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  const categories = [
    {
      href: "/landscape",
      label: "Landscape",
      description: "Breathtaking natural landscapes and scenic views",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Mountain landscape photography"
    },
    {
      href: "/real-estate",
      label: "Real Estate",
      description: "Professional property photography",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80",
      alt: "Modern house exterior"
    },
    {
      href: "/motion",
      label: "Motion",
      description: "Dynamic action and movement photography",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Racing car in motion"
    }
  ];

  return (
    <div className="scroll-container">
      <Header />

      {/* Horizontal category panels */}
      <main className="pt-0 flex h-screen">
        {categories.map((category, index) => (
          <Link key={category.href} href={category.href} className="group block flex-1">
            <section 
              className="relative w-full h-full bg-cover bg-center bg-no-repeat flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${category.image})`,
              }}
            >
              {/* Category content overlay */}
              <div className="text-center text-white z-10 transform transition-all duration-500 group-hover:scale-110 px-4">
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 tracking-wide">
                  {category.label}
                </h2>
                <p className="text-sm sm:text-lg md:text-xl font-light max-w-lg mx-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
              </div>
              
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>
            </section>
          </Link>
        ))}
      </main>

      {/* Footer appears below the panels */}
      <Footer />
    </div>
  );
}