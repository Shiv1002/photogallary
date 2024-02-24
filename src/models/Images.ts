import { z } from "zod";

const PhotoSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  photographer: z.string(),
  photographer_url: z.string(),
  src: z.object({
    original: z.string(),
    large: z.string(),
    large2x: z.string(),
    small: z.string(),
    portrait: z.string(),
    landscape: z.string(),
    tiny: z.string(),
    blurr: z.string().optional(),
  }),
  alt: z.string(),
});

const ImageSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  total_results: z.number(),
  next_page: z.string().optional(),
  prev_page: z.string().optional(),
  photos: z.array(PhotoSchema),
});

export const ImageSchemaWithPhoto = ImageSchema;
export type Photo = z.infer<typeof PhotoSchema>;
export type ImagesResults = z.infer<typeof ImageSchema>;
