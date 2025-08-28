import Link from "next/link";
import { EmptyContent } from "@/components/MissingPage";
import { sanityFetch } from "@/sanity/lib/live";
import Image from "../../components/ImageWrapper";
import { CATEGORY_QUERY } from "@/sanity/lib/queries";

export default async function HomePage() {
  const { data: categories } = await sanityFetch({ query: CATEGORY_QUERY });

  // Handle case where no categories exist
  if (!categories || categories.length === 0) {
    return (
      <EmptyContent
        contentType="Photo Categories"
        createHref="/studio/structure/category"
      />
    );
  }

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
      {/* Horizontal category panels */}
      <main className="flex h-screen pt-0">
        {categories.map((category, index) => (
          <Link
            key={`${category._id}`}
            href={`/${category?.slug?.current}`}
            className="group block flex-1"
          >
            <section className="relative flex h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105">
              {/* Background image */}
              <Image
                id={category?.photo?.id!}
                alt={
                  category?.photo?.alt ||
                  `${category?.slug?.current} cover photo`
                }
                preview={category?.photo?.preview!}
                className="absolute top-0 left-0 z-1 h-full w-full object-cover select-none"
                width={1400}
              />
              {/* Gradient overlay for better text readability */}
              <div
                className="pointer-events-none absolute inset-0 z-5"
                style={{
                  background:
                    "radial-gradient(ellipse 120% 60% at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 80%)",
                }}
              ></div>

              {/* Category content overlay */}
              <div className="relative z-10 transform px-4 text-center text-white transition-all duration-500 group-hover:scale-110">
                <h2 className="mb-4 text-2xl font-bold tracking-wide sm:text-4xl md:text-6xl">
                  {category.title}
                </h2>
                <p className="mx-auto max-w-lg text-sm font-light opacity-90 transition-opacity duration-300 group-hover:opacity-100 sm:text-lg md:text-xl">
                  {category.description}
                </p>
              </div>
            </section>
          </Link>
        ))}
      </main>
    </div>
  );
}
