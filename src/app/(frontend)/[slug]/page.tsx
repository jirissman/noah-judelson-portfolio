import { sanityFetch } from "@/sanity/lib/live";
import { PHOTO_QUERY } from "@/sanity/lib/queries";
import { EmptyContent } from "@/components/MissingPage";
import PhotoGallery from "@/components/PhotoGallery";

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

  return (
    <div className="bg-black text-white">
      <div className="px-4 pt-32 pb-16 md:px-8">
        <PhotoGallery photos={photos} category={category} />
      </div>
    </div>
  );
}
