"use client";

import { PHOTO_QUERYResult } from "@/sanity/types";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { EmptyContent, PageNotSetup } from "./MissingPage";
import { Image } from "./ImageWrapper";

interface PhotoGalleryProps {
  galleryData: PHOTO_QUERYResult;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ galleryData }) => {
  if (!galleryData || !galleryData.category) {
    return <PageNotSetup pageType="category" studioPath="category" />;
  }
  if (!galleryData.photos || galleryData.photos.length === 0) {
    return (
      <EmptyContent
        contentType={`Photos for "${galleryData.category.title}"`}
        createHref={`/studio/structure/category/${galleryData.category._id}`}
      />
    );
  }

  return (
    <Gallery id={`gallery-${galleryData.category._id}`}>
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
            />
          )}
        </Item>
      ))}
    </Gallery>
  );
};

export default PhotoGallery;
