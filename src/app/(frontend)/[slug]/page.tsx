import { sanityFetch } from "@/sanity/lib/live";
import { PHOTO_QUERY } from "@/sanity/lib/queries";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import PhotoGallery from "@/components/PhotoGallery";
import PhotoGalleryHeader from "@/components/PhotoGalleryHeader";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: photos } = await sanityFetch({
    query: PHOTO_QUERY,
    params: await params,
  });
  if (!photos || photos.length === 0) {
    notFound();
  }

  return (
    <div className="scroll-container">
      <Header />
      <PhotoGalleryHeader
        title={photos[0].category?.title || "Photo Gallery"}
        description={photos[0].category?.description || "Explore our photo collection."}
      />
      <PhotoGallery photos={photos.map(photo => ({
        ...photo,
        title: photo.title || undefined,
        image: photo.image || undefined,
        category: photo.category || undefined
      }))} />
      {/* <main className="container mx-auto grid gap-12 p-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {photos.map((photo, index) => {
            const imageUrl = photo.image
              ? urlFor(photo.image).width(550).height(310).url()
              : "https://placehold.co/550x310/png";

            return (
              <div key={index} className="group relative">
                <Image
                  src={imageUrl}
                  alt={
                    photo.image?.alt || `Professional photograph ${index + 1}`
                  }
                  className="aspect-video w-full rounded-xl object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  height="310"
                  width="550"
                />
              </div>
            );
          })}
        </div>
      </main> */}
    </div>
  );
}
