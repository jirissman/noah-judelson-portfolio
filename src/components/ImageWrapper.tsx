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
  (props, ref) => (
    <SanityImage
      {...props}
      as={React.forwardRef<HTMLImageElement>((imgProps, imgRef) => (
        <img {...imgProps} ref={ref || imgRef} />
      ))}
      projectId={projectId}
      dataset={dataset}
    />
  ),
);

export default Image;
