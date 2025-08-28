"use client";

import React from "react";
import { SanityImage, type WrapperProps } from "sanity-image";
import { projectId, dataset } from "@/sanity/env";

/**
 * A wrapper around `SanityImage` that configures the `baseUrl` prop
 * automatically.
 *
 * Simple usage:
 * @example
 * ```tsx
 * <Image
 *   id={image._id}
 *   hotspot={...}
 *   crop={...}
 *   width={450} // anticipated display width of the image
 *   alt="Some alt text. Can be dynamic/computed."
 * />
 * ```
 */
export const Image = React.forwardRef<HTMLImageElement, WrapperProps<"img">>(
  (props, ref) => {
    const ImgComponent = React.forwardRef<HTMLImageElement>(
      (imgProps, imgRef) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...(imgProps as React.ImgHTMLAttributes<HTMLImageElement>)}
          ref={ref || imgRef}
        />
      ),
    );
    ImgComponent.displayName = "ImgComponent";

    return (
      <SanityImage
        {...props}
        as={ImgComponent}
        projectId={projectId}
        dataset={dataset}
      />
    );
  },
);

Image.displayName = "Image";

export default Image;
