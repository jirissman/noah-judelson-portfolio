import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  const categories = [
    {
      href: "/landscape",
      label: "Landscape",
      description: "Breathtaking scenic views",
      image: "/static-images/DunesDesktop.JPG.jpeg",
      alt: "Desert dunes landscape photography"
    },
    {
      href: "/real-estate",
      label: "Real Estate",
      description: "Professional property photography",
      image: "/static-images/_DSC4845.JPG.jpeg",
      alt: "Professional real estate photography"
    },
    {
      href: "/motion",
      label: "Motion",
      description: "Dynamic action and movement photography",
      image: "/static-images/_DSC4462-Enhanced-NR.JPEG",
      alt: "Pickup truck with raised suspension"
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