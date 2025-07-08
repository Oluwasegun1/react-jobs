// lib/sanityClient.ts
import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "drrxiqbx",
  dataset: "production",
  apiVersion: "2025-07-08",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_API_TOKEN, // ✅ Correct placement
});
