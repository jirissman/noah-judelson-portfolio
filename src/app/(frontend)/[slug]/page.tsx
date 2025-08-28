import { sanityFetch } from "@/sanity/lib/live";
import { PHOTO_QUERY } from "@/sanity/lib/queries";
import PhotoGallery from "@/components/PhotoGallery";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const resolvedParams = await params;
    const { data: galleryData } = await sanityFetch({
      query: PHOTO_QUERY,
      params: resolvedParams,
    });

    if (!galleryData) {
      notFound();
    }

    return (
      <div className="bg-black text-white">
        <div className="px-4 pt-32 pb-16 md:px-8">
          <PhotoGallery galleryData={galleryData} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading gallery data:", error);
    notFound();
  }
}
