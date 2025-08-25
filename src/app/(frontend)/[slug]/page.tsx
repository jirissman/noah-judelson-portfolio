import { sanityFetch } from "@/sanity/lib/live";
import { PHOTO_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { EmptyContent } from "@/components/MissingPage";
import Image from "next/image";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { data: photos } = await sanityFetch({
    query: PHOTO_QUERY,
    params: resolvedParams,
  });
  const category = resolvedParams.slug;

  if (!photos || photos.length === 0) {
    return (
      <EmptyContent
        contentType={`Photos for "${category}"`}
        createHref={`/studio/structure/category`}
      />
    );
  }

  const photoImageUrl = photos[0]
    ? urlFor(photos[0])?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div className="items-top grid gap-12 sm:grid-cols-2">
        <Image
          src={photoImageUrl || "https://placehold.co/550x310/png"}
          alt={photos[0]?.alt || `${category} photograph`}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height={310}
          width={550}
        />
      </div>
    </main>
  );
}
