import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Capturing Life's Beautiful Moments
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional photography services specializing in landscapes, real estate, and motion photography.
          </p>
        </section>

        {/* Photography Categories */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Photography Categories
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Landscape */}
            <Link href="/landscape" className="group">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
                    </svg>
                    <h4 className="text-2xl font-bold">Landscape</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                    Breathtaking natural landscapes and scenic views that capture the beauty of nature.
                  </p>
                </div>
              </div>
            </Link>

            {/* Real Estate */}
            <Link href="/real-estate" className="group">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3L19 9.3z"/>
                    </svg>
                    <h4 className="text-2xl font-bold">Real Estate</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                    Professional property photography that showcases homes and commercial spaces.
                  </p>
                </div>
              </div>
            </Link>

            {/* Motion */}
            <Link href="/motion" className="group">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
                    </svg>
                    <h4 className="text-2xl font-bold">Motion</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                    Dynamic motion photography capturing movement, sports, and action sequences.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gray-50 rounded-lg p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Capture Your Vision?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Let's work together to create stunning photography that tells your story.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get In Touch
          </Link>        </section>
      </main>

      <Footer />
    </div>
  );
}