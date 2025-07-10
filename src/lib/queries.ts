// lib/queries.ts
import { client } from "./sanityClient";
export async function getJobs() {
  return await client.fetch(`*[_type == "job"]{
    _id,
    title,
    type,
    location,
    description,
    salary,
    company->{
      name,
      description,
      contactEmail,
      contactPhone
    }
  }`);
}

export async function deleteJob(jobId: string) {
  return await client.delete(jobId);
}
