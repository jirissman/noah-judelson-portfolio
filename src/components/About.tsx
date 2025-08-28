import { components } from "@/sanity/portableTextComponents";
import { PortableText } from "next-sanity";
import { ABOUT_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "./ImageWrapper";

export function About(props: NonNullable<ABOUT_QUERYResult>) {
  const { title, body, image } = props;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid min-h-[70vh] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Large portrait image */}
        {image ? (
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto">
              <Image
                id={image.asset?._ref!}
                alt={image.alt ? `${image.alt}` : "Professional Photographer"}
                mode="cover"
                className="h-auto w-full max-w-full rounded-lg shadow-2xl"
                width={600}
                height={800}
              />
            </div>
          </div>
        ) : null}

        {/* Text content card */}
        <div className="order-1 lg:order-2">
          <div className="rounded-lg border border-gray-800 bg-gray-900/80 p-8 shadow-2xl backdrop-blur-sm lg:p-12">
            {title ? (
              <h1 className="mb-6 text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl">
                {title}
              </h1>
            ) : null}

            {body ? (
              <div className="prose lg:prose-lg prose-invert max-w-none">
                <PortableText value={body} components={components} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
