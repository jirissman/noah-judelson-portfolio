import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-32 pb-16 px-4 md:px-8">
        {/* Main content container with image and text card */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[70vh]">
            
            {/* Large portrait image */}
            <div className="order-2 lg:order-1">
              <div className="relative aspect-[3/4] w-full max-w-lg mx-auto lg:max-w-none">
                <img 
                  src="/static-images/_DSC4973.JPG.jpeg" 
                  alt="Noah Judelson - Professional Photographer"
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>

            {/* Text content card */}
            <div className="order-1 lg:order-2">
              <div className="bg-gray-900/80 backdrop-blur-sm p-8 lg:p-12 rounded-lg border border-gray-800 shadow-2xl">
                {/* Name header */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-wide">
                  NOAH JUDELSON
                </h1>
                
                {/* Quote */}
                <blockquote className="text-base md:text-lg italic text-gray-300 mb-8 leading-relaxed border-l-4 border-gray-600 pl-4">
                  "If I could tell the story with words, I wouldn't need to lug around a camera."
                  <footer className="text-sm font-normal mt-2 text-gray-400">
                    – Louis Hine
                  </footer>
                </blockquote>

                {/* Bio content */}
                <div className="text-base md:text-lg leading-relaxed space-y-4 text-gray-200 my-20">
                  <p>
                    I'm no poet, but I do love telling a story by capturing unique moments in time.
                  </p>
                  
                  <p>
                    It all started when I was 16 visiting the Grand Canyon on a family vacation. I 
                    was quickly frustrated when the images I snapped didn't do justice to the 
                    incredible landscape in front of me. Since that trip, I've brought my camera 
                    along to capture my adventures along the coast, in the mountains, and on the 
                    streets of foreign cities.
                  </p>
                  
                  <p>
                    Whether I'm documenting the raw beauty of natural landscapes, the architectural 
                    elegance of real estate properties, or the dynamic energy of motion and action, 
                    my goal is always the same: to freeze moments that tell compelling stories and 
                    evoke genuine emotions.
                  </p>
                  
                  <p>
                    My work spans across landscape photography, real estate imagery, and motion 
                    photography, each requiring a unique approach but all unified by my passion 
                    for visual storytelling. Every shoot is an opportunity to discover something 
                    new and share that discovery with others.
                  </p>
                  
                  <p className="pt-4">
                    Thanks for checking out my work!
                  </p>
                  
                  <p className="text-xl font-light pt-2">
                    Noah
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
