import { ImagesResults } from "@/models/Images";
import { getPlaiceholder } from "plaiceholder";

export default async function getbase64(
  images: ImagesResults
): Promise<ImagesResults | undefined> {
  try {
    const allBase64 = images.photos.map((photo) =>
      getBufferData(photo.src.large)
    );
    const bufferPromise = await Promise.all(allBase64);

    images.photos.map((photo, i) => (photo.src.blurr = bufferPromise[i]));

    return images;
  } catch (e: any) {
    if (e) console.log(e.message, "getting base64");
    return undefined;
  }
}
export async function getBufferData(src: string): Promise<string | undefined> {
  const buffer = await fetch(src)
    .then(async (res) => Buffer.from(await res.arrayBuffer()))
    .catch((e: any) => {
      if (e) console.log(e.message, "getting buffer");
    });
  if (!buffer) return undefined;
  const { base64 } = await getPlaiceholder(buffer);

  return base64;
}
