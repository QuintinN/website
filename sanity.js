import { createClient } from "@sanity/client";

export default createClient({
  projectId: "jfpjgj3u",
  dataset: "production",
  apiVersion: "2022-01-12",
  useCdn: false,
});
