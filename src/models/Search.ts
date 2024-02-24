import { z } from "zod";

const searchTerm = z.object({
  term: z.string(),
  frequency: z.number(),
});
const searchHistory = z.array(searchTerm);

export const searchHistorySchema = searchHistory;
export type searchHistory = z.infer<typeof searchHistory>;
