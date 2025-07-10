// lib/sanityClient.ts
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "drrxiqbx",
  dataset: "production",
  apiVersion: "2025-07-08",
  useCdn: false,
  token:
    "sktKODknhJKf9UzzgzCTfFq3pyn7Yoy5ZH18M7DRzZ1wlCforacGIolWv7jODMJULQIlAjnHdblofeIWCu9Fh669wbocNiJOJDS3xyINPXM94rReQqfvfIJW63ituZkAyYC6a8IPn31TZEusuBVNbftUtQL7S7l2oBAppyHgApPmXpYzhjBK",

  // import.meta.env.VITE_SANITY_API_TOKEN, // ✅ Correct placement
});
