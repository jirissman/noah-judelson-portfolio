import { createClient } from "next-sanity";
import { token } from "./token";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token, // Use this for authenticated requests, e.g., for preview mode
  stega: { studioUrl: "/studio" },
});

export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // No token - this is for public access only
});
