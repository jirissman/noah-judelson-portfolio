"use client";

import React from "react";
import {
  useNextSanityImage,
  UseNextSanityImageOptions,
} from "next-sanity-image";
import Image, { ImageProps } from "next/image";
import { publicClient } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Constants to avoid magic numbers
const IMAGE_QUALITY = {
  LOW: 75,
  MEDIUM: 85,
  HIGH: 90,
  MAXIMUM: 95,
} as const;

const IMAGE_DIMENSIONS = {
  THUMBNAIL: { width: 300, height: 300 },
  CARD: { width: 400, height: 250 },
  GALLERY: { width: 800 },
  HERO: { width: 1920, height: 800 },
  FULLSCREEN: { width: 2400 },
  AVATAR: { width: 150, height: 150 },
  BANNER: { width: 1200, height: 300 },
} as const;

const DEFAULT_QUALITY = IMAGE_QUALITY.MEDIUM;
const DEFAULT_FIT = "crop" as const;
const DEFAULT_CROP = "center" as const;
const DEFAULT_ALT = "Image";

// Simple base64 placeholder for blur effect
const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bK";

type ImageVariant =
  | "thumbnail"
  | "card"
  | "gallery"
  | "hero"
  | "fullscreen"
  | "avatar"
  | "banner";

type ImageFit = "crop" | "clip" | "fill" | "fillmax" | "max" | "scale" | "min";
type ImageCrop =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "focalpoint"
  | "entropy";

interface SanityImageProps
  extends Omit<ImageProps, "src" | "width" | "height" | "alt"> {
  /** The Sanity image asset reference */
  image: SanityImageSource;
  /** Required alt text for accessibility */
  alt: string;
  /** Predefined image variants for common use cases */
  variant?: ImageVariant;
  /** Custom width (overrides variant width) */
  width?: number;
  /** Custom height (overrides variant height) */
  height?: number;
  /** Image quality (0-100) */
  quality?: number;
  /** How the image should be fitted to the dimensions */
  fit?: ImageFit;
  /** Crop position when using fit="crop" */
  crop?: ImageCrop;
  /** Whether to show a blur placeholder while loading */
  showBlurPlaceholder?: boolean;
}

// Variant configurations using semantic constants
const VARIANT_CONFIGS: Record<
  ImageVariant,
  {
    width: number;
    height?: number;
    fit?: ImageFit;
    crop?: ImageCrop;
    quality: number;
  }
> = {
  thumbnail: {
    ...IMAGE_DIMENSIONS.THUMBNAIL,
    fit: DEFAULT_FIT,
    crop: DEFAULT_CROP,
    quality: IMAGE_QUALITY.LOW,
  },
  card: {
    ...IMAGE_DIMENSIONS.CARD,
    fit: DEFAULT_FIT,
    crop: DEFAULT_CROP,
    quality: DEFAULT_QUALITY,
  },
  gallery: {
    ...IMAGE_DIMENSIONS.GALLERY,
    quality: DEFAULT_QUALITY,
  },
  hero: {
    ...IMAGE_DIMENSIONS.HERO,
    fit: DEFAULT_FIT,
    crop: DEFAULT_CROP,
    quality: IMAGE_QUALITY.HIGH,
  },
  fullscreen: {
    ...IMAGE_DIMENSIONS.FULLSCREEN,
    quality: IMAGE_QUALITY.MAXIMUM,
  },
  avatar: {
    ...IMAGE_DIMENSIONS.AVATAR,
    fit: DEFAULT_FIT,
    crop: DEFAULT_CROP,
    quality: DEFAULT_QUALITY,
  },
  banner: {
    ...IMAGE_DIMENSIONS.BANNER,
    fit: DEFAULT_FIT,
    crop: DEFAULT_CROP,
    quality: DEFAULT_QUALITY,
  },
};

/**
 * Creates image transformation options based on variant and custom overrides
 */
function buildImageOptions(
  variant?: ImageVariant,
  customWidth?: number,
  customHeight?: number,
  quality?: number,
  fit?: ImageFit,
  crop?: ImageCrop,
): UseNextSanityImageOptions {
  // Get base config from variant or use sensible defaults
  const baseConfig = variant ? VARIANT_CONFIGS[variant] : {
    width: IMAGE_DIMENSIONS.GALLERY.width,
    quality: DEFAULT_QUALITY,
  };

  // Build final configuration with custom overrides
  const config = {
    width: customWidth ?? baseConfig.width,
    height: customHeight ?? baseConfig.height,
    quality: quality ?? baseConfig.quality ?? DEFAULT_QUALITY,
    fit: fit ?? baseConfig.fit,
    crop: crop ?? baseConfig.crop,
  };

  return {
    imageBuilder: (builder) => {
      let imageBuilder = builder.width(config.width);

      if (config.height) {
        imageBuilder = imageBuilder.height(config.height);
      }

      imageBuilder = imageBuilder.quality(config.quality);

      if (config.fit) {
        imageBuilder = imageBuilder.fit(config.fit);
      }

      if (config.crop) {
        imageBuilder = imageBuilder.crop(config.crop);
      }

      return imageBuilder;
    },
  };
}

/**
 * Extracts blur placeholder from Sanity image metadata
 */
function getBlurPlaceholder(image: SanityImageSource): string | undefined {
  if (!image || typeof image !== "object" || !("asset" in image)) {
    return undefined;
  }

  const asset = image.asset;
  if (!asset || typeof asset !== "object" || !("metadata" in asset)) {
    return undefined;
  }

  const metadata = asset.metadata;
  return metadata && typeof metadata === "object" && "lqip" in metadata
    ? (metadata.lqip as string)
    : undefined;
}

/**
 * A simplified Sanity image component that wraps Next.js Image with Sanity optimization
 *
 * @example
 * // Simple usage with variant
 * <SanityImage image={photo} variant="thumbnail" alt="Photo description" />
 *
 * @example
 * // Custom dimensions
 * <SanityImage 
 *   image={photo} 
 *   width={600} 
 *   height={400} 
 *   fit="crop" 
 *   alt="Custom sized image" 
 * />
 */
const SanityImage = React.forwardRef<HTMLImageElement, SanityImageProps>(
  (
    {
      image,
      alt,
      variant,
      width,
      height,
      quality,
      fit,
      crop,
      showBlurPlaceholder = true,
      ...imageProps
    },
    ref,
  ) => {
    // Build image transformation options
    const imageOptions = buildImageOptions(
      variant,
      width,
      height,
      quality,
      fit,
      crop,
    );

    // Generate optimized image props
    const sanityImageProps = useNextSanityImage(
      publicClient,
      image,
      imageOptions,
    );

    // Handle missing image gracefully
    if (!sanityImageProps) {
      return null;
    }

    // Get blur placeholder if enabled
    const lqip = showBlurPlaceholder ? getBlurPlaceholder(image) : undefined;
    const blurDataURL = lqip || BLUR_PLACEHOLDER;

    return (
      <Image
        ref={ref}
        {...sanityImageProps}
        {...imageProps}
        alt={alt}
        placeholder={showBlurPlaceholder ? "blur" : undefined}
        blurDataURL={showBlurPlaceholder ? blurDataURL : undefined}
      />
    );
  },
);

SanityImage.displayName = "SanityImage";

export default SanityImage;


