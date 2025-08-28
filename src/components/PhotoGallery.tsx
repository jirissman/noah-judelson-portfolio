"use client";

import { PHOTO_QUERYResult } from "@/sanity/types";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { EmptyContent, PageNotSetup } from "./MissingPage";
import Image from "./ImageWrapper";

interface PhotoGalleryProps {
  galleryData: PHOTO_QUERYResult;
  columnWidth?: number;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ galleryData }) => {
  if (!galleryData || !galleryData.category) {
    return <PageNotSetup pageType="category" studioPath="category" />;
  }
  if (!galleryData.photos || galleryData.photos.length === 0) {
    return (
      <EmptyContent
        contentType={`Photos for "${galleryData.category.title}"`}
        createHref={`/studio/structure/category;${galleryData.category._id}`}
        message="Did you expect to see photos here? Check that photos are marked as 🟢 Published (not 🟡 Draft) in Sanity Studio."
      />
    );
  }

  return (
    <Gallery>
      <div
        id={`gallery-${galleryData.category._id}`}
        style={{
          columns: `${galleryData.category.columnWidth}px`,
        }}
      >
        {galleryData.photos.map((photo) => (
          <Item
            key={photo.id}
            original={photo.url!}
            thumbnail={photo.preview!}
            width={photo.dimensions!.width!}
            height={photo.dimensions!.height!}
          >
            {({ ref, open }) => (
              <Image
                ref={ref}
                onClick={open}
                id={photo.id!}
                alt={photo.alt || `${galleryData.category.title} photograph`}
                width={galleryData.category.columnWidth!}
                style={{
                  display: "block",
                  maxWidth: "100%",
                  width: "100%",
                  height: "auto",
                  paddingBottom: "1rem",
                  cursor: "pointer",
                }}
              />
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
}
