import { PortableTextComponents } from "next-sanity";
import SanityImage from "@/components/SanityImage";

export const components: PortableTextComponents = {
  types: {
    image: (props) =>
      props.value ? (
        <SanityImage
          image={props.value}
          variant="card"
          className="not-prose h-auto w-full rounded-lg"
          alt={props?.value?.alt || ""}
        />
      ) : null,
  },
};
