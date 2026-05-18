export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = readEnv(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
  "production",
);

export const projectId = readEnv(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "",
);

function readEnv(value: string | undefined, name: string, fallback: string): string {
  if (value !== undefined && value !== "") return value;
  if (typeof window !== "undefined") {
    console.warn(`[sanity] Missing ${name}. Studio and content fetches will fail until it is set.`);
  }
  return fallback;
}
