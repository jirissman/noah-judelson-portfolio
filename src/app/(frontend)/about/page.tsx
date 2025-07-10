import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/sanity/portableTextComponents";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: about } = await sanityFetch({
    query: ABOUT_QUERY,
    params: await params,
  });

  if (!about) {
    notFound();
  }

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
                <Image
                  src={
                    about?.image
                      ? urlFor(about.image).width(600).height(800).url()
                      : "https://placehold.co/600x800/png"
                  }
                  alt="Noah Judelson - Professional Photographer"
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                  width={600}
                  height={800}
                />
              </div>
            </div>

            {/* Text content card */}
            <div className="order-1 lg:order-2">
              <div className="bg-gray-900/80 backdrop-blur-sm p-8 lg:p-12 rounded-lg border border-gray-800 shadow-2xl">
                {/* Name header */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-wide">
                  {about.title || "Noah Judelson"}
                </h1>

                {/* Quote */}
                <blockquote className="text-base md:text-lg italic text-gray-300 mb-8 leading-relaxed border-l-4 border-gray-600 pl-4">
                  &ldquo;If I could tell the story with words, I wouldn&rsquo;t
                  need to lug around a camera.&rdquo;
                  <footer className="text-sm font-normal mt-2 text-gray-400">
                    – Louis Hine
                  </footer>
                </blockquote>

                {/* Bio content */}
                {about?.body ? (
                  <PortableText value={about.body} components={components} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
