import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "h3s6x795",
  dataset: "production",
  apiVersion: "2025-11-06",
  useCdn: true,
});
