import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Public client for image operations and client-side usage
// No token needed for public images
export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // No token - this is for public access only
});
