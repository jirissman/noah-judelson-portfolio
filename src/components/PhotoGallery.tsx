"use client";

import React from "react";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import { publicClient } from "@/sanity/lib/publicClient";
import { PHOTO_QUERYResult } from "@/sanity/types";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

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
  // Call hooks at the top level of this component
  const imageProps = useNextSanityImage(publicClient, photo);
  const thumbnailProps = useNextSanityImage(publicClient, photo, {
    imageBuilder: (builder) => builder.width(400),
  });
  const originalProps = useNextSanityImage(publicClient, photo, {
    imageBuilder: (builder) => builder.width(1200).quality(90),
  });

  // Handle potential null values
  if (!imageProps || !thumbnailProps || !originalProps) {
    return null;
  }

  return (
    <Item
      key={photo._key || index}
      original={originalProps.src}
      thumbnail={thumbnailProps.src}
      width={originalProps.width}
      height={originalProps.height}
    >
      {({ ref, open }) => (
        <Image
          ref={ref}
          onClick={open}
          {...imageProps}
          alt={photo.alt || `${category} photograph ${index + 1}`}
          style={{
            width: "100%",
            height: "auto",
            marginBottom: "1rem",
            cursor: "pointer",
          }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={
            photo.asset?.metadata?.lqip ||
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bK"
          }
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