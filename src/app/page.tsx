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

      {/* Full-screen category images */}
      <main className="pt-0">
        {categories.map((category, index) => (
          <Link key={category.href} href={category.href} className="group block">
            <section 
              className="snap-section relative w-full bg-cover bg-center bg-no-repeat flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${category.image})`,
              }}
            >
              {/* Category content overlay */}
              <div className="text-center text-white z-10 transform transition-all duration-500 group-hover:scale-110 px-4">
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 tracking-wide">
                  {category.label}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
                
                {/* Animated arrow - only show on last item */}
                {index === categories.length - 1 && (
                  <div className="mt-8 opacity-80 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-2">
                    <svg 
                      className="w-8 h-8 mx-auto animate-bounce" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                      />
                    </svg>
                    <p className="text-sm mt-2 opacity-75">Scroll for more</p>
                  </div>
                )}
              </div>
              
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>
            </section>
          </Link>
        ))}
      </main>

      {/* Footer appears after all categories */}
      <div className="snap-section">
        <Footer />
      </div>
    </div>
  );
}