import { sanityFetch } from "@/sanity/lib/live";
import { PHOTO_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  const photoImageUrl = photos[0]?.image
    ? urlFor(photos[0].image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div className="grid items-top gap-12 sm:grid-cols-2">
        <Image
          src={photoImageUrl || "https://placehold.co/550x310/png"}
          alt={photos[0]?.image?.alt || "Professional photograph"}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height="310"
          width="550"
        />
      </div>
    </main>
  );
}