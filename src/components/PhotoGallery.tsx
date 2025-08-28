"use client";

import React from "react";
import { PHOTO_QUERYResult } from "@/sanity/types";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import SanityImage from "./SanityImage";
import { urlFor } from "@/sanity/lib/image";

interface PhotoGalleryProps {
  photos: PHOTO_QUERYResult;
  category: string;
}

interface PhotoItemProps {
  photo: NonNullable<PHOTO_QUERYResult>[0];
  category: string;
  index: number;
}

function PhotoItem({ photo, category, index }: PhotoItemProps) {
  // Generate URLs for photoswipe
  const thumbnailUrl = urlFor(photo).width(400).quality(85).url();
  const originalUrl = urlFor(photo).width(1200).quality(90).url();

  return (
    <Item
      key={photo._key || index}
      original={originalUrl}
      thumbnail={thumbnailUrl}
      width={1200}
      height={800} // Reasonable default, will be adjusted by photoswipe
    >
      {({ ref, open }) => (
        <SanityImage
          ref={ref}
          onClick={open}
          image={photo}
          variant="gallery"
          alt={photo.alt || `${category} photograph ${index + 1}`}
          style={{
            width: "100%",
            height: "auto",
            marginBottom: "1rem",
            cursor: "pointer",
          }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          showBlurPlaceholder={true}
        />
      )}
    </Item>
  );
}

export default function PhotoGallery({ photos, category }: PhotoGalleryProps) {
  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <Gallery>
      <div className="columns-[300px]">
        {photos.map((photo, index) => (
          <PhotoItem
            key={photo._key || index}
            photo={photo}
            category={category}
            index={index}
          />
        ))}
      </div>
    </Gallery>
  );
}
