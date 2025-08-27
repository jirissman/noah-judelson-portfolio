"use client";

import React from "react";
import {
  useNextSanityImage,
  UseNextSanityImageOptions,
} from "next-sanity-image";
import Image, { ImageProps } from "next/image";
import { publicClient } from "@/sanity/lib/publicClient";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type ImageVariant =
  | "thumbnail" // 300x300 crop
  | "card" // 400x250 crop
  | "gallery" // 800px width, auto height
  | "hero" // 1920x800 crop
  | "fullscreen" // 2400px width, auto height
  | "avatar" // 150x150 crop
  | "banner"; // 1200x300 crop

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
  extends Omit<ImageProps, "src" | "width" | "height"> {
  /** The Sanity image asset reference */
  image: SanityImageSource;

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

  /** Advanced: Custom image options (overrides all other transform props) */
  imageOptions?: UseNextSanityImageOptions;

  /** Fallback alt text if not provided in the image */
  fallbackAlt?: string;
  /** Custom CSS classes */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Whether to show a blur placeholder while loading */
  showBlurPlaceholder?: boolean;
}

interface SanityImageData {
  src: string;
  width: number;
  height: number;
}

// Predefined variant configurations
const VARIANT_CONFIGS: Record<
  ImageVariant,
  {
    width: number;
    height?: number;
    fit?: ImageFit;
    crop?: ImageCrop;
    quality?: number;
  }
> = {
  thumbnail: {
    width: 300,
    height: 300,
    fit: "crop",
    crop: "center",
    quality: 80,
  },
  card: { width: 400, height: 250, fit: "crop", crop: "center", quality: 85 },
  gallery: { width: 800, quality: 85 },
  hero: { width: 1920, height: 800, fit: "crop", crop: "center", quality: 90 },
  fullscreen: { width: 2400, quality: 95 },
  avatar: { width: 150, height: 150, fit: "crop", crop: "center", quality: 85 },
  banner: {
    width: 1200,
    height: 300,
    fit: "crop",
    crop: "center",
    quality: 85,
  },
};

/**
 * Creates image options based on variant and custom overrides
 */
function createImageOptions(
  variant?: ImageVariant,
  customWidth?: number,
  customHeight?: number,
  quality?: number,
  fit?: ImageFit,
  crop?: ImageCrop,
  customImageOptions?: UseNextSanityImageOptions,
): UseNextSanityImageOptions {
  // If custom imageOptions provided, use them directly
  if (customImageOptions) {
    return customImageOptions;
  }

  // Get base config from variant or use defaults
  const baseConfig = variant
    ? VARIANT_CONFIGS[variant]
    : { width: 800, quality: 85 };

  // Override with custom values
  const finalConfig = {
    width: customWidth ?? baseConfig.width,
    height: customHeight ?? baseConfig.height,
    quality: quality ?? baseConfig.quality,
    fit: fit ?? baseConfig.fit,
    crop: crop ?? baseConfig.crop,
  };

  return {
    imageBuilder: (builder) => {
      let imageBuilder = builder.width(finalConfig.width);

      if (finalConfig.height) {
        imageBuilder = imageBuilder.height(finalConfig.height);
      }

      if (finalConfig.quality) {
        imageBuilder = imageBuilder.quality(finalConfig.quality);
      }

      if (finalConfig.fit) {
        imageBuilder = imageBuilder.fit(finalConfig.fit);
      }

      if (finalConfig.crop) {
        imageBuilder = imageBuilder.crop(finalConfig.crop);
      }

      return imageBuilder;
    },
  };
}

/**
 * A highly reusable component that wraps Next.js Image with Sanity image optimization
 *
 * @example
 * // Simple usage with variant
 * <SanityImage
 *   image={photo}
 *   variant="thumbnail"
 *   alt="Photo description"
 * />
 *
 * @example
 * // Custom dimensions
 * <SanityImage
 *   image={photo}
 *   width={600}
 *   height={400}
 *   fit="crop"
 *   crop="center"
 *   alt="Custom sized image"
 * />
 *
 * @example
 * // Hero image
 * <SanityImage
 *   image={photo}
 *   variant="hero"
 *   alt="Hero banner"
 *   className="w-full h-screen object-cover"
 * />
 */
const SanityImage = React.forwardRef<HTMLImageElement, SanityImageProps>(
  (
    {
      image,
      variant,
      width,
      height,
      quality,
      fit,
      crop,
      imageOptions,
      fallbackAlt = "Image",
      className,
      style,
      showBlurPlaceholder = true,
      alt,
      ...imageProps
    },
    ref,
  ) => {
    // Create image options based on variant and custom props
    const finalImageOptions = createImageOptions(
      variant,
      width,
      height,
      quality,
      fit,
      crop,
      imageOptions,
    );

    // Generate the image props using useNextSanityImage
    const sanityImageProps = useNextSanityImage(
      publicClient,
      image,
      finalImageOptions,
    );

    // Handle case where image generation fails
    if (!sanityImageProps) {
      return null;
    }

    // Extract metadata for blur placeholder
    const imageAsset =
      image && typeof image === "object" && "asset" in image
        ? image.asset
        : null;
    const lqip =
      imageAsset && typeof imageAsset === "object" && "metadata" in imageAsset
        ? imageAsset.metadata?.lqip
        : undefined;

    // Default blur placeholder
    const defaultBlurDataURL =
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bK";

    return (
      <Image
        ref={ref}
        {...sanityImageProps}
        {...imageProps}
        alt={alt || fallbackAlt}
        className={className}
        style={style}
        placeholder={showBlurPlaceholder ? "blur" : undefined}
        blurDataURL={
          showBlurPlaceholder ? lqip || defaultBlurDataURL : undefined
        }
      />
    );
  },
);

SanityImage.displayName = "SanityImage";

export default SanityImage;

/**
 * Hook to get multiple image variants from a single Sanity image with clean API
 *
 * @example
 * const { thumbnail, display, fullSize } = useSanityImageVariants(photo, {
 *   thumbnail: { variant: 'thumbnail' },
 *   display: { variant: 'gallery' },
 *   fullSize: { width: 1600, quality: 90 }
 * });
 */
export function useSanityImageVariants<T extends Record<string, VariantConfig>>(
  image: SanityImageSource,
  variants: T,
): Record<keyof T, SanityImageData | null> {
  const results = {} as Record<keyof T, SanityImageData | null>;

  for (const [key, config] of Object.entries(variants)) {
    const imageOptions = createImageOptions(
      config.variant,
      config.width,
      config.height,
      config.quality,
      config.fit,
      config.crop,
      config.imageOptions,
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const imageProps = useNextSanityImage(publicClient, image, imageOptions);
    results[key as keyof T] = imageProps
      ? {
          src: imageProps.src,
          width: imageProps.width,
          height: imageProps.height,
        }
      : null;
  }

  return results;
}

interface VariantConfig {
  variant?: ImageVariant;
  width?: number;
  height?: number;
  quality?: number;
  fit?: ImageFit;
  crop?: ImageCrop;
  imageOptions?: UseNextSanityImageOptions;
}
