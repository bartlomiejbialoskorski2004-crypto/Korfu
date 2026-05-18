"use client";

/**
 * Embedded Sanity Studio. Metadata + viewport are exported from the parent layout
 * because metadata cannot be re-exported from a "use client" file.
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
