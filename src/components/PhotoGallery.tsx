import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Photo {
  title?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    hotspot?: any;
    crop?: any;
    alt?: string;
    _type: "image";
  };
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  if (!photos || photos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 text-lg">No photos available in this gallery.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {photos.map((photo, index) => {
          const imageUrl = photo.image
            ? urlFor(photo.image).width(550).height(310).url()
            : "https://placehold.co/550x310/png";

          return (
            <div key={index} className="group relative overflow-hidden rounded-xl">
              <Image
                src={imageUrl}
                alt={
                  photo.image?.alt || 
                  photo.title || 
                  `Professional photograph ${index + 1}`
                }
                className="aspect-video w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                height={310}
                width={550}
              />
              {photo.title && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold drop-shadow-md">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
