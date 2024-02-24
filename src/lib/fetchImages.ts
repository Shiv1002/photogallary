import { ImageSchemaWithPhoto } from "@/models/Images";
import { Photo, ImagesResults } from "@/models/Images";
import env from "./env";
export const fetchImages = async (
  url: string
): Promise<ImagesResults | undefined> => {
  try {
    const res = await fetch(url, {
      // typescript thinks headers is undefined
      // need to validate api key
      headers: {
        authorization: env.PEXELS_API_KEY,
      },
    });
    if (!res.ok) throw new Error("fetching image failed!!");
    const result: ImagesResults = await res.json();
    const parsed = ImageSchemaWithPhoto.parse(result);
    if (parsed.total_results === 0) return undefined;
    return parsed;
  } catch (e) {
    if (e instanceof Error) console.log(e.message, "fetching images");
    return undefined;
  }
};
