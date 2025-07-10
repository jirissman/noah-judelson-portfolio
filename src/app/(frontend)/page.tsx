import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import imageUrlBuilder from "@sanity/image-url";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { CATEGORY_QUERY } from "@/sanity/lib/queries";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function HomePage() {
  const { data: categories } = await sanityFetch({ query: CATEGORY_QUERY });

  const backupPhotos = [
    {
      image: "/static-images/_DSC4845.JPG.jpeg",
      alt: "A person standing in a ravine of red rock",
    },
    {
      image: "/static-images/_DSC4716.JPG.jpeg",
      alt: "A car on a cliff overlooking a canyon",
    },
    {
      image: "/static-images/_DSC5605.JPEG",
      alt: "Woman standing on a cliff overlooking a lake high up in the mountains",
    },
  ];

  return (
    <div className="scroll-container">
      <Header />
      {/* Horizontal category panels */}
      <main className="pt-0 flex h-screen">
        {categories.map((category, index) => (
          <Link
            key={`${category._id}`}
            href={`/${category?.slug?.current}`}
            className="group block flex-1"
          >
            <section
              className="relative w-full h-full bg-cover bg-center bg-no-repeat flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(
                ${
                  category?.coverPhoto
                    ? urlFor(category.coverPhoto)?.url() || ""
                    : backupPhotos[index % backupPhotos.length].image
                }
                )`,
              }}
            >
              {/* Category content overlay */}
              <div className="text-center text-white z-10 transform transition-all duration-500 group-hover:scale-110 px-4">
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 tracking-wide">
                  {category.title}
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
